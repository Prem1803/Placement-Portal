const jwt = require("jsonwebtoken");
const config = require("config");

//Middelware for decoding the json web token which is passed in the request header
module.exports = function (req, res, next) {
  let token = req.header("x-auth-token"); //extracting the token from the header
  if (token && token[0] === '"') token = token.slice(1, -1);

  if (!token) {
    //if not is there
    res.status(401).json({ msg: "No Token Authorization denied" });
  } else {
    //decoding the token
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded.user;
      req.student = decoded.student;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Invalid Token " });
    }
  }
};
