var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');

let ObjectId = require('mongoose').Types.ObjectId;

let User = require('../models/userSchema');
let Itinerary = require('../models/itinerarySchema');
let City = require('../models/citySchema');
let Restaurant = require('../models/restaurantSchema');
let Social = require('../models/socialMediaSchema');

router.createItinerary = (req, res, next) => {
    let cityId = req.body.cityId;
    let tripName = req.body.tripName;
    let dateFrom = req.body.dateFrom;
    let dateTo = req.body.dateTo;
    let description = req.body.description;
    let publicP = req.body.public;
    let restaurantData = req.body.restaurantData;
    if (cityId && ObjectId.isValid(cityId) && tripName && dateFrom && dateTo && description && restaurantData) {
        if(publicP === "true" || publicP === "True") {
            publicP = true;
        }
        let newItinerary = new Itinerary({
            userId: req.userId,
            cityId: cityId,
            tripName: tripName,
            dateFrom: dateFrom,
            dateTo: dateTo,
            description: description,
            restaurantData: restaurantData,
            public : publicP
        });

        newItinerary.save(function (err, data) {
            if (err)
                res.status(500).json(err);
            else if (!data)
                res.status(404).json({
                    info: "Blank Object not save"
                })
            else
                res.status(200).json(data);
        });
    } else {
        res.status(300).json({
            info: "Valid Required Data not found!"
        })
    }
};
router.editItinerary = (req, res, next) => {
    let itineraryId = req.body.itineraryId;
    let editItineraryObj = req.body.editItineraryObj;
    if (itineraryId && ObjectId.isValid(itineraryId) && editItineraryObj) {

        Itinerary.findOneAndUpdate({
            _id : itineraryId
        },editItineraryObj,{upsert: true},function (err,data) {
            if (err)
                res.status(500).json(err);
            else if (!data)
                res.status(404).json({
                    info: "Blank Object not saved"
                });
            else
                res.status(200).json({
                    info : "Data updated"
                });
        });
    } else {
        res.status(300).json({
            info: "Valid Required Data not found!"
        })
    }
};

router.getItinerary = (req, res, next) => {
    Itinerary.find({
        userId: req.userId
    }, function (err, data) {
        if (err)
            res.status(500).json(err);
        else if (!data)
            res.status(404).json({
                info: "No Itinerary found"
            });
        else
            res.status(200).json({
                info: "Data found!",
                data: data
            })
    });
};

router.deleteItinerary = (req, res, next) => {
    let itineraryId = req.params.itineraryId;
    Itinerary.findByIdAndRemove(itineraryId,
        function (err) {
            if (err)
                res.status(500).json(err);
            else
                res.status(200).json({
                    info: "Itinerary delete success"
                })
        });
};

module.exports = router;