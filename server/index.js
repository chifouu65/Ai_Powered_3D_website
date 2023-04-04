import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './routes/dalle.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(
    cors(),
    express.json(),
);

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
  }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
