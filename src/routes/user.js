const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const userSchema = require("../models/user");

// Create a new user
router.post("/users", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = new userSchema({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
    age: req.body.age,
  });
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
});

// Get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
});

// Get a specific user
router.get("/users/:userId", (req, res) => {
  userSchema
    .findById(req.params.userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
});

// Update a user
router.put("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, lastName, email, password, age } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  userSchema
    .updateOne({ _id: userId }, { $set: {
      name: name,
      lastName: lastName,
      email: email,
      password: hash,
      age: age,
    } })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
});

// Delete a user
router.delete("/users/:userId", (req, res) => {
  userSchema
    .findByIdAndDelete(req.params.userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
});

module.exports = router;
