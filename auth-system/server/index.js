const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

app.get('/', (req, res) => {
  res.send('Welcome to the auth system');
})

app.use('/api/users', authRoutes)

app.get('/api/user/profile', verifyToken, (req, res) => {
  res.send({success: true, data: req.user})
})

mongoose.connect('mongodb+srv://kodi_kodes_auth:b12S06ErlM0JXQiy@cluster0.63ibp.mongodb.net/auth_system?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(3000, () => console.log('Server is running'));
  })
  .catch(err => console.log(err))
