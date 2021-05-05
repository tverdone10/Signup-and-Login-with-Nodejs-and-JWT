const jwt = require("jsonwebtoken");
const router = require("express").Router();
const auth = require("../middleware/authenticate");
const User = require ("../models/user")
const Post = require("../models/posts");


// Here you will only be allowed to post if you have a valid auth token, which will be handled by our "auth" middleware

router.post("/", auth, async function (req, res, next) {
  try {
    console.log(req.user)
    post = new Post({
      email: req.user,
      post: req.body.post,
    });


    await post.save();

    return res.status(200).json({
      message: `Thanks ${req.user} for posting!`
    })
  } catch (error) {
      console.log(error)
  }
});

// Here we will get all of the posts we've made on our own account, also handled by our "auth" middleware function
router.get("/myposts", auth, async function (req, res, next) {
  try {

    // If this user doesn't exist, send an error message
    user = await User.findOne({email: req.user})
    if (!user) return res.status(404).send("This user doesn't exist;")
    console.log(user)

    // Find all of the posts we've made with our account
    posts = await Post.find({email: req.user})
    res.status(200).send(posts)
  } catch (error) {
    return res.status(401).send("You had some kind of error");

  }
})

module.exports = router