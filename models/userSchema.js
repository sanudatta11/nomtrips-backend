let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * User status code and meanings
 * 1 - Admin - only one in whole system
 * 2 - Normal - Other Users
 */
var userSchema = new Schema({
        "firstName": {
            type: String,
            required: true
        },
        "lastName": {
            type: String,
            required: true
        },
        "imgUrl" : {
            type: String,
        },
        "email": {
            type: String,
            unique: true,
            required: true
        },
        "password": {
            type: String
        },
        "phone": {
            type: Number,
            required: true
        },
        "gender": {
            type: String
        },
        "typeOfUser" : {
            type: Number,
            required : true,
            default : 2
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);