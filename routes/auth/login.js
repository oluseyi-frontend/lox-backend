const express = require("express");
const User = require("../../models/Users");
const app = express();
const bcrypt = require("bcrypt");
const loginRoute = express.Router();
const { handleRegistrationValidation } = require("../../models/validation");
const { handleLoginValidation } = require("../../models/validation");
const jwt = require("jsonwebtoken");
require("dotenv").config();

loginRoute.post("/", (req, res) => {
  const error = handleLoginValidation(req.body);
  if (error.error) {
    res.status(200).json({ joimsg: error.error.details[0].message });
  } else {
    User.findOne({ phone: req.body.phone })
      .then((data) => {
        if (data) {
         
            bcrypt.compare(req.body.password, data.password, (err, result) => {
              // result == true
              if (result) {
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.TOKEN_SECRET
                );
                //res.header('auth-token', token);
                res.json({ token: token });
              } else {
                res.json({ msg: "wrong password" });
              }
            });
        
        } else {
          res.json({ msg: "no user with such phone number" });
        }
      })
      .catch(() => {});
  }
});

module.exports = loginRoute;
