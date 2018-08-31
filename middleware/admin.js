module.exports = function(request, response, next) {
  console.log(request.user);
  if (!request.user.isAdmin) {
    return response.status(403).send("Forbidden");
  }
  next();
};
