const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Contact = require("../models/Contact");

//@route    GET    api/contacts
//@desc     Get all user contacts
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST    api/contacts
//@desc     Add new contact
//@access   Private
router.post("/", (req, res) => {
  res.send("Add a new contact");
});

//@route    PUT    api/contacts/:id
//@desc     Update contact
//@access   Private
router.put("/:id", (req, res) => {
  res.send("Update current contact");
});

//@route    DELETE   api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete("/:id", (req, res) => {
  res.send("Delete current contact");
});
module.exports = router;
