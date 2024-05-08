const express = require("express");
const userRouter = express.Router();
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const middleware = require("../middleware/middleware");
const app = express();
const bcrypt = require("bcrypt");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const signinSchema = zod.object({
  useranme: zod.string().email(),
  password: zod.string(),
});

const putSchema = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional(),
});

userRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sucess = signupSchema.safeParse(req.body);
  if (!sucess) {
    return res.json({
      mgs: "Invalid Input",
    });
  }

  const existingUser = await User.findOne({
    username: username,
  });

  if (existingUser) {
    return res.status(404).json({
      msg: "User already exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const userId = user._id;
  const token = jwt.sign({ userId }, jwtSecret);
  await Account.create({
    userId: userId,

    balance: Math.floor(Math.random() * 100000) + 1,
  });
  res.status(201).json({
    msg: "User Addede successfully",
    user,
    token,
  });
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const sucess = signinSchema.safeParse(req.body);
    if (!sucess) {
      return res.json({
        msg: "Invalid input",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        msg: "Invalid Username",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({
        msg: "Invalid password",
      });
    }
    // const user = await User.findOne({
    //   useranme: req.body.useranme,
    //   password: req.body.password,
    // });
    const token = jwt.sign({ userId: user._id }, jwtSecret);

    res.json({
      msg: "Signin successfully",
      token,
    });
  } catch (error) {
    res.status(404).json({
      msg: "Sign in failed",
    });
  }
});

userRouter.get("/all_users", middleware, async (req, res) => {
  const loggedInUser = await User.findById(req.userId);
  const { balance } = await Account.findOne({
    userId: req.userId,
  });
  // const balance = accountOfLoggedinUser.balance

  const allUsers = await User.find();

  const allOtherUsers = allUsers.filter(
    (user) => user._id.toString() !== loggedInUser._id.toString()
  );

  res.json({
    user: loggedInUser,
    balance,
    users: allOtherUsers,
  });
});

userRouter.put("/update", middleware, async (req, res) => {
  const sucess = putSchema.safeParse(req.body);

  console.log("Request", req.body);
  if (!sucess) {
    return res.json({
      msg: "Invalid input",
    });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  res.status(200).json({
    msg: "Updated Successfuly",
  });
});

userRouter.get("/deleteuser", middleware, async (req, res) => {
  const username = await User.findOne({
    _id: req.userId,
  });
  console.log(username);
  res.json({
    username,
  });
});

const deleteBody = zod.string();

userRouter.delete("/delete", middleware, async (req, res) => {
  const username = req.body.username;
  // console.log("username: ", username);

  const { success } = deleteBody.safeParse(username);
  if (!success) {
    res.status(400).json({
      message: "Error while deleting account due to invalid username",
    });
  }

  const userExists = await User.findOne({ username });
  // console.log(userExists);

  if (!userExists) {
    res.status(404).json({
      message: `No account found with username: ${username}`,
    });
  }

  await User.deleteOne({ username });
  await Account.deleteOne({ userId: userExists._id });

  res.json({ message: "Account deleted successfully" });
});

userRouter.get("/bulk", async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        { firstname: { $regex: new RegExp(filter, "i") } },
        { lastname: { $regex: new RegExp(filter, "i") } },
      ],
    });
    res.json({
      user: users.map((user) => ({
        username: user.useranme,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user._id,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      meg: "Internal Error",
    });
  }
});

module.exports = {
  userRouter,
};
