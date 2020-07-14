const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')

const Schema = mongoose.Schema;
//https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527

const Owner = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: String,
        alias: String,
        biography: String,
        email: String,
        fb_uid: String,
        fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }],
        created: {
            type: Date,
            default: Date.now
        },
    },
);

Owner.plugin(findOrCreate)

Owner.methods.combineName = function() {
    return this.firstName + this.lastName
}

module.exports = mongoose.model("Owner", Owner);



