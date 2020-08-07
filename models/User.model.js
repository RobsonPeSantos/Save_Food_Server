const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    establishment: {
      companyName: String,
      category: String,
      cuisine: [], //ex - Italian, French, Brazilian
      phone: String,
      email: String,
      photo: String,
      address: {
        street: String,
        number: Number,
        complement: String,
        neighborhood: String,
        city: String,
      },
      paymentForms: [], //credit card, cash, meal ticket
      offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
      delivery: Boolean,
      takeaway: Boolean,
      takeawayTime: {
        startTime: {type: String,
          default: "12:00"},
         //use setHours() method
        endTime: {type: String,
          default: "18:00"}
      },
      sales: []
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
