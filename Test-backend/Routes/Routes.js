const express = require('express');
const router = express.Router();
const multer = require('multer');

const userController = require('../Controllers/UserController');

router.post('/signin', userController.createUser);
router.get('/', userController.getAllUsers);


// this is req.query string method to save data and its url is like // http://localhost:2000/users/query?name=Anuj&age=25 //
router.post('/query',userController.userQueryString);


// this is req.params method to save data in datbase and its url is like // http://localhost:2000/users/param/Anuj/25 //
router.post('/param/:name/:age',userController.userParam)

//find getuserbyid and id send in body
router.post('/userId', userController.getUserById);

//find by Id and update
router.post('/userUpdate', userController.userUpdate)

//find by ID and Delete 
router.post('/deleteUser',userController.deleteUser)

//image or file upload using multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-' + file.originalname )
    }
  })

const upload = multer({ storage: storage});

router.post('/uploadImage',upload.single('uploadImage'), userController.uploadImage);

//JWT verify token api//.....................
router.post('/signUpUser',userController.signUpUser)

router.post('/signInUser', userController.authenticateToken, userController.signInUser)

module.exports = router;