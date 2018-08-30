const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const auth = require("../middleware/auth");

const { User, validate } = require("../models/users");

const router = express.Router();

router.get("/me", auth, async (request, response) => {
  let user = await User.findById(request.user._id).select("-password");
  return response.send(user);
});

router.post("/", async (request, response) => {
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: request.body.email });
  if (user) return response.status(400).send("User already registered");

  user = new User(_.pick(request.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.dateJoined = new Date();
  user = await user.save();

  const token = user.generateAuthToken();

  response
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "isPremium", "isAdmin"]));
});

module.exports = router;
