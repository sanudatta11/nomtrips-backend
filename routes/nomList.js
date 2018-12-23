var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');

let ObjectId = require('mongoose').Types.ObjectId;

let NomList = require('../models/nomListSchema');


router.addToNomList = (req, res, next) => {
    let cityId = req.body.cityId;
    let restaurantId = req.body.restaurantId;
    if (cityId && restaurantId && ObjectId.isValid(cityId) && ObjectId.isValid(restaurantId)) {
        NomList.findOne({
            userId: req.userId,
            cityId: cityId,
            restaurantId: restaurantId
        }, function (err, data) {
            if (err)
                res.status(500).json(err);
            else if (data)
                res.status(404).json({
                    info: "Object not save! Already Present"
                })
            else {
                    let newNomList = new NomList({
                        userId : req.userId,
                        cityId : cityId,
                        restaurantId: restaurantId
                    });
                newNomList.save(function (err,data) {
                    if (err)
                        res.status(500).json(err);
                    else if (!data)
                        res.status(404).json({
                            info: "Blank Object returned Save NomList"
                        });
                    else
                        res.status(200).json({
                            info: "NomList save successful",
                            newRes: data
                        });
                });
            }
        });
    } else {
        res.status(300).json({
            info: "Nom List Ids not valid"
        })
    }
};

router.removeFromNomList = (req, res, next) => {
    let nomListId = req.params.nomListId;
    NomList.findByIdAndRemove(nomListId, function (err) {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json({
                info: "NomList Removed!"
            })
    });
};

router.getNomList = (req, res, next) => {
    NomList.find({
        userId: req.userId
    }, function (err,data) {
        if (err)
            res.status(500).json(err);
        else if(!data){
            res.status(404).json({
                info : "Blan Object returned!"
            })
        }
        else
            res.status(200).json({
                info: "Nom List found",
                data:data
            })
    });
};


module.exports = router;
