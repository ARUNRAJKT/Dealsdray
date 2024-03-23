const express = require('express');
const employee = express.Router();
const emp = require('../models/employeeModel');

employee.get('/show', async (req, res) => {
    try {
        const showEmp = await emp.find({});
        const count = await emp.countDocuments(); // Corrected method name
        return res.status(200).json({ success: true, count: count, data: showEmp }); // Include count in response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

employee.post('/addEmp', async (req, res) => {
    try {
        const empDetails = {
            f_Course: req.body.f_Course,
            f_Createdate: req.body.f_Createdate,
            f_Designation: req.body.f_Designation,
            f_Email: req.body.f_Email,
            f_Mobile: req.body.f_Mobile,
            f_Name: req.body.f_Name,
            f_gender: req.body.f_gender,
            f_Image: req.body.f_Image
        };

        console.log(empDetails);
        const newEmp = new emp(empDetails); // Create new instance of emp model
        await newEmp.save(); // Save new employee to database
        console.log(newEmp);

        return res.status(200).json({ success: true, error: false, message: "Employee has been added" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: true, message: "Error adding employee" });
    }
});

employee.get('/delete/:deleteId', async (req, res) => {
  try {
      const id = req.params.deleteId
      const deleteId = await emp.deleteOne({ _id: id })
      console.log(deleteId)
      res.status(201).json({ success: true, error: false, message: "Emp deleted" });
  } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: true, message: "not found", data: error })
  }
})

employee.get('/updateEmp/:updateId', async (req, res) => {
    try {
        const id = req.params.updateId
        console.log("got to update Employee route",id);
        const updateId = await emp.findOne({ _id: id })
        console.log("the emp deatils is<<<<<<<<<<<",updateId)
        res.status(201).json({ success: true, error: false, message: "Employee Details founded",details:updateId });
      
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: true, message: "not found", data: error })
    }
})
employee.post('/updated', async (req, res) => {
    try {
        const empDetails = {
            f_Course: req.body.f_Course,
            f_Createdate: req.body.f_Createdate,
            f_Designation: req.body.f_Designation,
            f_Email: req.body.f_Email,
            f_Mobile: req.body.f_Mobile,
            f_Name: req.body.f_Name,
            f_gender: req.body.f_gender,
            f_Image: req.body.f_Image
        };

        console.log(empDetails);     
        emp.updateOne({_id: req.body._id}, {$set: empDetails}).then((details) => {
            console.log(details);       
            return res.status(200).json({ success: true, error: false, message: "Employee details have been updated" });
        }).catch(error => {
            console.error(error);
            return res.status(500).json({ success: false, error: true, message: "Error updating employee details" });
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ success: false, error: true, message: "Error processing request" });
    }
});

module.exports = employee;
