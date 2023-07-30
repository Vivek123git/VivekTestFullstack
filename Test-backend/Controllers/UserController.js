const User = require("../Model/User");
const multer = require("multer");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// get config vars
dotenv.config();

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.userQueryString = async (req, res) => {
  try {
    if (!req.query.name || !req.query.age) {
      return res.status(400).json({ message: "both name and age is required" });
    }
    const userQuery = new User({
      name: req.query.name,
      age: req.query.age,
    });
    await userQuery.save();
    res.status(200).json(userQuery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.userParam = async (req, res) => {
  try {
    if (!req.params.name || !req.params.age) {
      return res.status(400).json({ message: "both name and age is required" });
    }
    const userQuery = new User({
      name: req.params.name,
      age: req.params.age,
    });
    await userQuery.save();
    res.status(200).json(userQuery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      res.status(400).json({ message: "cannot find this id" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.userUpdate = async (req, res) => {
  try {
    const { _id, name, age, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { name, age, email, password },
      { new: true }
    );
    if (!user) {
      res.status(400).json({ message: "cannot find this id" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findByIdAndDelete(_id, { new: true });
    if (!user) {
      res.status(400).json({ message: "cannot find this id" });
    }
    res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Multer file upload

exports.uploadImage = async (req, res) => {
  console.log(req.file);
  try {
    if (req.file) {
      res.status(200).json({ message: "File uploaded" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// jwt auth token signin

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash the password before saving it
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided data
    const newUser = new User({
      name,
      email,
      password,
      // password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token for the user
    const tokenPayload = { name, email };
    const token = generateAccessToken(tokenPayload);

    res.status(200).json({newUser,token});
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user.', error: error.message });
  }
};

exports.authenticateToken= async(req, res, next)=> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user; // Assuming the decoded user information is stored in the 'user' field of the token payload
    next();
  });
}

exports.signInUser = async(req,res)=>{
 
  const {name,email,age} = req.body;
  // const user = {name,email,age}
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      res.status(400).json({ message: "cannot find this id" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

