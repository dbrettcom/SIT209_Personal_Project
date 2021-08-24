const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://daniel:mongo@cluster0.cy5m2.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

const Device = require('./models/device');

const Light = require('./models/light');

const randomCoordinates = require('random-coordinates');

const app = express();
    app.use(express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

// Subscribes the MQTT app to the /sensorData topic
client.on('connect', () => {
  client.subscribe('/sensorData');
 console.log('mqtt connected for device data');
});

// Subscribes the MQTT app to the /lightData topic
client.on('connect', () => {
  client.subscribe('/lightData');
 console.log('mqtt connected for light data');
});

// Subscribes the MQTT app to the /sensorData topic
client.on('connect', () => {
  client.subscribe('/tempData');
 console.log('mqtt connected for temp data');
});

// Turns the string into a JSON object and saves it to the device collection of the database
client.on('message', (topic, message) => {
  if (topic == '/sensorData') {
    const data = JSON.parse(message);

    Device.findOne({"name": data.deviceId }, (err, device) => {
      if (err) {
        console.log(err)
      }
      const { sensorData } = device;
      const { ts, loc, temp } = data;

      sensorData.push({ ts, loc, temp });
      device.sensorData = sensorData;

      device.save(err => {
        if (err) {
          console.log(err)
        }
      });
    });
  }
});


// PUT endpoint for /sensor-data
app.put('/sensor-data', (req, res) => {
  const { deviceId }  = req.body;

  const [lat, lon] = randomCoordinates().split(", ");
  const ts = new Date().getTime();
  const loc = { lat, lon };
  min = Math.ceil(20);
  max = Math.floor(50);
  temp = Math.floor(Math.random() * (max - min + 1) + min);

  const topic = `/sensorData`;
  const message = JSON.stringify({ deviceId, ts, loc, temp });

  client.publish(topic, message, () => {
    res.send('published new message');
  });
});

// Turns the string into a JSON object and saves it to the temp collection of the database
client.on('message', (topic, message) => {
  if (topic == '/tempData') {
    const data = JSON.parse(message);

    Light.findOne({"temp": data.temp }, (err, temp) => {
      if (err) {
        console.log(err)
      }
      const { tempData } = temp;

      tempData.push({ temp });
      temp.tempData = tempData;

      temp.save(err => {
        if (err) {
          console.log(err)
        }
      });
    });
  }
});



// POST endpoint
app.post('/send-command', (req, res) => {
  const { deviceId, command }  = req.body;
  const topic = `/myid/command/${deviceId}`;
  client.publish(topic, command, () => {
    res.send('published new message');
  });
});


// DELETE endpoint
app.delete('/devices/:id', (req, res) => {
  const { _id }  = req.body;
  const topic = `/myid/command/${_id}`;
  client.delete(_id, () => {
    res.send('published new message');
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});