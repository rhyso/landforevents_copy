const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//https://stackoverflow.com/questions/34985846/mongoose-document-references-with-a-one-to-many-relationship

const Field = new Schema(
    {
        owner: { //store the object id of the owner here
            type: Schema.Types.ObjectId,
            ref: 'Owner'
        },
        fieldName: String,
        location: String,
        dateStart: String,
        dateEnd: String,
        wedding:  {
            type: String,
            default: false,
        },
        marquee: {
            type: String,
            default: false,
        },
        camping:  {
            type: String,
            default: false,
        },
        fieldSize : Number,
        fieldCapacity: Number,
        images: [{ type: Schema.Types.ObjectId, ref: 'LandImage' }]
    },
);

module.exports = mongoose.model("Field", Field);
