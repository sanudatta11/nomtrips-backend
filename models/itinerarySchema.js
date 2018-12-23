let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var itinerarySchema = new Schema({
        "userId": {
            type: ObjectId,
            required: true,
            ref: 'User'
        },
        "cityId": {
            type: ObjectId,
            required: true,
            ref: 'City'
        },
        "tripName": {
            type: String,
            required: true
        },
        "dateFrom": {
            type: Date,
            required: true
        },
        "dateTo": {
            type: Date,
            required: true
        },
        "description": {
            type: String,
            required: true
        },
        "restaurantData" : [{
            "date" : {
                type : Date
            },
            "restaurantId" : [{
                type : ObjectId,
                ref : 'Restaurant'
            }]
        }],
        "public" : {
            type :  Boolean,
            required : true,
            default : false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Itinerary', itinerarySchema);