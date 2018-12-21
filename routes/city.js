var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');

let ObjectId = require('mongoose').Types.ObjectId;

let User = require('../models/userSchema');
let City = require('../models/citySchema');
let Restaurant = require('../models/restaurantSchema');
let Social = require('../models/socialMediaSchema');


router.createCity = (req, res, next) => {
    let name = req.body.name;
    let description = req.body.description;
    let pageTitle = req.body.pageTitle;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    if ((name === undefined || name.length === 0) || (description == undefined || description.length == 0) || (pageTitle === undefined || pageTitle.length == 0)) {
        //Not proper data or invalid
        res.status(400).json({
            info: 'Improper or corrupt data'
        })
    } else {
        if (latitude === undefined || latitude.length == 0 || longitude === undefined || longitude.length == 0) {
            res.status(401).json({
                info: "Invalid Lat Long Data sent!"
            })
        } else {
            City.findOne({
                name: name
            }, function (err, data) {
                if (err)
                    res.status(500).json(err);
                else if (data)
                    res.status(300).json({
                        info: "Previous City Found with given name"
                    })
                else {
                    let newCity = new City({
                        name: name,
                        description: description,
                        latitude: latitude,
                        longitude: longitude,
                        pageTitle: pageTitle
                    });
                    newCity.save(function (err, data) {
                        if (err)
                            res.status(500).json(err);
                        else if (!data)
                            res.status(404).json({
                                info: "Blank Object returned Save city"
                            });
                        else
                            res.status(200).json({
                                info: "City save successful",
                                cityObj: data
                            });
                    });
                }
            });
        }
    }
};

router.getCities = (req, res, next) => {
    let cityName = req.params.cityName;
    City.find({
        name : new RegExp('^'+cityName+'$', "i")
    }, function (err, data) {
        if (err)
            res.status(500).json(err);
        else if (!data.length)
            res.status(404).json({
                info: "City data not found"
            })
        else
            res.status(200).json({
                info: "City data found!",
                data: data
            })
    });
};

router.getCityById = (req,res,next) => {
    let cityId = req.params.cityId;
    City.findById(cityId, function (err, data) {
        if (err)
            res.status(500).json(err);
        else if (!data)
            res.status(404).json({
                info: "City data not found"
            });
        else
            res.status(200).json({
                info: "City data found!",
                data: data
            })
    });
};

router.editCity = (req, res, next) => {
    let cityId = req.body.cityId;
    if (cityId && ObjectId.$isValid(cityId)) {
        City.findById(cityId, function (err, cityObj) {
            if (err)
                res.status(500).json({
                    info: "City find Error"
                });
            else if (!cityObj)
                res.status(404).json({
                    info: "City Object not found for edit"
                });
            else {
                let description = req.body.description;
                let pageTitle = req.body.pageTitle;

                if (description)
                    cityObj.description = description;
                if (pageTitle)
                    cityObj.pageTitle = pageTitle;
                cityObj.save(function (err, data) {
                    if (err)
                        res.status(500).json(err);
                    else
                        res.status(200).json({
                            info: "City Object Saved",
                            cityObj: cityObj
                        });
                });
            }
        });
    } else {
        res.status(300).json({
            info: "Invalid City Id"
        })
    }
};

router.deleteCity = (req, res, next) => {
    let cityId = req.params.cityId;
    if (cityId && ObjectId.$isValid(cityId)) {
        City.findByIdAndRemove(cityId, function (err) {
            if (err)
                res.status(500).json(err);
            else
                res.status(200).json({
                    info: "City Delete Successful"
                })
        });
    } else {
        res.status(300).json({
            info: "Invalid City Id"
        })
    }
};

module.exports = router;