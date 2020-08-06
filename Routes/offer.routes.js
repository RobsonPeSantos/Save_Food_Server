// DESCOMENTAR USER ID ASSIM QUE INSERIDO O PRIMEIRO USER

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../Routes/auth.routes");

const Offer = require("../models/Offer.model");
const User = require("../models/User.model");

// CREATE NEW OFFER
router.post("/offer/create", async (req, res) => {
  const {
    title,
    value,
    photo,
    availableQty,
    reservationLimitPeriod,
  } = req.body;
  try {
    const response = await Offer.create({
      title,
      value,
      photo,
      availableQty,
      reservationLimitPeriod,
      owner: req.user._id,
    });

    return res.status(201).json(response);
  } catch (err) {
    throw new Error(err);
  }
});

// GET ALL OFFERS
router.get("/offers", async (req, res) => {
  try {
    const response = await Offer.find();
    return res.status(200).json(response);
  } catch (err) {
    throw new Error(err);
  }
});

// GET OFFER BY ESTABLISHMENT
router.get("/offers/:establishmentId", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.establishmentId)) {
    res.status(400).json({ message: "id especificado não é válido" });
    return;
  }
  try {
    const response = await Offer.find({
      owner: { _id: req.params.establishmentId },
    });
    return res.status(200).json(response);
    //   .populate("user")
    //   .exec();
  } catch (err) {
    throw new Error(err);
  }
});

// GET OFFER BY ID
router.get("/offer/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "id especificado não é válido" });
    return;
  }
  const { id } = req.params;
  try {
    const response = await Offer.find({
      _id: id,
    });
    console.log(response); // CONSOLE LOG TIRAR <<<<<<<<<<<<<<<<<<<<<<<
    return res.status(200).json(response);
  } catch (err) {
    throw new Error(err);
  }
});

//PUT UPDATE OFFER
router.put("/offer/update/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "id especificado não é válido" });
    return;
  }
  const { id } = req.params;
  try {
    const response = await Offer.updateOne(
      {
        _id: id,
      },
      req.body
    );
    return res.status(200).json(response);
  } catch (err) {
    throw new Error(err);
  }
});

// DELETE OFFER
router.delete("/offer/delete/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "id especificado não é válido" });
    return;
  }
  const { id } = req.params;
  try {
    const response = await Offer.deleteOne({
      _id: id,
    });
    return res.status(200).json(response);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
