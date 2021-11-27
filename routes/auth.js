require('dotenv').config()
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
router.post("/register", [
      check("name", "Name is required").not().isEmpty().isLength({ min: 5 }),
      check("email", "Enter a valid email address").isEmail(),
      check("password", "Enter a Password with minimum 6 characters").not().isEmpty().isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, password } = req.body;

      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        //payload
        const payload = {
          user: { id: user.id,},
        };
        //jwt
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
        );
      } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
      }
    }
);

router.post(
    "/login",
    [
      check("email", "Please enter a valid email address").isEmail(),
      check("password", "Please enter password")
          .not()
          .isEmpty()
          .isLength({ min: 8 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email });
        //checking if user does not exist
        if (!user) {
          return res
              .status(400)
              .json({ errors: [{ msg: "User does not exists" }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: "Wrong Password" }] });
        }

        //payload
        const payload = {
          user: {
            id: user.id,
          },
        };
        //json web token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
        );
      } catch (error) {
        res.status(500).send(error);
      }
    }
);

module.exports = router;
