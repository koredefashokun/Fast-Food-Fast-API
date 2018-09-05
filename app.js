require('dotenv').load();
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';
if (process.env.NODE_ENV = 'test') {
  const port = 4500;
} else {
  const port = process.env.PORT || 4500;
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

app.use('/', routes);

export default app;