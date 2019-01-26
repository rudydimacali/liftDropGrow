const path = require('path');
const { Pool, Client } = require('pg');
const config = require('./config.js');

const client = new Client(config.postgresConfig);
client.connect();

const queryMainTable = (id, cb) => {
  client.query(`SELECT * FROM main`, (err, pgres) => {
    if (err) {
      cb(err);
    } else {
      cb(null, pgres);
    }
  });
};

module.exports.queryMainTable = queryMainTable;
