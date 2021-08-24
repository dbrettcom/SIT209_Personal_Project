const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb+srv://daniel:mongo@cluster0.cy5m2.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const Light = require('./models/light');
const Device = require('./models/device');
const Temp = require('./models/temp');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 5000;

//GET Requests

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
   return err
     ? res.send(err)
     : res.send(devices);
  });
});

app.get('/api/lights', (req, res) => {
  Light.find({}, (err, lights) => {
   return err
     ? res.send(err)
     : res.send(lights);
  });
});

app.get('/api/temps', (req, res) => {
  Temp.find({}, (err, temps) => {
   return err
     ? res.send(err)
     : res.send(temps);
  });
});

// DELETE Request
app.delete('/api/devices/:id', (req, res) => {
  Device.findByIdAndRemove(req.params.id, function(err, deletedDevice){
    if(err){
      res.send("Error deleting device");
    }else{
      res.json(deletedDevice);
    }
  });
});

app.delete('/api/lights/:id', (req, res) => {
  console.log(`Deleting the Light`);
  Light.findByIdAndRemove(req.params.id, function(err, deletedLight){
    if(err){
      res.send("Error deleting device");
    }else{
      res.json(deletedLight);
    }
  });
});

// POST Requests

app.post('/api/devices', (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });

  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
    });
});

app.post('/api/lights', (req, res) => {
  const { building, room, watt, voltage, lum } = req.body;
  const newLight = new Light({
    building,
    room,
    watt,
    voltage,
    lum
  });
  newLight.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added light and data');
  });
});

// Listen

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

// console.logs

app.post('/api/devices', (req, res) => {
  console.log(req.body);
});


// PUT requests

app.put('/api/devices', (req, res) => {
  const {deviceId} = body;
  const body = {
    deviceId
  };
  body.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully generated new device data');
  });
});


// Wait until connection is established
mongoose.connection.on('open', function(err, temps){
  console.log("connection to MongoDB established");

  mongoose.connection.db.collection('temps', function(err, temp) {
      if(err) return console.log(err);
      temp.find().each(function(err, temp) {
          if(err) return console.err(err);
          console.log(temp);
      })
  });
});