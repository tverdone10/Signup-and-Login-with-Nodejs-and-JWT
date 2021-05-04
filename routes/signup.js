const router = require('express').Router();

router.get("/test", (req, res) => {
    console.log("Hello World")
    res.send("You've hit /signup/test!")
})

module.exports = router;