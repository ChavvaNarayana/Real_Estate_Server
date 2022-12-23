const router = require('express').Router()

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
  const { username, email, password } = req.body.data;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  await User.find({ mail: email }).then((user) => {
    if (user.length > 0) return res.status(409).json({ msg: "User already exists" });
  })
  const ppdId = Math.floor((Math.random() * 99)) + "PPD" + Math.floor((Math.random() * 999) + 999);
  const newUser = new User({
    name: username,
    mail: email,
    password:password,
    ppdId:ppdId
  });
  try {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        await newUser.save()
        jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            token,

            username: newUser.name,
            email: newUser.mail,
            ppdId:newUser.ppdId

          });
        }
        );

      });
    });
  } catch (err) {
    res.status(405).json({
      status: 'Error',
      message: err.message
    })
  }
})

module.exports = router;