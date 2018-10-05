import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import init from './config/db/models';

import routes from './routes';

dotenv.load();

const port = process.env.PORT || 4500;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.redirect('/login');
});

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

app.get('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'This route does not exist! Please read the documentation for the full list of the existing ones!'
  })
})

app.listen(port, async () => {
  await console.log(`Server started on port ${port}.`);
  await init(process.env.DATABASE_URL)
    .then(console.log('Connected to PostgresQL!'));
});


export default app;
