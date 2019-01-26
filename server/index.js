const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const PORT = 3000;
const { createWorkoutName, findWorkouts, createWorkoutRecord, findWorkoutNames, findDates } = require('../database/postgres/index.js');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/workoutNames', (req, res) => {
  findWorkoutNames((err, names) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(names);
    }
  });
});

app.post('/api/workoutNames', (req, res) => {
  createWorkoutName(req.body.name, (err, success) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(success);
    }
  });
});

app.get('/api/workouts', (req, res) => {
  findWorkouts(req.body.date, (err, workouts) => {
    if (err) {
      res.status(404).send('Error!');
    } else {
      res.status(200).send(workouts);
    }
  });
});

app.post('/api/workouts', (req, res) => {
  createWorkoutRecord(req.body, (err, success) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(success);
    }
  });
});

app.get('/api/dates', (req, res) => {
  findDates((err, dates) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(dates);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
