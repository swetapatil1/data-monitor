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
const topic1 = 'Patient1/body temperature'
const topic2 = 'Patient1/heart rate'
const topic3 = 'Patient1/Systolic Blood pressure'
const topic4= 'Patient1/Diastolic Blood Pressure'
const topic5 = 'Patient2/Spo2'
const topic6 = 'Patient2/body temperature'
const topic7 = 'Patient2/heart rate'
const topic8 = 'Patient2/Systolic Blood pressure'
const topic9= 'Patient2/Diastolic Blood Pressure'

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
  client.subscribe([topic1], () => {
    console.log(`Subscribe to topic '${topic1}'`)
  })
  client.subscribe([topic2], () => {
    console.log(`Subscribe to topic '${topic2}'`)
  })
  client.subscribe([topic3], () => {
    console.log(`Subscribe to topic '${topic3}'`)
  })
  client.subscribe([topic4], () => {
    console.log(`Subscribe to topic '${topic4}'`)
  })
  client.subscribe([topic5], () => {
    console.log(`Subscribe to topic '${topic5}'`)
  })
  client.subscribe([topic6], () => {
    console.log(`Subscribe to topic '${topic6}'`)
  })
  client.subscribe([topic7], () => {
    console.log(`Subscribe to topic '${topic7}'`)
  })
  client.subscribe([topic8], () => {
    console.log(`Subscribe to topic '${topic8}'`)
  })
  client.subscribe([topic9], () => {
    console.log(`Subscribe to topic '${topic9}'`)
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
  socket.emit('mqtt', { message: topic, id: socket.id });
});

server.listen(PORT, function () {
  console.log("Server started on 8080");
});
