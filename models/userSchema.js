let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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