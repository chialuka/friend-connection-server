import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';

import routes from './routes';

const { NODE_ENV } = process.env;

const envFile = NODE_ENV === 'production' ? '.env' : NODE_ENV === 'test' ? '.env.test' : '.env.development';

config({ path: envFile });

const PORT = process.env.PORT || 4000;

const app = express();

app.use(json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (_, res) => res.status(200).send('Friends Connection API'));

app.use('/api/v1', routes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
