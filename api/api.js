const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb+srv://daniel:mongo@cluster0.cy5m2.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

const Light = require('./models/light'); 
const Device = require('./models/device');

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

//app.get

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    return res.send(devices);
  });
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
    return res.send(lights);
  });
});

app.get('/api/lights', (req, res) => {
  Light.find({}, (err, lights) => {
   return err
     ? res.send(err)
     : res.send(lights);
  });
});

// app.post

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
  const { idNum, building, room, watt, voltage, lum } = req.body;
  const newLight = new Light({
    idNum,
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

// app.delete

app.delete('/api/devices', (req, res) => {
  const {name} = req.body;
  const newDevice = new Device({
    name
  });
  newDevice.delete(err => {
    return err
      ? res.send(err)
      : res.send('Successfully deleted device and data');
  });
});

app.delete('/api/lights', (req, res) => {
  const {building} = req.body;
  const newLight = new Light({
    building
  });
  newLight.delete(err => {
    return err
      ? res.send(err)
      : res.send('Successfully deleted light and data');
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

app.post('/api/lights', (req, res) => {
  console.log(req.body);
});