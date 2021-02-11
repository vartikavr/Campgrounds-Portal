const mongoose= require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    }
});


//username, password not specified in the userSchema because the below plugin line would add on in our userSchema - 
//a username, hash and salt field to store the username,the hashed password and salt value, and other additional methods to use
userSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model('User',userSchema);