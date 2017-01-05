var environment = process.env.NODE_ENV || 'development';
var config = require('./../knexfile.js')[environment];
var knex = require('knex');

module.exports = require('knex')(config);

knex('users').insert({
  userid: 'john',
  pic: 'test',
  phonenumber: '555555555',
  friendrank: 0,
  lettuceleaves: 0,
});
