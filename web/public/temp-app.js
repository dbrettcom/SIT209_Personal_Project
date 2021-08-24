$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const MQTT_URL = 'http://localhost:5001/send-command';
const API_URL = 'http://localhost:5000/api';

$.get(`${API_URL}/temps`)
.then(response => {
  response.forEach(temp => {
    $('#temps tbody').append(`
      <tr>
        <td>${temp.temp}</td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});
