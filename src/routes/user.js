const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const userSchema = require("../models/user");

// Create a new user
router.post("/users", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = new userSchema({
    name: req.body.name,
    email: req.body.email,
    userName: req.body.userName,
    password: hash,
  });
  user
    .save()
    .then((data) => {
      if (data.keyPattern) {
        res.json({
          message: "Username or email already exists",
        });
      } else {
        return res.json({
          id: data._id,
          name: data.name,
          userName: data.userName,
          createdAt: data.createdAt,
          email: data.email,
        });
      }
    })
    .catch((error) => {
      res.json({
        message: error.message,
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
        message: error.message,
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
        message: error.message,
      });
    });
});

// Update a user
router.put("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, email, userName, password } = req.body;
  // si no se envía password, se mantiene el mismo
  if (!password) {
    userSchema
      .updateOne(
        { _id: userId },
        {
          $set: {
            name: name,
            email: email,
            userName: userName,
          },
        }
      )
      .then((data) => {
        if (data.keyPattern) {
          res.json({
            message: "Username or email already exists",
          });
        } else {
          res.json(data);
        }
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
    return;
  } else {
    const hash = bcrypt.hashSync(password, 10);

    userSchema
      .updateOne(
        { _id: userId },
        {
          $set: {
            name: name,
            email: email,
            userName: userName,
            password: hash,
          },
        }
      )
      .then((data) => {
        if (data.keyPattern) {
          res.json({
            message: "Username or email already exists",
          });
        } else {
          res.json(data);
        }
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
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
        message: error.message,
      });
    });
});

module.exports = router;
