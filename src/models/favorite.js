const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  pokemon: {
    type: Object,
    required: true,
  }
});

module.exports = mongoose.model("Favorite", favoriteSchema);
