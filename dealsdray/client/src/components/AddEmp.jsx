import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { CssBaseline, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddEmp() {

    const navGate = useNavigate()
    const [input, setInput] = useState({
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: '',
        f_Course: '',
        f_Createdate: '',
        f_Image:''
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({ ...prevInput, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4004/employee/addEmp', input)
            .then(function (res) {
                setInput({
                    f_Name: '',
                    f_Email: '',
                    f_Mobile: '',
                    f_Designation: '',
                    f_gender: '',
                    f_Course: '',
                    f_Createdate: '',
                    f_Image:''
                });
                console.log('success: employee added');
                navGate('/EmpPage')
            })
            .catch(function (err) {
                console.error(err);
            });
    };

    return (
        <Container component="main" maxWidth="xs" style={{ height: "100vh" }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 11,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" >
                    Add Employee
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Name"
                        type='text'
                        label="Name"
                        name="f_Name"
                        autoFocus
                        onChange={inputChange}
                        value={input.f_Name}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="f_Email"
                        label="Email"
                        type="email"
                        id="Email"
                        onChange={inputChange}
                        value={input.f_Email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="f_Mobile"
                        label="Mobile"
                        type="tel"
                        id="Mobile"
                        onChange={inputChange}
                        value={input.f_Mobile}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="f_Designation"
                        label="Designation"
                        type="text"
                        id="Designation"
                        onChange={inputChange}
                        value={input.f_Designation}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="f_Image"
                        type="file"
                        id="image"
                        accept=".png, .jpg, .jpeg"
                        onChange={inputChange}
                    />
                    <div onChange={inputChange}>
                        <input type="radio" value="MALE" name="f_gender" /> Male
                        <input type="radio" value="FEMALE" name="f_gender" /> Female
                    </div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="f_Course"
                        label="Course"
                        type="text"
                        id="Course"
                        onChange={inputChange}
                        value={input.f_Course}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="f_Createdate"
                        type="date"
                        id="createDate"
                        onChange={inputChange}
                        value={input.f_Createdate}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        color='success'
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add Employee
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
