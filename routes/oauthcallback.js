var express = require('express');
var router = express.Router();
var idq = require('../idq-client');

router.get('/', function(req, res, next) {
  var code = req.query.code;
  var state = req.query.state;
  // TODO: Lookup previously stored state, verify and load attached session

    idq.get_token(code, function(r1) {
        idq.get_user(r1.access_token, function(r2) {
            res.render('callback', {
                access_code: code,
                token: r1.access_token,
                user: r2.username
            });
        });
    });
});

module.exports = router;
