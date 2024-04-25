import express from 'express';
import { config } from 'dotenv';

const { NODE_ENV } = process.env;

const envFile = NODE_ENV === 'production' ? '.env' : NODE_ENV === 'test' ? '.env.test' : '.env.development';

config({ path: envFile });

const PORT = process.env.PORT || 4000;

const app = express();

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
