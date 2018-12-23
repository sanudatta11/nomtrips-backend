let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/*
    User Types :-
    1. Admin
    2. Normal User
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
        "bio" : {
            type: String,
            required: true
        },
        "subscribed" : {
            type: Boolean,
            default: true
        },
        "country" :{
            type: String
        },
        "state" : {
            type: String
        },
        "city": {
          type: String
        },
        "facebook" : {
          type: String
        },
        "instagram" : {
          type: String
        },
        "youtube" : {
          type: String
        },
        "website" : {
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