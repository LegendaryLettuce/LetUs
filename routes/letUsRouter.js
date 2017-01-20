const express = require('express');

const letUsController = require('../db/letUsController');
const handleError = require('./handleError');
const sockets = require('./../sockets');

const letUsRouter = express.Router();

/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

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
        res.send(data);
      })
      .catch(handleError.bind(this, next));
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
      res.send(data);
    })
    .catch(handleError.bind(this, next));
  });

module.exports = letUsRouter;
