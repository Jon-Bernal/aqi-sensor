const http = require("http");
const hostname = "localhost";
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const { io } = require("socket.io");
let express = require("express");

const serialPort = new SerialPort({
  path: "ttyUSB0",
  baudRate: 9600,
});
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));
let app = express();
var port = 8080;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
app.get("/get_data", function (req, res) {
  parser.on("data", function (data) {
    res.json({ weight: data });
  });
});
