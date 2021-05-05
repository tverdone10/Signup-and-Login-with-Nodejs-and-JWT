const jwt = require("jsonwebtoken");


module.exports = async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "Secret_Value", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      console.log("Cool, your token is valid!");
      next();
    });
  } catch (error) {
    return res.status(401).send("invalid token");
  }
};