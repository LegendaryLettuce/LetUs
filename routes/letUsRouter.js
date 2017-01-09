const express = require('express');

const letUsRouter = express.Router();
const letUsController = require('../db/letUsController');

// template routes

// letUsRouter.route('/')
//   .get((req, res, next) => {
//     letUsController.retrieve(req, res);
//   })
//   .post((req, res, next) => {
//     letUsController.createOne(req, res);
//   })
//   .delete((req, res, next) => {
//     letUsController.delete(req, res);
//   });

// unique collaborate link routes

letUsRouter.route('/collaborate/:number')
  .get((req, res, next) => {
    req.body.number = req.params.number;
    letUsController.retrieveCollaborate(req, res);
  })
  .put((req, res, next) => {
    req.body.number = req.params.number;
    letUsController.updateAttendees(req, res);
    console.log('router received');
  })
  .delete((req, res, next) => {
    req.body.number = req.params.number;
    letUsController.deleteOne(req, res);
  });


module.exports = letUsRouter;
