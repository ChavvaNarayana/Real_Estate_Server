const router = require('express').Router()

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");





router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  console.log(username, email, password)
  await User.find({ mail: email }).then((user) => {
    console.log(user);
    if (user.length > 0) return res.status(400).json({ msg: "User already exists" });
  })
  let ppid = 'PPD'
  const newUser = new User({
    name:username,
    mail: email,
    password,
    ppid
    
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      await newUser.save()
      jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: newUser.id,
            username: newUser.name,
            email: newUser.mail,
            ppid
          }
        });
      }
      );

    });
  });

})





module.exports = router;