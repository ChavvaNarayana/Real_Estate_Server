

const express = require('express');
const addPropertyRoutes = require('./routes/addProperty')
const app = express();


app.use('/add', addPropertyRoutes)


app.use('/', loginRoutes)
app.listen(3000, function() {
  console.log('listening');
});


