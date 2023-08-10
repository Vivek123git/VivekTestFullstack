const todoApp = require('../Model/TodoApp');
const dotenv = require('dotenv');
const multer = require('multer');



const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const uniqueName = Date.now()+'-'+Math.random(Math.random()* 1E9)
        cb(null,uniqueName+'-'+file.originalname)
    }
})
exports.upload = multer({storage:storage}).single('image')

exports.createTable = async(req,res)=>{
    console.log(req.file,"req")
    try{
        const newUser = await todoApp.create({
            // Assuming todoApp.create expects an object with user data
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            // Add other user fields as needed
            image: req.file ? `http://localhost:2000/images/${req.file.filename}` : null,
            // Set the image URL or file path in the user data if req.file exists
          });
      
          res.status(200).json({
            message: "created successfully",
            data: newUser,
            image: newUser.image || "", // Send the image URL in the response
          });
    }catch (error){
        res.status(400).json({ message: error.message });
    }
}

exports.sendData = async(req,res)=>{
    try{
        const newUser = await todoApp.find();
        res.status(200).json({message:"send successfully",data:newUser});
    }catch (error){
        res.status(400).json({ message: error.message });
    }
}


exports.editData = async(req,res)=>{
    console.log(req.body)
    try{
        const {_id ,name,email,age} = req.body;
        const newUser = await todoApp.findByIdAndUpdate(_id,{name,email,age},{new:true});
        if (!newUser) {
            res.status(400).json({ message: "cannot find this id" });
          }
        res.status(200).json({message:"send successfully",data:newUser});
    }catch (error){
        res.status(400).json({ message: error.message });
    }
}

exports.deleteData = async(req,res)=>{
  
    try{
        const {id } = req.body;
        const newUser = await todoApp.findByIdAndDelete(id,{new:true});
        if (!newUser) {
            res.status(400).json({ message: "cannot find this id" });
          }
        res.status(200).json({message:"send successfully"});
    }catch (error){
        res.status(400).json({ message: error.message });
    }
}

