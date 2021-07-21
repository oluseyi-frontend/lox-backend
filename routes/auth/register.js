const express = require("express");
const User = require("../../models/Users");
const app = express();
const bcrypt = require("bcrypt");
const registerRoute = express.Router();
const { handleRegistrationValidation } = require("../../models/validation");
const { handleLoginValidation } = require("../../models/validation");



registerRoute.post("/", (req, res) => {

  const error = handleRegistrationValidation(req.body);
 
  if (error.error) {
    res.status(200).json({ joimsg: error.error.details[0].message });
  } else {
    const found = User.findOne({ phone: req.body.phone }).then((data) => {
      if (data) {
        res.status(200).json({ msg: "User already exists" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if (err) {
            } else {
              const user = new User({
                phone: req.body.phone,
                password: hash,
            
               
              });

              user
                .save()
                .then((data) => {
                  res.send({ msg: "registered" });
                })
                .catch((err) => {
                  
                  res.send(err);
                });
            }
          });
        });
      }
    });
  }
});


module.exports = registerRoute;
