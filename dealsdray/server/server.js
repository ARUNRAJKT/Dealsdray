const express = require('express');
const app = express();
const mongoose = require('mongoose');
const login = require('./src/routes/login');
const employee = require('./src/routes/employee');
const cors = require('cors');
const bodyParse = require('body-parser')

app.use(cors());
app.use(bodyParse())
const url = "mongodb+srv://arunraj44799:arunraj44799@cluster0.upasoqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
// Activate routes
app.use('/employee', employee);
app.use('/login', login);

// Connect to MongoDB database
mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server after successfully connecting to the database
        app.listen(4004, () => {
            console.log("Server started at http://localhost:4004");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
