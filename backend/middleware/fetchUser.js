const jwt = require("jsonwebtoken");

const JWT_SECRET = "utkarshisagoodb$oy"; // use the same key you used while generating token

module.exports = function fetchUser(req, res, next) {
  // Get the token from header
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify token
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // store user info in request object
    next(); // pass control to next handler
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};
