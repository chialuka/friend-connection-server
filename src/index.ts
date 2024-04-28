import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import { Server } from 'socket.io';
import http from 'http';

import routes from './routes';
import { errorHandler } from './middleware/error';
import { sockets } from './modules/sockets';

const { NODE_ENV } = process.env;

const envFile = NODE_ENV === 'production' ? '.env' : NODE_ENV === 'test' ? '.env.test' : '.env.development';

config({ path: envFile });

const PORT = process.env.PORT || 4000;

const app = express();

app.use(json());
app.use(cors());
app.use(morgan('combined'));
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

sockets(io);

app.get('/', (_, res) => res.status(200).send('Friends Connection API'));

app.use('/api/v1', routes);

app.use(errorHandler);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
