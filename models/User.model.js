 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    companyName: String,
    category: String,
    cuisine: [], //ex - Italian, French, Brazilian
    phone: String,
    email: String,
    address: {
        street: String,
        number: Number,
        complement: String,
        neighborhood: String,
        city: String,
    },
    paymentForms: [], //credit card, cash, meal ticket
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    delivery: Boolean,
    takeaway: Boolean,
    takeawayTime: {
        startTime: String, //use setHours() method
        endTime: String,
    },


  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;