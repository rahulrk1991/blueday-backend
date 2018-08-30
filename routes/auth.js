const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { User } = require("../models/users");
const router = express.Router();

router.post("/", async (request, response) => {
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: request.body.email });
  if (!user) return response.status(400).send("Email Id does not exist");

  const validPassword = await bcrypt.compare(
    request.body.password,
    user.password
  );
  if (!validPassword) return response.status(400).send("Invalid password");

  const token = user.generateAuthToken();
  response.send(token);
});

function validate(request) {
  const schema = {
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(255),
    password: Joi.string()
      .required()
      .min(5)
      .max(255)
  };

  return Joi.validate(request, schema);
}

module.exports = router;
