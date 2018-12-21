var express = require('express');
var router = express.Router();

let validator = require('validator');
let async = require('async');
let jwt = require('jsonwebtoken');
let crypto = require('crypto');
let sha256 = require('sha256');
let User = require('../models/userSchema');
let config = require('../config');


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
            } else if (data.password !== hash) {
                res.status(400).json({
                    info: "Password Incorrect",
                })
            } else {
                let jwtToken = jwt.sign({
                    userId: data._id,
                    typeOfUser: data.typeOfUser,
                    name: capitalizeFirstLetter(data.firstName) + ' ' + capitalizeFirstLetter(data.lastName)
                }, config.jwtKey, {
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
//
// router.validateInvite = (req, res, next) => {
//     let userId = req.params.userId;
//     User.find({
//         _id: userId,
//         typeOfUser: 3
//     }, function (err, data) {
//         if (err)
//             res.status(500).json(err);
//         else if (!data)
//             res.status(404).json({
//                 info: "Data not found on user!"
//             });
//         else
//             res.status(200).json(data);
//     });
// };

router.signUp = (req, res, next) => {
    try {

        //Normal User SignUp
        let firstName = (req.body.firstName).toLowerCase();
        let lastName = (req.body.lastName).toLowerCase();
        let imgUrl = req.body.imgUrl;
        let email = req.body.email;
        let password = req.body.password;
        let phone = req.body.phone;
        let gender = req.body.gender;
        let bio = req.body.bio;
        let typeOfUser;
        if (req.typeOfUser === 1)
            typeOfUser = req.typeOfUser;
        else
            typeOfUser = 2;
        let hash = crypto.createHash('sha256').update(password).digest("base64");
        if (firstName && lastName && email && phone && bio && typeOfUser && hash) {
            let userObj = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                phone: phone,
                bio: bio,
                typeOfUser: typeOfUser,
            });
            if (imgUrl)
                userObj.imgUrl = imgUrl;
            if (gender)
                userObj.gender = gender;
            userObj.save(function (err, userObj) {
                    if (err)
                        res.status(500).json(err);
                    else if (!userObj)
                        res.status(404).json({
                            info: "Blank user Save"
                        });
                    else
                        res.status(200).json({
                            info: "User object created",
                            userObj: userObj
                        })
                }
            );
        } else {
            res.status(300).json({
                info: "Details Invalid or empty!"
            })
        }
    } catch (err) {
        console.error(err);
        res.status(501).json(err);
    }
};

router.getTakenEmail = (req, res, next) => {
    let email = req.params.email;
    User.findOne({
        email: email
    }, function (err, data) {
        if (err)
            res.status(500).json(err);
        else if (userObj)
            res.status(300).json({
                info: "Email Already Present"
            })
        else
            res.status(200).json({
                info: "User object created",
                userObj: newData
            })
    });
};
module.exports = router;
