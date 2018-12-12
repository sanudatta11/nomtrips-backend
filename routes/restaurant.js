var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');
let User = require('../models/userSchema');
let City = require('../models/citySchema');
let Restaurant = require('../models/restaurantSchema');



module.exports = router;