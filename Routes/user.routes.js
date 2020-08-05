const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Offer = require("../models/Offer.model");

const auth = require("../Routes/auth.routes");

//Read - GET profile

router.get("/establishment/profile/:id", async (req, res) => {
  try {
    const response = await User.findOne({ _id: req.params.id });

    return res.status(200).json(response);
  } catch (err) {
    throw new Error(err);
  }
});

//Update - Establishment

router.put("/establishment/profile/update/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "O id especificado não é valido" });

    return;
  }
  try {
    const response = await User.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json(response);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
