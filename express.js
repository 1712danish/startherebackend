const express = require("express");
const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors())
app.use(require("./routes/signup"));
app.use(require("./routes/signin"));
app.use(require("./routes/profile"));
app.use(require("./routes/consultantList"));
app.use(require("./routes/chat"));
app.use(require("./routes/resetpass"));
app.use(require("./routes/getmessage"))


app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err)
})

const server = app.listen(process.env.PORT || 5000, function () {
    console.log("Serever running on port 5000.")
});

module.exports = {
    server
}
