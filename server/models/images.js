const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LandImage = new Schema(
    {
        field: { //store the object id of the field here
            type: Schema.Types.ObjectId,
            ref: 'Field'
        },        
        imageUrl: String,
    },
);

module.exports = mongoose.model("LandImage", LandImage);
