const mongoose =require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unqiue:true,
        minlength:[4,"username must be at least 4 characters long"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unqiue:true,
        minlength:[4,"email must be at least 4 characters long"]

    },
    password:{
        type:String,
        required:true,
        trim:true,
        unqiue:true,
        minlength:[5,"password must be at least 5 characters long"]
    }
})


const userModel = mongoose.model("user",userSchema)

module.exports =userModel