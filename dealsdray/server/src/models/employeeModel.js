const mongoose = require('mongoose')
const schema = mongoose.Schema;
const employeeSchema = new schema({
    f_Course: { type: String, required: true },
    f_Createdate: { type: String, required: true },
    f_Designation: { type: String, required: true },
    f_Email: { type: String, required: true },
    f_Mobile: { type: String, required: true },
    f_Name: { type: String, required: true },
    f_Image: { type: String, required: true },
    f_gender: { type: String, required: true },
})
const employeeModel = mongoose.model('t_Employee', employeeSchema)
module.exports = employeeModel