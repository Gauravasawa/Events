const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser.js");

const JWT_Secret = "faq@ManagmentS=@'System$#";

//Route 1: Create auser using: POST '/api/auth/createUser'
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be 5 character long").isLength({ min: 5 }),
  ],
  async (req, resp) => {
    //if error found return bad req and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ success: false, errors: errors.array() });
    }
    //Check weather the user with email already exists
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return resp.status(400).json({
          success: false,
          error: "Soory a user with this email already exist",
        });
      }
      //password hashing & Salting
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_Secret);
      resp.json({ success: true, authToken });
      //   resp.json(user)
    } catch (
      err //catch errors
    ) {
      console.error(err.message);
      resp.status(500).send("Some Error Occured");
    }
  }
);

//Route 2: Authenticate a user using: POST '/api/auth/login'
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be 5 character long").exists(),
  ],
  async (req, resp) => {
    let success = false;
    //if error found return bad req throw error msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return resp
          .status(400)
          .json({
            success: false,
            error: "Please try with Correct Credentials",
          });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return resp.status(400).json({
          success: false,
          error: "Please try with Correct Credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_Secret);
      resp.json({ success: true, authToken });
    } catch (error) {
      console.error(error.message);
      resp.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Get LoggedIn User Details: POST '/api/auth/getuser' . Login Required
router.post("/getuser", fetchuser, async (req, resp) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    resp.send(user);
  } catch (error) {
    console.error(error.message);
    resp.status(500).send("Internal Server Error");
  }
});

module.exports = router;
