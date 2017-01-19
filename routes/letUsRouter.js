const express = require('express');

const letUsRouter = express.Router();
const letUsController = require('../db/letUsController');

const handleError = require('./handleError');

const sockets = require('./../sockets');

/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

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

letUsRouter.route('/user/events/:userId')
  .get((req, res, next) => {
    letUsController.getUserEvents(req.params.userId)
      .then((data) => {
        res.send(JSON.stringify(data));
      })
      .catch(handleError.bind(this, next));
  });

letUsRouter.route('/home/')
  .put((req, res, next) => {
    letUsController.updateTopEvent(req, res)
      .then((data) => {
        res.send(JSON.stringify(data));
      });
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

letUsRouter.route('/eventdata/:lat/:lng')
  .get((req, res, next) => {
    letUsController.retrieveYelpData(req.params.lat, req.params.lng)
      .then((data) => {
        // console.log(data);
        res.send(data);
      });
  });

letUsRouter.route('/lazycat/:body')
  .get((req, res, next) => {
    const body = JSON.parse(req.params.body);
    const lat = body.coords[0];
    const lng = body.coords[1];
    const cat = body.category;
    const volume = 10;

    letUsController.retrieveCatData(lat, lng, cat, volume)
    .then((data) => {
      console.log('SERVER: sending data to client to update cat');
      res.send(data);
    });
  });

module.exports = letUsRouter;
