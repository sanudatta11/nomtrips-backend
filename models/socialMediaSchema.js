let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let socialSchema = new Schema({
        "userId" :{
            type: ObjectId,
            ref : 'User'
        },
        "facebook": {
            type: String
        },
        "instagram": {
            type: String
        },
        "youtube": {
            type: String
        },
        "twitter": {
            type: String
        },
        "website": {
            type: String
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Social', socialSchema);