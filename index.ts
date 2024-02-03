import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let clicks = 0;

interface ClicksData {
  clicks: number;
}

app.get('/clicks/', function (request, response) {
  const data: ClicksData = {
    clicks: clicks,
  };
  response.send(data);
});

app.post('/clicks/', function (request, response) {
  if (typeof request.body.clicks !== 'number') {
    response.sendStatus(400);
    return;
  }
  const data: ClicksData = request.body;
  clicks = data.clicks;
  const responseData: ClicksData = {
    clicks: clicks,
  };
  response.send(responseData);
});

app.delete('/clicks/', function (request, response) {
  clicks = 0;
  response.sendStatus(200);
  //response.send(clicks);
});

app.get('/', function (request, response) {
  response.send('Я живой и горячий!');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
