const express = require('express');

const letUsRouter = express.Router();
const letUsController = require('../db/letUsController');

const sockets = require('./../sockets');

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

// letUsRouter.route('/collaborate/:number')
//   .get((req, res, next) => {
//     req.body.number = req.params.number;
//     letUsController.retrieveCollaborate(req, res);
//   })
//   .put((req, res, next) => {
//     req.body.number = req.params.number;
//     letUsController.updateAttendees(req, res);
//     console.log('router received');
//   })
//   .delete((req, res, next) => {
//     req.body.number = req.params.number;
//     letUsController.deleteOne(req, res);
//   });

letUsRouter.route('/test')
  .get((req, res, next) => {
    letUsController.retrieveEvents(req, res);
  });

letUsRouter.route('/events/*')
  .get((req, res, next) => {
    letUsController.retrieveEvents(req, res)
      .then((data) => {
        res.send(data);
      });
  })
  .post((req, res, next) => {
    letUsController.createNewHash()
      .then((hash) => {
        req.body.hash = hash;
        return letUsController.createEvent(req, res);
      })
      .then((data) => {
        sockets.add(data.linkHash);
        res.send(data);
      });
  })
  .put((req, res, next) => {
    letUsController.updateEventAttendees(req)
      .then((data) => {
        res.send(data);
      });
  })
  .delete((req, res, next) => {
    req.body.string = req.params.string;
    letUsController.deleteOne(req, res);
  });


module.exports = letUsRouter;
