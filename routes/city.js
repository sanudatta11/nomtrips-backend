var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');
let User = require('../models/userSchema');
let City = require('../models/citySchema');
let Restaurant = require('../models/restaurantSchema');


router.createCity = (req,res,next) => {
    let name = req.body.name;
    let description = req.body.name;
    if ((name === undefined || name.length === 0) || (description == undefined || description.length == 0))
    {
        //Not proper name or invalid

    }
    else{

    }
    City.find({
        name: req.body.name
    },function (err,data) {

    });
};

router.editCity = (req,res,next) => {

};

router.deleteCity = (req,res,next) => {

};

module.exports = router;