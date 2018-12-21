var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');

let ObjectId = require('mongoose').Types.ObjectId;

let User = require('../models/userSchema');
let City = require('../models/citySchema');
let Restaurant = require('../models/restaurantSchema');

function isImproper(data) {
    return data === undefined || data == 0;
}

router.createRestaurant = (req, res, next) => {
    //Required fields
    let cityId = req.body.cityId;
    let restaurantName = req.body.restaurantName;
    let description = req.body.description;
    let phone = req.body.phone;
    let address = req.body.address;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    //Non Required Fields
    let cuisine = req.body.cuisine;
    let timeOpen = req.body.timeOpen;
    let timeClose = req.body.timeClose;
    let website = req.body.website;
    let twitter = req.body.twitter;
    let instagram = req.body.instagram;
    let gplus = req.body.gplus;
    let nomCert = req.body.nomCert;
    let affordability = req.body.affordability;
    let rating = req.body.rating;

    if (isImproper(cityId) || isImproper(restaurantName) || isImproper(description) || isImproper(phone) || isImproper(address) || isImproper(latitude) || isImproper(longitude)) {
        //Not proper data or invalid
        res.status(400).json({
            info: 'Improper or corrupt required data'
        })
    } else {
        Restaurant.findOne({
            restaurantName: restaurantName,
            cityId: cityId
        }, function (err, data) {
            if (err)
                res.status(500).json(err);
            else if (data)
                res.status(300).json({
                    info: "Previous Restaurant Found with given name"
                });
            else {
                let newRes = new Restaurant({
                    cityId: cityId,
                    restaurantName: restaurantName,
                    description: description,
                    latitude: latitude,
                    longitude: longitude,
                    phone: phone,
                    address: address
                });
                if(nomCert)
                    newRes.nomCert = true;
                if (cuisine)
                    newRes.cuisine = cuisine;
                if (affordability)
                    newRes.affordability = affordability;
                if (rating)
                    newRes.rating = rating;
                if (timeOpen)
                    newRes.timeOpen = timeOpen;
                if (timeClose)
                    newRes.timeClose = timeClose;
                if (website)
                    newRes.website = website;
                if (twitter)
                    newRes.twitter = twitter;
                if (instagram)
                    newRes.instagram = instagram;
                if (gplus)
                    newRes.gplus = gplus;
                newRes.save(function (err, data) {
                    if (err)
                        res.status(500).json(err);
                    else if (!data)
                        res.status(404).json({
                            info: "Blank Object returned Save city"
                        });
                    else
                        res.status(200).json({
                            info: "Restaurant save successful",
                            newRes: data
                        });
                });
            }
        });
    }
};

router.editRestaurant = (req, res, next) => {
    let restaurantId = req.body.restaurantId;
    if (restaurantId && ObjectId.isValid(restaurantId)) {
        Restaurant.findById(restaurantId, function (err, resObj) {
            if (err)
                res.status(500).json({
                    info: "Restaurant find Error"
                });
            else if (!resObj)
                res.status(404).json({
                    info: "Restaurant Object not found for edit"
                });
            else {
                //Required fields
                let restaurantName = req.body.restaurantName;
                let description = req.body.description;
                let phone = req.body.phone;
                let address = req.body.address;

                if (restaurantName)
                    resObj.restaurantName = restaurantName;
                if (description)
                    resObj.description = description;
                if (phone)
                    resObj.phone = phone;
                if (address)
                    resObj.address = address;

                //Non Required Fields
                let cuisine = req.body.cuisine;
                let timeOpen = req.body.timeOpen;
                let timeClose = req.body.timeClose;
                let website = req.body.website;
                let twitter = req.body.twitter;
                let instagram = req.body.instagram;
                let gplus = req.body.gplus;
                let affordability = req.body.affordability;
                let rating = req.body.rating;

                let nomCert = req.body.nomCert;

                if (cuisine)
                    resObj.cuisine = cuisine;
                if (timeOpen)
                    resObj.timeOpen = timeOpen;
                if (timeClose)
                    resObj.timeClose = timeClose;
                if (website)
                    resObj.website = website;
                if (twitter)
                    resObj.twitter = twitter;
                if (instagram)
                    resObj.instagram = instagram;
                if (gplus)
                    resObj.gplus = gplus;
                if (affordability)
                    resObj.affordability = affordability;
                if (rating)
                    resObj.rating = rating;
                if(nomCert)
                    newRes.nomCert = nomCert;

                resObj.save(function (err, data) {
                    if (err)
                        res.status(500).json(err);
                    else
                        res.status(200).json({
                            info: "Restaurant Object Saved",
                            resObj: resObj
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

router.deleteRestaurant = (req, res, next) => {
    let restaurantId = req.params.restaurantId;
    if (restaurantId && ObjectId.isValid(restaurantId)) {
        Restaurant.findByIdAndRemove(restaurantId, function (err) {
            if (err)
                res.status(500).json(err);
            else
                res.status(200).json({
                    info: "Restaurant Delete Successful"
                })
        });
    } else {
        res.status(300).json({
            info: "Invalid City Id"
        })
    }
};

router.getRestaurantsByCityId = (req,res,next) => {
    let cityId = req.params.cityId;
    Restaurant.find({
        cityId: cityId
    },function (err,data) {
        if (err)
            res.status(500).json(err);
        else if (!data.length)
            res.status(404).json({
                info: "Restaurant data not found"
            });
        else
            res.status(200).json({
                info: "Restaurant data found!",
                data: data
            })
    });
};

router.getRestaurantsByNameAndCityId = (req,res,next) => {
    let cityId = req.body.cityId;
    let restaurantName = req.body.restaurantName;
    Restaurant.find({
        cityId: cityId,
        restaurantName : new RegExp('^'+ restaurantName, "i")
    },function (err,data) {
        if (err)
            res.status(500).json(err);
        else if (!data.length)
            res.status(404).json({
                info: "Restaurant data not found"
            });
        else
            res.status(200).json({
                info: "Restaurant data found!",
                data: data
            })
    });
};
module.exports = router;