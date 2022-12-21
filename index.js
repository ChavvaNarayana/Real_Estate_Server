require("dotenv").config();
const express = require('express');
const addPropertyRoutes = require('./routes/addProperty')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register');
const indexRoutes = require('./routes/index')
const app = express();
const mongoose = require('mongoose')
const dbUrl = process.env.DB_URL || 'mongodb://localhost/real-estate';
const PORT = 3000;

//added mongodb connection by chavva

mongoose.connect(
 dbUrl ,
  () => {
    console.log("successfully connected to db");
  },
  (err) => {
    console.log(err);
  }
);

const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use(express.urlencoded())

app.use('/add', addPropertyRoutes)

app.use('/login', loginRoutes)

app.use('/register', registerRoutes)

app.use('/', indexRoutes)

app.use('/*', (req, res) => {
  res.send('Page not Found')
})


app.listen(PORT, (() => console.log('Server is running on PORT', PORT)))


