const {server} = require("./express");
const io = require("socket.io").listen(server);
const Redis = require("ioredis");
const redisClient = new Redis({
    port: 6379, // Redis port
    host: "localhost", // Redis host
});


// module.exports = io.on("connection", socket => {
//     console.log("New client connected");
//     socket.on("join",async data=>{
//         console.log("id",data)
//         if(data && data.id){
//             console.log("setting socket for user");
//             await redisClient.set(data.id,socket.id);
//         }
//     });
//     socket.on("disconnect", () => {
//         console.log("Client disconnected")
//     });
// });

io.sockets.use((socket,next)=>{
    try{
        let id = socket.handshake.query.id;
        // console.log("---fff",id)
        socket.join(id);
        next();
    }catch(err){
        console.log("---",err)
    }
   
});

module.exports=io;
