const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  dateJoined: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  isPremium: {
    type: Boolean,
    required: true,
    default: false
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      isPremium: this.isPremium,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(255),
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(255),
    password: Joi.string()
      .required()
      .min(5)
      .max(255),
    isAdmin: Joi.boolean(),
    isPremium: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
