var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');

let ObjectId = require('mongoose').Types.ObjectId;


let User = require('../models/userSchema');
let City = require('../models/citySchema');
let Restaurant = require('../models/restaurantSchema');

router.getProfile = (req,res,next) => {
    User.findById(req.userId,function (err,data) {
        if (err)
            res.status(500).json(err);
        else if (!data)
            res.status(404).json({
                info: "Blank Object not save"
            });
        else
            res.status(200).json(data);
    });
}
router.editProfile = (req,res,next) => {
    let firstName = (req.body.firstName).toLowerCase();
    let lastName = (req.body.lastName).toLowerCase();
    let imgUrl = req.body.imgUrl;
    let phone = req.body.phone;
    let gender = req.body.gender;
    let bio = req.body.bio;

    //new Profile details
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;

    if(req.userId && ObjectId.isValid(req.userId)){
        User.findById(req.userId,function (err,userObj) {
            if (err)
                res.status(500).json(err);
            else if (!userObj)
                res.status(404).json({
                    info: "User with that Id not found!"
                });
            else {
                if(firstName)
                    userObj.firstName = firstName;
                if(lastName)
                    userObj.lastName = lastName;
                if(imgUrl)
                    userObj.imgUrl = imgUrl;
                if(phone)
                    userObj.phone = phone;
                if(gender)
                    userObj.gender = gender;
                if(bio)
                    userObj.bio = bio;

                if(country)
                    userObj.country = country;
                if(state)
                    userObj.state = state;
                if(city)
                    userObj.city = city;

                userObj.save(function (err,userObj) {
                    if (err)
                        res.status(500).json(err);
                    else if (!userObj)
                        res.status(404).json({
                            info: "Blank user Save"
                        });
                    else
                        res.status(200).json({
                            info: "User object saved",
                            userObj: userObj
                        })
                });
            }
        });
    }
    else{
        res.status(300).json({
            info : "Improper required data sent!"
        })
    }
};

router.editSocial = (req,res,next) => {
    let instagram = req.body.instagram;
    let youtube = req.body.youtube;
    let website = req.body.website;
    let facebook = req.body.facebook;

    User.findById(req.userId,function (err,userObj) {
        if(instagram)
            userObj.instagram = instagram;
        if(youtube)
            userObj.youtube = youtube;
        if(website)
            userObj.website = website;
        if(facebook)
            userObj.facebook = facebook;

        userObj.save(function (err,userObj) {
            if (err)
                res.status(500).json(err);
            else if (!userObj)
                res.status(404).json({
                    info: "Blank user Save"
                });
            else
                res.status(200).json({
                    info: "User object saved",
                    userObj: userObj
                })
        });
    });
};

module.exports = router;