const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = 8080;
const cors = require("cors");

const mqtt = require('mqtt')
const fs = require('fs')

const { Command } = require('commander')

app.use(cors());
app.use(express.static(__dirname + "/../public/"));

const host = '172.17.0.2'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

// connect options
const OPTIONS = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
}

// default is mqtt, unencrypted tcp connection
let connectUrl = `mqtt://${host}:${port}`

const topic = 'Patient1/Spo2'

const client = mqtt.connect(connectUrl, OPTIONS)

io.on('connection', () => {
  console.log(`Connected`)
  // client.subscribe([topic], () => {
  //   console.log(`Subscribe to topic '${topic}'`)
  // })
  // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
  //   if (error) {
  //     console.error(error)
  //   }
  // })
})

client.on("connect", () => {
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
});

client.on('reconnect', (error) => {
  console.log(`Reconnecting`, error)
})

client.on('error', (error) => {
  console.log(`Cannot connect:`, error)
})

client.on("message", (topic, message) => {
  console.log("This is the message received " + message);
  console.log("This is topic " + topic);
  // const data = JSON.parse(message);
  // console.log(data);
  io.emit("mqtt", {
    type: topic,
    message: message
});
});

server.listen(PORT, function () {
  console.log("Server started on 8080");
});
