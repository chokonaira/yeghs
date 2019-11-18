import '@babel/polyfill';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import router from './src/routes/index';
import './src/db/config';
import './src/cron-man/cronMan';



const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.send('Welcome to Yeghs transaction service platform... ');
});

app.use('*', (req, res) => res.status(404).json({
  status: '404',
  message: 'route not found',
}));

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Listening on port ${port}`); });

export default app;