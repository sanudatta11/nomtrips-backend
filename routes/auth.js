var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');
let crypto = require('crypto');
let sha256 = require('sha256');
let User = require('../models/userSchema');


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

router.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let hash = crypto.createHash('sha256').update(password).digest('base64');
    User.findOne({
        email: email,
    }, function (err, data) {
        if (err)
            res.status(500).json({
                error: err
            });
        else if (!data)
            res.status(404).json({
                info: "Data not found"
            });
        else {
            if (data.typeOfUser === 3) {
                res.status(302).json({
                    info: "Lead cannot Login"
                })
            }
            else if (data.password !== hash) {
                res.status(400).json({
                    info: "Password Incorrect",
                })
            }
            else {
                let jwtToken = jwt.sign({
                    userId: data._id,
                    typeOfUser: data.typeOfUser,
                    name: capitalizeFirstLetter(data.firstName) + ' ' + capitalizeFirstLetter(data.lastName)
                }, 'supersecret', {
                    expiresIn: 150000000
                });

                res.status(200).json({
                    info: "User Login successful",
                    typeOfUser: data.typeOfUser,
                    token: jwtToken
                })
            }
        }
    });
};

router.validateInvite = (req, res, next) => {
    let userId = req.params.userId;
    User.find({
        _id: userId,
        typeOfUser: 3
    }, function (err, data) {
        if (err)
            res.status(500).json(err);
        else if (!data)
            res.status(404).json({
                info: "Data not found on user!"
            });
        else
            res.status(200).json(data);
    });
};

router.createOnReference = (req, res, next) => {
    /**
     * After creating user Object
     * 0. Update leadByReference
     * 1. Find the Lead user who referred
     * 2. Find the sales person who reffered that lead
     * 3. Update lead count on the sales
     * 4. Update lead count on the lead
     */

    let userId = req.body.userId;
    let salesId = req.body.salesId;
    let email = req.body.email;
    let phone = req.body.phone;
    let countryCode = req.body.countryCode;
    let firstName = (req.body.firstName).toLowerCase();
    let lastName = (req.body.lastName).toLowerCase();
    let emailSend = (req.body.emailSend == "false") ? false : true;
    let smsSend = (req.body.smsSend == "false") ? false : true;
    if (userId && salesId && email && phone && firstName && lastName && countryCode) {
        let userObj = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            leadByReference: userId,
            leadBy: salesId
        });
        userObj.save(function (err, userObj) {
            if (err)
                res.status(500).json(err);
            else if (!userObj)
                res.status(404).json({
                    info: "Blank user Save"
                })
            else {
                User.findById(userId,
                    function (err, data) {
                        if (err)
                            res.status(500).json(err);
                        else if (!data)
                            res.status(404).json({
                                info: "Blank user Find of User lead"
                            })
                        else {
                            console.log(data);
                            data.leads = data.leads + 1;
                            data.save(function (err, newData) {
                                User.findById(salesId, function (err, newData) {
                                    if (err)
                                        res.status(500).json(err);
                                    else if (!newData)
                                        res.status(404).json({
                                            info: "Couldnot find Sales Object"
                                        })
                                    else {
                                        newData.leads = newData.leads + 1;
                                        newData.save(function (err, newData) {
                                            if (err)
                                                res.status(500).json(err);
                                            else
                                                res.status(200).json(userObj);
                                        })
                                    }
                                })
                            })
                        }
                    });
            }
        });
    }
    else {
        res.status(300).json({
            info: "Details Invalid or empty!"
        })
    }
};

module.exports = router;
