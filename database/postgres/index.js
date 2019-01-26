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

const createWorkoutName = (name, cb) => {
  client.query(`INSERT INTO workouts (name) VALUES ('${name.toLowerCase}')`, (err, success) => {
    if (err) {
      cb(err);
    } else {
      cb(null, success);
    }
  });
};

const findWorkouts = (date, cb) => {
  client.query(`SELECT main.*, workouts.name FROM main INNER JOIN workouts ON main.workoutid = workouts.id WHERE WHERE date='${date}'`, (err, pgres) => {
    if (err) {
      cb(err);
    } else {
      cb(null, pgres);
    }
  });
};

const createWorkoutRecord = (args, cb) => {
  client.query(`INSERT INTO main (date, workoutid, weight, reps) VALUES ('${args.date}', ${args.workoutid}, ${args.weight}, ${args.reps})`, (err, success) => {
    if (err) {
      cb(err);
    } else {
      cb(null, success);
    }
  })
}

module.exports.findWorkouts = findWorkouts;
module.exports.getWorkoutId = getWorkoutId;
module.exports.getWorkoutName = getWorkoutName;
module.exports.createWorkoutName = createWorkoutName;
module.exports.createWorkoutRecord = createWorkoutRecord;

