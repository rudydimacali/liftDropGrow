const path = require('path');
const { Pool, Client } = require('pg');
const config = require('./config.js');

const client = new Client(config.postgresConfig);
client.connect();

const getWorkoutId = (name, cb) => {
  client.query(`SELECT id FROM workouts WHERE name = ${name.toLowerCase()}`, (err, id) => {
    if (err) {
      cb(err);
    } else {
      cb(null, id);
    }
  });
};

const getWorkoutName = (id, cb) => {
  client.query(`SELECT name FROM workouts WHERE id = ${id}`, (err, id) => {
    if (err) {
      cb(err);
    } else {
      cb(null, id);
    }
  });
};

const getWorkoutProgress = (id, cb) => {
  client.query(`SELECT main.*, workouts.name FROM main INNER JOIN workouts ON main.workoutid = workouts.id WHERE workoutid=${id}`, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
}

const createWorkoutName = (name, cb) => {
  client.query(`INSERT INTO workouts (name) VALUES ('${name}')`, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      cb(null, success);
    }
  });
};

const findWorkouts = (date, cb) => {
  console.log(date);
  client.query(`SELECT main.*, workouts.name FROM main INNER JOIN workouts ON main.workoutid = workouts.id WHERE date='${date}'`, (err, pgres) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      cb(null, pgres);
    }
  });
};

const createWorkoutRecord = (args, cb) => {
  console.log(args);
  client.query(`INSERT INTO main (date, workoutid, weight, reps) VALUES ('${args.date}', ${args.workoutid}, ${args.weight}, ${args.reps})`, (err, success) => {
    if (err) {
      cb(err);
    } else {
      cb(null, success);
    }
  });
};

const findWorkoutNames = (cb) => {
  client.query(`SELECT * FROM workouts`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const findDates = (cb) => {
  client.query(`SELECT date FROM main`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports.findWorkouts = findWorkouts;
module.exports.getWorkoutProgress = getWorkoutProgress;
module.exports.getWorkoutId = getWorkoutId;
module.exports.getWorkoutName = getWorkoutName;
module.exports.createWorkoutName = createWorkoutName;
module.exports.createWorkoutRecord = createWorkoutRecord;
module.exports.findWorkoutNames = findWorkoutNames;
module.exports.findDates = findDates;

