const mongoose = require("mongoose");
const { string, number } = require("zod");

require("dotenv").config();
const mongoUrl = process.env.mongo_url;
mongoose.connect(mongoUrl);

const UserSchema = mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: Number,
});

const transectionSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["debit", "credit"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Users", UserSchema);
const Account = mongoose.model("Account", accountSchema);
const Transections = mongoose.model("Transections", transectionSchema);
module.exports = {
  User,
  Account,
  Transections,
};
