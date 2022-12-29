const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");

const favoriteSchema = require("../models/favorite");

// Create a new
router.post("/favorites", async (req, res) => {
  const favorite = new favoriteSchema(req.body);
  favorite
    .save()
    .then((data) => {
      console.log(data);
      if (data.keyPattern) {
        res.send("Pokemon ya esta en favoritos");
      } else {
        console.log("Pokemon agregado a favoritos");
        res.json(data);
      }
    })
    .catch((error) => {
      res.json({
        message: error.message
      });
    });
});

// Get all
router.get("/favorites", (req, res) => {
  favoriteSchema
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

// Get pokemon list by user id
router.get("/favorites/:userId", (req, res) => {
  const { userId } = req.params;
  //vemos si existe el usuario
  const user = userSchema.findById(userId);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    favoriteSchema
      .find({
        userId: userId,
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
});

// Update a
router.put("/favorites/:id", (req, res) => {
  const { id } = req.params;
  const { userId, pokemon } = req.body;
  favoriteSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          userId: userId,
          pokemon: pokemon,
        },
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

// Delete a
router.delete("/favorites/:favoriteId", (req, res) => {
  const { favoriteId } = req.params;
  favoriteSchema
    .deleteOne({
      _id: favoriteId,
    })
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
