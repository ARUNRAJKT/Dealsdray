const mongoose=require('mongoose')
const schema=mongoose.Schema;
const loginSchema=new schema({
    f_userName:{type:String},
    f_Pwd:{type:String},
})
const loginModel=mongoose.model("t_login",loginSchema)
module.exports=loginModel
   