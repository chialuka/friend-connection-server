import express from 'express';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 4000;

const app = express();

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
