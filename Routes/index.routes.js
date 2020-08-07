const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// const User = require("../models/User.model");
// const Offer = require("../models/Offer.model");


const uploader = require("../configs/cloudinary");
const { Router } = require("express");

// FILE UPLOAD - Offer attachment
router.post(
    "/upload-attachment",
    uploader.single("attachment"),
    (req, res) => {
      if (!req.file) {
        return res.status(500).json({ message: "No file uploaded!" });
      }
  
      return res.status(200).json({ attachmentUrl: req.file.secure_url });
    }
  );

  module.export = Router