import express from 'express';
import router from './routes/authRoutes';
import bodyParser from 'body-parser';
var cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
