const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const jwt =require('jsonwebtoken')

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 4 }),
  body("username").trim().isLength({ min: 4 }),
  body("password").trim().isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "invalid data" });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json(newUser);
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 4 }),
  body("password").trim().isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ erros: errors.array(), message: "invalid data" });
    }

    const {username,password} =req.body
    const user = await userModel.findOne({username:username})
    if(!user){
        return res.status(400).json({message:"invalid username or password"})
    }
     
    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"invalid username or password"})
    }
    const token = jwt.sign({
        userId:user._id,
        email:user.emai,
        username:user.username
    },process.env.JWT_SECRET)

res.cookie("token",token)

    res.send("logged in")
  }
);

module.exports = router;
