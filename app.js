const mongoose = require("mongoose");
const http = require("http");

require("./io");
require("./express");


mongoose.connect("mongodb://localhost:27017/MyDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});








