$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const MQTT_URL = 'http://localhost:5001/send-command';
const API_URL = 'http://localhost:5000/api';

//Lights

$('#add-light').on('click', () => {
  const idNum = $('#idNum').val();
  const building = $('#building').val();
  const room = $('#room').val();
  const watt = $('#watt').val();
  const voltage = $('#voltage').val();
  const lum = $('#lum').val();

  const body = {
    idNum,
    building,
    room,
    watt,
    voltage,
    lum
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
        <td>${light.idNum}</td>
        <td>${light.building}</td>
        <td>${light.room}</td>
        <td style="padding-left:30px;">${light.watt}</td>
        <td style="padding-left:25px;">${light.voltage}</td>
        <td style="padding-left:25px;">${light.lum}</td>
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
