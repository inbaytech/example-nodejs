var express = require('express');
var router = express.Router();
var idq = require('../idq-client');

/* GET home page. */
router.get('/', function(req, res, next) {

  var state = idq.generateUUID();
  // TODO: STORE STATE AND ASSOCIATE SESSION DETAILS WITH IT

  var idq_url = idq.build_auth_url(state);

  res.render('index', { title: 'Sample Application', loginUrl: idq_url });
});

module.exports = router;
