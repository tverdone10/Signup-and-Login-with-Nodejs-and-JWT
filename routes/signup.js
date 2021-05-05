const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/test", (req, res) => {
  console.log("Hello World");
  res.send("You've hit /signup/test!");
});

router.post("/", async (req, res) => {
  try {

    console.log(req.body)

    let userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        hobbies: req.body.hobbies,
    }
    // Let's test if we have anyone else on our platform with the same email

    // let user = await User.findOne({
    //   email: req.body.email,
    // });

    // If this user already exists, tell the user they are already on the platform

    // if (user)
    //   return res.status(404).json({
    //     message: "Failed, email address is already taken",
    //   });

    // Then let's make sure our password is complex enough
    var regularExpression = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!regularExpression.test(req.body.password))
      return res
        .status(401)
        .send(
          "password should contain at least one number and one special character"
        );

    // Then let's actually create the new user

    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      hobbies: req.body.hobbies,
    });

    // Encrypt the password so anyone with access to our DB can't see it

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // Save our new User

    await user.save();

    // Here we'll create our token -- it takes the payload and our secret token
    // You'll want to hide this token in an env, but I'm putting it here for demonstration


    let accessToken = jwt.sign(user.email, "Secret_Value");

    // Here we can make our accessToken a cookie, which can be used as a header to authorize our user
    
    res.cookie('authorization', accessToken, {
      httpOnly: true, //cookies are only accessible from a server
      secure: true, //cookie must be transmitted over https
      sameSite: 'none' //prevents cookie from being sent in cross site requests
    });

    return res.status(200).json({
        message: "You've successfully signed up!",
        token: accessToken,
        user: userInfo
    })
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
