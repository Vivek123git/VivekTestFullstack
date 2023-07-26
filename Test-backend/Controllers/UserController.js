const User = require('../Model/User');

exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch (error){
        res.status(400).json({ message: error.message });
    }
}