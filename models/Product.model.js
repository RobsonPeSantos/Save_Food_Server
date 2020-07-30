const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  value: Number,
  state: [],
  photo: String,
  availableQty: Number,
  reservationLimitPeriod: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;