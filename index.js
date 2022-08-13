import express from 'express';
import rpio from 'rpio';

const PORT = 3050;
const app = express();

const pin = 12;
const rotation = 0.0030;
const clockdiv = 256;
const range = 1500;
const SIMPLE = process.env.SIMPLE || false;



const setupPWM = () => {
	console.log('SetupPWM');

	const options = {
        gpiomem: false,          /* Use /dev/gpiomem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
        mock: undefined,        /* Emulate specific hardware in mock mode */
        close_on_exit: true,    /* On node process exit automatically close rpio */
	};
	rpio.init(options);
	rpio.open(pin, rpio.PWM);
	rpio.pwmSetClockDivider(clockdiv);
	rpio.pwmSetRange(pin, range);
	rpio.pwmSetData(pin, 2);
};

const moveSimple = () => {
	rpio.open(pin, rpio.OUTPUT, rpio.LOW);
	rpio.write(pin, rpio.HIGH);
	rpio.sleep(rotation);
	rpio.write(pin, rpio.LOW);
};

const movePWM = () => {
	rpio.pwmSetData(pin, 7);
	rpio.sleep(2.5);
	rpio.pwmSetData(pin, 0);
};

if(!SIMPLE) {
	setupPWM();
}


app.get('/activate', (_, res) => {
	console.log('Activating');
	if (!SIMPLE) {
		movePWM();
	} else {
		moveSimple();
	}

	res.status(200).send("Mouse destroyed \n");
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));