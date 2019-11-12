import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import router from './src/routes/index';
import './src/db/config';



const app = express();

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