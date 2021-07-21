const jwt = require('jsonwebtoken')
require("dotenv").config();


const verify = (req, res, next) =>{
    const token = req.header('auth-token')

    if (!token) return res.status(200).json("Unauthorize user");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
       
      req.user = decoded;
      next();
    } catch (e) {
      res.status(200).json("Token not valid");
    }
}

module.exports = verify