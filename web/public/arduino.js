const API_URL = 'http://localhost:5000/api';

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/cu.usbmodem14201');
const parser = new Readline();
port.pipe(parser);
console.log("Reading Arduino...")
parser.on('data', function(data) {
    var temp = data;
    console.log(`Temp: ${temp}`);
});