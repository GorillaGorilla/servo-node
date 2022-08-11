import express from 'express';
import rpio from 'rpio';

const PORT = 3050;
const app = express();

const pin = 11;
const rotation = 0.0030;


app.get('/activate', (_, res) => {
	console.log('Activating');
	rpio.open(pin, rpio.OUTPUT, rpio.LOW);
	rpio.write(pin, rpio.HIGH);
	rpio.sleep(rotation);
	rpio.write(pin, rpio.LOW);
	res.sendStatus(200);
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));