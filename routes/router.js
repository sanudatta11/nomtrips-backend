let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

let config = require('../config');
let cityRoutes = require('./city');
let restaurantRoutes = require('./restaurant');
let userRoutes = require('./userProfile');

//Non Auth Routes

//City Routes
router.get('/getCities/:cityName',cityRoutes.getCities);
router.get('/getCityById/:cityId',cityRoutes.getCityById);

//Restaurant Routes
router.get('/getRestaurantsByCityId/:cityId',restaurantRoutes.getRestaurantsByCityId);
router.post('/getRestaurantsByNameAndCityId',restaurantRoutes.getRestaurantsByNameAndCityId);

//Auth Routes
router.use(function(req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    try {
        if (token) {
            jwt.verify(token, config.jwtKey, function (err, decoded) {
                if (err) {
                    console.log(err);
                    return res.status(403).json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.userId = decoded.userId;
                    req.companyId = decoded.companyId;
                    next();
                }
            });

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({
            info : "Exception in JWT decoding",
            error : error
        })
    }
});

//City Routes
router.post('/createCity',cityRoutes.createCity);
router.post('/editCity',cityRoutes.editCity);
router.get('/deleteCity/:cityId',cityRoutes.deleteCity);

//Restaurant Routes
router.post('/createRestaurant',restaurantRoutes.createRestaurant);
router.post('/editRestaurant',restaurantRoutes.editRestaurant);
router.get('/deleteRestaurant/:restaurantId',restaurantRoutes.deleteRestaurant);
module.exports = router;
