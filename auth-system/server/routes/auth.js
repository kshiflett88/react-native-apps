const express = require('express');
const {check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const User = require('../models/User')

const secretKey = process.env.SECRETKEY;

const generateToken = user => {
  return jwt.sign(
    {_id: user._id, email: user.email, fullName: user.fullName}, 
    secretKey)
}


const validate = [
  check('fullName')
    .isLength({min: 2})
    .withMessage('Your full name is required'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters')
]

const loginValidation = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters')
]

router.post('/register', validate, async (req, res) => {

  const errors = validationResult(req); //takes in req data and checks it agains validate

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array() })
  }

  const userExist = await User.findOne({email: req.body.email})
  if (userExist) return res.status(400).send({success: false, message: 'Email already exists'});

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashPassword
  })
  try {
    const savedUser = await user.save();
    //create and assign token
    const token = generateToken(user);
    res.send({
      success: true, 
      data: {
        id: savedUser._id, 
        fullName: savedUser.fullName, 
        email: savedUser.email
      },
      token
    });
  } catch (error) {
    res.status(400).send({success: false, error})
  }
})

router.post('/login', loginValidation, async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array() })
  }
  
  //check if email exists
  const user = await User.findOne({email: req.body.email})
  if (!user) return res.status(404).send({success: false, message: 'User is not registered'})

  //check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(404).send({success: false, message: 'Invalid Email or Password'})

  //create and assign a token scret key usually in .env file
  const token = generateToken(user);
  res
    .header('auth-token', token)
    .send({success: true, message: 'Logged in successfully', token})
})

module.exports = router