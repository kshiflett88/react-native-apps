const express = require('express');
const {check, validationResult} = require('express-validator');
const House = require('../models/House');
const AWS = require('aws-sdk');
const multer = require("multer");
const upload = multer();
const router = express.Router();

const validate = [
  check('title')
    .isLength({min: 3, max: 50})
    .withMessage('Title should be between 3 to 50 characters'),
  check('description')
    .isLength({min: 10, max: 200})
    .withMessage('Description should be between 10 to 200 characters'),
  check('address')
    .isLength({min: 10, max: 100})
    .withMessage('Address should be between 10 to 100 characters'),
  check('price')
    .isNumeric()
    .withMessage('Price should be a number')
]

const awsAccessID = process.env.AWS_SECRET_ACCESS_KEY_ID
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const awsBucket = process.env.AWS_BUCKET_NAME
const awsRegion = process.env.AWS_REGION


AWS.config.update({
    accessKeyId: awsAccessID,
    secretAccessKey: awsSecretAccessKey,
    region: awsRegion
  }); //updating config for S3

  const s3 = new AWS.S3(); //constructs a service object



const fileFilter = (req, res, next) => {
  //CUSTOM CHECK FOR THE MIME TYPES 
  const file = req.files[0];
  if (file.mimetype === 'images/jpeg' || file.mimetype === 'image/png') {
    next();
  } else {
    next({ status: 422, errors: ["Invalid Mime Type, only JPEG and PNG"]})
  }
};

// /api/houses
router.post('/', upload.single('file'), fileFilter, validate, async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array() });
  }
 
  console.log(req.file)
  // GET FILE REFERENCE
  const file = req.file[0]

  //CREATE PARAMS OBJECT FOR S3
  const params = {
    Bucket: awsBucket,
    Key: Date.now().toString() + file.originalname, // UNIQUELY IDENTIFIES
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  const promise = s3.upload(params).promise() //CREATE A PROMISE FROM UPLOAD

  const uploadedImage = await promise;
  const uploadedFileURL = uploadedImage.Location //GET URL OF THE FILE AND PUT IT IN THE REQUEST

  const house = new House({
    title: req.body.title,
    address: req.body.address,
    homeType: req.body.homeType,
    description: req.body.description,
    price: req.body.price,
    image: uploadedFileURL,
    yearBuilt: req.body.yearBuilt
  });

  house.save()
    .then(result => {
      res.send({
        message: 'House data created successfully',
        data: result
      })
    })
    .catch(err => console.log(err))
})

// /api/houses
router.get('/', (req, res) => {
  House.find() //provided by mongoose .find
    .then(houses => {
      res.send(houses)
    })
    .catch(err => console.log(err))
});

// /api/houses/id
router.get('/:id', (req, res) => {
  const houseId = req.params.id;

  House.findById(houseId)
    .then(house => {
      res.send(house)
    })
    .catch(err => console.log(err))
})

// /api/houses/id
router.put('/:id', validate, (req, res) => {
  const houseId = req.params.id;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array() });
  }

  House.findById(houseId)
    .then(house => {
      house.title = req.body.title;
      house.address = req.body.address;
      house.homeType = req.body.homeType;
      house.description = req.body.description;
      house.price = req.body.price;
      house.image = req.body.image;
      house.yearBuilt = req.body.yearBuilt;

      return house.save();
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

// /api/houses/id
router.delete('/:id', (req, res) => {
  const houseId = req.params.id;

  House.findByIdAndRemove(houseId)
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

module.exports = router;