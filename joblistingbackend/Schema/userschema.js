const mongoose = require('mongoose');
const validator = require('validator');
const JWT=require('jsonwebtoken')
var bcrypt = require('bcryptjs');
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select:true,
    },
    location: {
        type: String,
        default: "India",
    },
    regType: {
        type: String,
        required: [true, "Registration type is required"],
    },
}, { timestamps: true });
userschema.pre("save",async function(){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
});
userschema.methods.comparePassword=async function(userPassword){
    const ismatch=await bcrypt.compare(userPassword, this.password);
    return ismatch;
};
userschema.methods.createJWT=function(){
    return JWT.sign(
        {
            userId:this._id
        },process.env.JWTCODE,{expiresIn: '1d'}
    )
}
module.exports = mongoose.model("User", userschema);
