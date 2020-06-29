const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route    POST    api/users
//@desc     Register a user
//@access   Public
router.post(
  "/",
  [
    check("name", "Enter your name")
      .not()
      .isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter password with 6 or more characters").isLength({
      min: 6
    })
  ],
  (req, res) => {
    //res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;
