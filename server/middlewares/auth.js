const jwt = require("jsonwebtoken");

module.exports = function login(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send();

  try {
    const decoded = jwt.verify(token, "aghkshdjfdgfklyeru42fdg");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send();
  }
};
