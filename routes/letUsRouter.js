const express = require('express');

const letUsRouter = express.Router();
const letUsController = require('../db/letUsController');

/* GET home page. */
letUsRouter.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = letUsRouter;
