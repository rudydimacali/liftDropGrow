const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const { findWorkouts } = require('../database/postgres/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

findWorkouts(1, (err, res) => {
  if (err) {
    console.log('Error!');
  } else {
    console.log(res);
  }
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
