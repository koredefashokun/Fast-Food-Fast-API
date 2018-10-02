import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import init from './config/db/init';

import routes from './routes';

if (!process.env.NODE_ENV) {
  dotenv.load();
} else if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 4500;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI/register.html'));
});

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI/history.html'));
});

app.get('/order-food', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI/order-food.html'));
});

app.get('/admin-manager', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI/admin-manager.html'));
});

app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI/admin-login.html'));
});

app.use('/', routes);

app.listen(port, async () => {
  await console.log(`Server started on port ${port}.`);
  const connString = process.env.DATABASE_URL;
  await init(connString)
    .then(console.log('Connected to PostgresQL!'))
    .catch(err => console.error(err));
});


export default app;
