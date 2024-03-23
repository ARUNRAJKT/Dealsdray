const mongoose = require('mongoose')
const schema = mongoose.Schema
const regSchema = new schema({
    f_company:{type:String},
    f_email:{type:String},
    loginId:{type:mongoose.Types.ObjectId,ref:"t_login"}
})
const regModel=mongoose.model('reg_tb',regSchema) 
module.exports=regModel