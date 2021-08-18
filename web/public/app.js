$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const MQTT_URL = 'http://localhost:5001/send-command';
const API_URL = 'http://localhost:5000/api';

//Devices

$('#add-device').on('click', () => {
  const name = $('#name').val();
  const user = $('#user').val();
  const sensorData = [];

  const body = {
    name,
    user,
    sensorData
  };

  $.post(`${API_URL}/devices`, body)
  .then(response => {
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
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});

$('#send-command').on('click', function() {
  const deviceId = $('#deviceId').val();
  $.post(MQTT_URL, { deviceId })
  .then(response => {
  location.href = '/device-list';
      })
      });