const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const bcrypt = require('bcrypt');

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  userSchema
    .findOne({email : email})
    .then((user) => {
      console.log(password);
      console.log(user.password);
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      console.log(isPasswordCorrect);
      if (isPasswordCorrect) {
        const userResp = {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
        };
        res.send(userResp);
      } else {
        res.send("Incorrect password");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("User not found");
    });
});

module.exports = router;
