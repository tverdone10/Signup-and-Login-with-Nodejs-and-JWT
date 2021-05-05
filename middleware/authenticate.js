const jwt = require("jsonwebtoken");

// Here is our middleware function which will handle all of our user authentication

module.exports = async function authenticate(req, res, next) {
  try {

    // Here we are checking the token which should be in our header, labelled "authorization"
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    // If there is nothing there, send a 401 status
    if (token == null) return res.sendStatus(401);

    // Here jwt will verify it for us. It will take the token from the header, take our Secret Key, and let us know if it's valid
    jwt.verify(token, "Secret_Value", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      console.log("Cool, your token is valid!");
      next();
    });
  } catch (error) {
    // If it's not valid, it'll give us an error
    return res.status(401).send("invalid token");
  }
};
