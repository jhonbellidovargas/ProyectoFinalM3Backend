const express = require("express");
const router = express.Router();

const userSchema = require("../models/user");

// Create a new user
router.post("/users", (req, res) => {
  const user = new userSchema(req.body);
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
  const { name, email, age } = req.body;
  userSchema
    .updateOne({ _id: userId }, { $set: { name, email, age } })
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
