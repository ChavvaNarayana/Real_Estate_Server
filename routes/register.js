const router = require('express').Router()

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");





router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
   if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
   await User.find({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      username,
      email,
      password
    });
     bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt,async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
       await newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
})

  



module.exports = router;