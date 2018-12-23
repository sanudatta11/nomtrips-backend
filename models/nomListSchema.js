let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var nomListSchema = new Schema({
        "userId" : {
          type: ObjectId,
          ref : 'User',
          required: true
        },
        "cityId": {
            type: ObjectId,
            required: true,
            ref: 'City'
        },
        "restaurantId" : {
            type : ObjectId,
            required : true,
            ref : 'Restaurant'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('NomList', nomListSchema);