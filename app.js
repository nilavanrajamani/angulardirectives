var express = require("express");
var app = express();

var port = process.env.PORT || 3000;
app.use(express.static('.'));

app.listen(port, process.env.IP, function () {
    //console.log(process.env.IP);
    console.log("Listening on port " + port);
});