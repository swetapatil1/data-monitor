const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = 8080;
const cors = require("cors");

app.use(cors());
app.use(express.static(__dirname + "/../public/"));

//mqtt
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://172.17.0.2:1883");

io.on("connection", (socket) => {
  console.log("Connection Established");
  socket.emit("message", "Hello World");
});

client.on("connect", () => {
  client.subscribe("pots", function (err) {
    if (!err) {
      client.publish("node1", "Server device 1: device name");
      console.log("device name");
    }
  });
});

client.on("message", (topic, message) => {
  const data = JSON.parse(message);
  console.log(data);
  io.emit("mqtt", data.pot1);
});

server.listen(PORT, function () {
  console.log("Server started on 8080");
});
