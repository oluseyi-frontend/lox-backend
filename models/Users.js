const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
