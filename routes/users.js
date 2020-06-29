const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
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
  async (req, res) => {
    //res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //ensures there is no duplicate user accounts
      if (user) {
        return res
          .status(400)
          .json({ msg: "Email registered to existing user" });
      }
      //creates a new user
      user = new User({
        name,
        email,
        password
      });
      //salt encrypts the information
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      //saves user data
      await user.save();
      //res.send("user saved");

      const payload = {
        user: {
          id: user.id
        }
      };
      //give the user a token to remain logged in
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
