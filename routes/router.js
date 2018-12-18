var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

let companyRoute = require('./companyRouter');
//
// router.use(function(req, res, next) {
//     var token = req.body.token || req.query.token || req.headers.authorization;
//     try {
//         if (token) {
//             jwt.verify(token, 'supersecret', function (err, decoded) {
//                 if (err) {
//                     console.log(err);
//                     return res.status(403).json({
//                         success: false,
//                         message: 'Failed to authenticate token.'
//                     });
//                 } else {
//                     req.userId = decoded.userId;
//                     req.companyId = decoded.companyId;
//                     next();
//                 }
//             });
//
//         } else {
//             return res.status(403).send({
//                 success: false,
//                 message: 'No token provided.'
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(501).json({
//             info : "Exception in JWT decoding",
//             error : error
//         })
//     }
// });

module.exports = router;
