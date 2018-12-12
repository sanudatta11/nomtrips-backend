let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var restaurantSchema = new Schema({
        "restaurantName": {
            type: String,
            required: true
        },
        "description": {
            type: String,
            required: true
        },
        "address" : {
            type: String,
            required: true
        },
        "phone" : {
            type: String,
            required: true
        },
        "cuisine" : {
            type: Array
        },
        "timeOpen" : {
          type: String
        },
        "timeClose" : {
          type: String
        },
        "latitude" : {
            type: String,
            required: true
        },
        "longitude": {
            type: String,
            required: true
        },
        "website": {
            type: String
        },
        "twitter": {
            type: String
        },
        "instagram": {
            type: String
        },
        "gplus": {
            type: String
        },

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);