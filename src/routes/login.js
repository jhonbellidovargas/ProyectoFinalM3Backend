const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const bcrypt = require('bcrypt');

router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  userSchema
    .findOne({userName : userName})
    .then((user) => {
      console.log(password);
      console.log(user.password);
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      console.log(isPasswordCorrect);
      if (isPasswordCorrect) {
        const userResp = {
          id: user._id,
          name: user.name,
          userName: user.userName,
          createdAt: user.createdAt,
          email: user.email,
        };
        res.send(userResp);
      } else {
        res.send("Incorrect password");
      }
    })
    .catch((err) => {
      res.send(
        "User not found"
      );
    });
});

module.exports = router;
