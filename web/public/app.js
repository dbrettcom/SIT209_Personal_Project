$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const SENSOR_URL = 'http://localhost:5001/sensor-data';
const MQTT_URL = 'http://localhost:5001/send-command';
const API_URL = 'http://localhost:5000/api';


//Devices

$('#remove-device').on('click', () => {
  const _id = $('#barcode').val();
  const body = {
    _id
  }
  $.delete(`${API_URL}/devices/:id`, body)
.then(response => {
  location.href = '/device-list';
    })
    .catch(error => {
    });
});

$('#add-device').on('click', () => {
  const name = $('#name').val();
  const user = $('#user').val();
  const sensorData = [];

  console.log(`${name}`);
  console.log(name);

  const body = {
    name,
    user,
    sensorData
  };

  console.log(`${name}`);
  console.log(name);
  console.log(`${body}`);
  console.log(body);

  $.post(`${API_URL}/devices`, body)
  .then(response => {

    console.log(`${name}`);
    console.log(name);
    console.log(`${body}`);
    console.log(body);
    location.href = '/device-list';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});

$.get(`${API_URL}/devices`)
.then(response => {
  response.forEach(device => {
    $('#devices tbody').append(`
      <tr>
        <td>${device.name}</td>
        <td>${device.user}</td>
        <td style="padding-left:30px;">${device.sensorData[device.sensorData.length - 1].temp} °C</td>
        <td>${device.sensorData[device.sensorData.length - 1].loc.lat}</td>
        <td>${device.sensorData[device.sensorData.length - 1].loc.lon}</td>
        <td>${device._id}</td>
        <td style="padding-left:30px;"><a href="http://www.google.com/maps/place/${device.sensorData[device.sensorData.length-1].loc.lat},${device.sensorData[device.sensorData.length-1].loc.lon}">Location</a></td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});



$('#send-command').on('click', function() {
  const deviceId = $('#deviceId').val();
  const command = $('#command').val();
  $.post(MQTT_URL, { deviceId, command })
.then(response => {
  location.href = '/device-list';
    })
    });

