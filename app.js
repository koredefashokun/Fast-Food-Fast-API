require('dotenv').load();
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';
const port = porocess.env.PORT || 4500;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

app.use('/', routes);

export default app;