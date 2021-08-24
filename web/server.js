const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(`${base}/index.html`);
});

//Devices Tabs

app.get('/device-list', (req, res) => {
  res.sendFile(`${base}/device-list.html`);
});

app.get('/register-device', (req, res) => {
  res.sendFile(`${base}/register-device.html`);
});

app.get('/send-command', (req, res) => {
  res.sendFile(`${base}/send-command.html`);
  });

app.get('/remove-device', (req, res) => {
  res.sendFile(`${base}/remove-device.html`);
});

//Lights Tabs

app.get('/north-lights', (req, res) => {
  res.sendFile(`${base}/north-lights.html`);
});

app.get('/east-lights', (req, res) => {
  res.sendFile(`${base}/east-lights.html`);
});

app.get('/west-lights', (req, res) => {
  res.sendFile(`${base}/west-lights.html`);
});

app.get('/south-lights', (req, res) => {
  res.sendFile(`${base}/south-lights.html`);
});

app.get('/light-list', (req, res) => {
  res.sendFile(`${base}/light-list.html`);
});

app.get('/room-light', (req, res) => {
  res.sendFile(`${base}/lights.html`);
});

app.get('/register-light', (req, res) => {
  res.sendFile(`${base}/register-light.html`);
});

app.get('/remove-light', (req, res) => {
  res.sendFile(`${base}/remove-light.html`);
});


//Temperature Tabs

app.get('/temp-list', (req, res) => {
  res.sendFile(`${base}/temp-list.html`);
});

app.get('/room-temp', (req, res) => {
  res.sendFile(`${base}/room-temp.html`);
});



app.get('/login', (req, res) => {
  res.sendFile(`${base}/login.html`);
});

app.get('/daniel', (req, res) => {
  res.sendFile(`${base}/daniel.html`);
});

app.get('/iot-applications', (req, res) => {
  res.sendFile(`${base}/iot-applications.html`);
});

app.get('*', (req, res) => {
  res.sendFile(`${base}/404.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
