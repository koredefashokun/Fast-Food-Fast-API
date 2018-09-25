import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';

import routes from './routes';
import init from './config/db/init';

if (!process.env.NODE_ENV) {
  dotenv.load();
} else if (process.env.NODE_ENV === `production`) {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 4500;
const connString = process.env.DB_URL || 'postgresql://koredefashokun:Korede12@localhost/fast_food_fast';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
  res.sendFile(`${__dirname}/ui/login.html`);
});

app.get('/register', (req, res) => {
  res.sendFile(`${__dirname}/ui/register.html`);
});

app.get('/history', (req, res) => {
  res.sendFile(`${__dirname}/ui/history.html`);
});

app.get('order-food', (req, res) => {
  res.sendFile(`${__dirname}/ui/order-food.html`);
});

app.get('order-manager', (req, res) => {
  res.sendFile(`${__dirname}/ui/order-manager.html`);
});

app.use('/', routes);

app.listen(port, async () => {
  await console.log(`Server started on port ${port}.`);
  await init(connString).catch(err => console.error(err));
});


export default app;