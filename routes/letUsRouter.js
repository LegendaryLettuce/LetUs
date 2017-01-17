/* eslint-disable no-param-reassign */
const express = require('express');

const letUsRouter = express.Router();
const letUsController = require('../db/letUsController');

const sockets = require('./../sockets');

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

const handleError = (next) => {
  const err = new Error('Internal Server Error');
  err.status = 500;
  next(err);
};

letUsRouter.route('/login')
  .post((req, res, next) => {
    const user = req.body;
    letUsController.findUser(user.id)
      .then((data) => {
        if (data) {
          req.session.userId = user.id;
          res.end('logged in');
        }
        // eslint-disable-next-line brace-style
        else {
          letUsController.addUser(user)
            .then((newData) => {
              if (newData) {
                req.session.id = user.id;
                res.end('logged in');
              } else handleError.bind(this, next);
            })
            .catch(handleError.bind(this, next));
        }
      })
      .catch(handleError.bind(this, next));
  });

letUsRouter.route('/user/events/:userId')
  .get((req, res, next) => {
    letUsController.getUserEvents(req.params.userId)
      .then((data) => {
        res.send(JSON.stringify(data));
      })
      .catch(handleError.bind(this, next));
  });

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

letUsRouter.route('/eventdata/:lat/:lng')
  .get((req, res, next) => {
    letUsController.retrieveYelpData(req.params.lat, req.params.lng)
      .then((data) => {
        // console.log(data);
        res.send(data);
      });
  });

letUsRouter.route('/checkEventHash')
  .get((req, res, next) => {
    // console.log('RECEIVED REQUEST TO CHECK HASH');
    const hash = req.session.eventHash;
    delete req.session.eventHash;
    res.send(hash);
  });

module.exports = letUsRouter;
