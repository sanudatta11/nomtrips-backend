let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var citySchema = new Schema({
        "cityName": {
            type: String,
            required: true
        },
        "description": {
            type: String,
            required: true
        },
        "latitude" : {
            type: String
        },
        "longitude": {
            type: String
        },
        "pageTitle" : {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('City', citySchema);