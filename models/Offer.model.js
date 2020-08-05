const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  title: String,
  value: Number,
  active: { type: Boolean, default: true },
  photo: String,
  availableQty: Number,
  reservationLimitPeriod: Date, //datepicker

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
