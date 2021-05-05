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


    // Here we'll create our token -- it takes the payload and our secret token
    // You'll want to ideally hide this token in an env, but I'm putting it here for demonstration

    let accessToken = jwt.sign(user.email, "Secret_Value");

    res.cookie('authorization', accessToken, {
      httpOnly: true, //cookies are only accessible from a server
      secure: true, //cookie must be transmitted over https
      sameSite: 'none' //prevents cookie from being sent in cross site requests
    });

    return res.status(200).json({
        message: "You've successfully logged in!",
        token: accessToken,
        user: userInfo
      });

  } catch(error) {
      console.log(error)
  }
});

module.exports = router;