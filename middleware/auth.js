const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function(request, response, next) {
  const token = request.header("x-auth-token");
  if (!token) {
    return response.status(401).send("Auth token not provided");
  }

  try {
    const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
    request.user = decodedPayload;
    next();
  } catch (ex) {
    response.status(400).send("Invalid Token");
  }
};
