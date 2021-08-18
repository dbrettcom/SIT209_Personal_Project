$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const MQTT_URL = 'http://localhost:5001/send-command';
const API_URL = 'http://localhost:5000/api';

//Lights

$('#add-light').on('click', () => {
  const building = $('#building').val();
  const room = $('#room').val();
  const watt = $('#watt').val();
  const lightData = [];

  const body = {
    building,
    room,
    watt,
    lightData
  };

  $.post(`${API_URL}/lights`, body)
  .then(response => {
    location.href = '/light-list';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});

$.get(`${API_URL}/lights`)
.then(response => {
  response.forEach(light => {
    $('#lights tbody').append(`
      <tr>
        <td>${light.building}</td>
        <td>${light.room}</td>
        <td>${light.watt}</td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});

$('#send-command').on('click', function() {
  const lightId = $('#lightId').val();
  const command = $('#command').val();
  $.post(MQTT_URL, { lightId, command })
  .then(response => {
  location.href = '/light-list';
      })
      });
