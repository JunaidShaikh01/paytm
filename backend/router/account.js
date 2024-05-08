const express = require("express");
const middleware = require("../middleware/middleware");
const { Account } = require("../db/db");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", middleware, async (req, res) => {
  const accountNumber = await Account.findOne({
    userId: req.userId,
  });

  if (!accountNumber) {
    return res.status(404).json({
      msg: "Account not found for this user",
    });
  }
  res.json({
    balance: accountNumber.balance,
  });
});

accountRouter.post("/transfer", middleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { to, amount } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });
  if (!account || account.balance < amount) {
    session.abortTransaction();
    return res.status(404).json({
      msg: "Account not found or low balance",
    });
  }
  const toAcount = await Account.findOne({
    userId: to,
  });
  if (!toAcount) {
    session.abortTransaction();
    return res.status(404).json({
      msg: "To user account not found",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();
  res.json({
    msg: "Transfer succesfully",
  });
});

module.exports = { accountRouter };
