const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/cu.usbmodem14201');
const parser = new Readline();
port.pipe(parser);
parser.on('data', console.log);

