const express = require('express');
const letUsController = require('../db/letUsController');
const handleError = require('./handleError');

const router = express.Router();

/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

router.route('/')
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

router.route('/check-event-hash')
  .get((req, res, next) => {
    const hash = req.session.eventHash;
    delete req.session.eventHash;
    res.send(hash);
  });

module.exports = router;
