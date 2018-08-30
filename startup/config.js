const config = require("config");

module.exports = function() {
  console.log("JWT Private Key : ", config.get("jwtPrivateKey"));
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR : JWT Private key is undefined");
    process.exit(1);
  }
};
