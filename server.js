const express = require('express');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Services
require('./services/movie-service')(app);
require('./services/tweeter-service')(app);

app.listen(process.env.PORT || 4000);
