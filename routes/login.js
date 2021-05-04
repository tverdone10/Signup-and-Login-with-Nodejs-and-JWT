const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    let userInfo = {
      email: req.body.email,
      password: req.body.password,
    };

    // Make sure the user has provided the correct email

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({
        message: "Please provide the correct login information",
        info: userData,
      });

    // Make sure the user has provided the correct password compared against the password on our DB

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({
        message: "Please provide correct login details",
        info: userData,
      });

    // Placeholder for all of our JWT stuff

    let token = jwt.sign(
      {
        foo: "bar",
      },
      "shhhhh"
    );

    res.cookie('web-token', token, { 
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    return res.status(200).json({
        message: "You've successfully logged in!",
        token: token,
        user: userInfo
      });

  } catch(error) {
      console.log(error)
  }
});

module.exports = router;