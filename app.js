const express = require("express")
const mongoose = require("mongoose");
const http = require("http");
const Redis = require("ioredis");
const redisClient = new Redis({
    port: 6379, // Redis port
    host: "localhost", // Redis host
})


const { ValidationError } = require('express-validation')

const app = express()

mongoose.connect("mongodb://localhost:27017/MyDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(express.json());
app.use(require("./routes/signup"));
app.use(require("./routes/signin"));
app.use(require("./routes/profile"));
app.use(require("./routes/consultantList"));
app.use(require("./routes/chat"));





app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err)
})


const server = app.listen(process.env.PORT || 5000, function () {
    console.log("Serever running on port 5000.")
})

const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("New client connected");
    socket.on("join",async data=>{
        console.log("id",data)
        if(data && data.id){
            console.log("setting socket for user");
            await redisClient.set(data.id,socket.id);
        }
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected")
    });
});