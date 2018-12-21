let express = require('express');
let router = express.Router();

router.MongoURI = "mongodb://admin:u5sezbxN3qZQEFxV@ds111963.mlab.com:11963/nomtrips";

router.jwtKey = "supersecret";

module.exports = router;
