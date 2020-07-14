const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSlot = new Schema(
    {
        isAvailable: Boolean,
        start_date: Date,
        end_date: Date,
        listing_id: { //store the object id of the owner here
            type: Schema.Types.ObjectId,
            ref: 'Owners'
        }, 
       
    },
);

module.exports = mongoose.model("BookingSlot", BookingSlot);
