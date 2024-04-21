import express from 'express';

import bodyParser from 'body-parser';
var cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
