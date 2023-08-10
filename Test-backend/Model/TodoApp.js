const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name : String,
    email:String,
    age:String,
    id:String,
    image:String
})

const todoApp = mongoose.model('todoApp',todoSchema);

module.exports=todoApp;
