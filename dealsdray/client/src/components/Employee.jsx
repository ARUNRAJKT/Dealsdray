import { React, useEffect, useState, } from 'react'
import axios from "axios";
import { Button, Container, Grid, Typography, Paper, TextField, Box } from '@mui/material'
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';

export default function Employee() {
    const [employee, setDetails] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:4004/employee/show')
            .then(function (response) {
                const data = response.data.data;

                setCount(response.data.count)
                if (response.data.success === true) {
                    setDetails(data)
                }

            })
            .catch(error => {
                console.error('Error fetching details', error.response.data.message)
            });
    }, [employee]);

    const deleteEmp = (id) => {
        console.log(id);
        axios.get(`http://localhost:4004/employee/delete/${id}`).then(function (res) {
            console.log('deleted');
            alert(res.data.message);
            // fetchEmployees()
        })
            .catch(function (error) {
                const message = error.response.data.message
                alert(message)
                console.log(message);
            });
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [upDetails, setUpdetails] = useState('')
    const updateEmp = (id) => {
        console.log(id);
        axios.get(`http://localhost:4004/employee/updateEmp/${id}`).then(function (res) {

            const upD = res.data.details
            setUpdetails(upD)
            console.log('update details got', upD);
        })
            .catch(function (error) {
                const message = error.response.data.message
                alert(message)
                console.log(error);
            });
        console.log(upDetails, "-------------");
    }
    const updateChange = (e) => {
        const { name, value } = e.target;
        setUpdetails(values => ({ ...values, [name]: value }))
    }
    const updateSubmit = (e) => {
        axios.post('http://localhost:4004/employee/updated', upDetails).then(function (res) {
            console.log('Sucesss');
            setOpen(false);
            window.location.reload()
        })
            .catch(function (error) {
                console.log(error);
            });
        console.log(upDetails);
    }

    const searchChange = (e) => {
        const { name, value } = e.target;
        setDetails(values => ({ ...values, [name]: value }))
    }


    return (
        <Container style={{ paddingBottom: "10%" }}>
            <Grid container style={{ paddingTop: "10%" }}>
                <Grid item xs="12">
                    <Typography style={{ marginLeft: "70%" }}>
                        Total Count = {count}
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <Link to="/AddPage">
                            <Button type='submit' color='success' variant='contained'>
                                Create Employee
                            </Button>
                        </Link>

                    </Typography>
                </Grid><br />
                <Grid item xs="12">
    
                        <div className="search">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                label="Search"
                                onChange={searchChange}
                            />
                            <Button variant='contained' type='submit'>Search</Button>
                        </div>
                        
    
                </Grid>
                <Grid item xs='12'>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Unique id</th>
                                <th style={styles.th}>Image</th>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Mobile No</th>
                                <th style={styles.th}>Designation</th>
                                <th style={styles.th}>Gender</th>
                                <th style={styles.th}>Course</th>
                                <th style={styles.th}>Create Date</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((item, i) => (
                                <tr key={i} style={styles.tr}>
                                    <td style={styles.td}>{item._id}</td>
                                    <td style={styles.td}>{item.f_Image}</td>
                                    <td style={styles.td}>{item.f_Name}</td>
                                    <td style={styles.td}>{item.f_Email}</td>
                                    <td style={styles.td}>{item.f_Mobile}</td>
                                    <td style={styles.td}>{item.f_Designation}</td>
                                    <td style={styles.td}>{item.f_gender}</td>
                                    <td style={styles.td}>{item.f_Course}</td>
                                    <td style={styles.td}>{item.f_Createdate}</td>
                                    <td style={styles.td}>
                                        <Button onClick={() => { updateEmp(item._id); handleOpen() }} color='info'>EDIT</Button>
                                        <Button onClick={() => deleteEmp(item._id)} color='error'>DELETE</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>


                <Modal open={open} onClose={handleClose} >
                    <center  >
                        <Paper shadows elevation={0} style={{ boxShadow: "0 5px 15px 0 rgb(0, 0, 0, .25)", background: "hsl(159, 21%, 79%)", margin: "2%" }}>

                            <Container><Typography component="h1" variant="h5" >
                                Update Employee
                            </Typography>
                                <Box component="form" onSubmit={updateSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Name"
                                        type='text'
                                        label="Name"
                                        name="f_Name"
                                        autoFocus
                                        onChange={updateChange}
                                        value={upDetails.f_Name}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="f_Email"
                                        label="Email"
                                        type="email"
                                        id="Email"
                                        onChange={updateChange}
                                        value={upDetails.f_Email}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="f_Mobile"
                                        label="Mobile"
                                        type="tel"
                                        id="Mobile"
                                        onChange={updateChange}
                                        value={upDetails.f_Mobile}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="f_Designation"
                                        label="Designation"
                                        type="text"
                                        id="Designation"
                                        onChange={updateChange}
                                        value={upDetails.f_Designation}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="f_Image"
                                        type="file"
                                        id="image"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={updateChange}
                                    />
                                    <div onChange={updateChange}>
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
                                        onChange={updateChange}
                                        value={upDetails.f_Course}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="f_Createdate"
                                        type="date"
                                        id="createDate"
                                        onChange={updateChange}
                                        value={upDetails.f_Createdate}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        color='success'
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Update Employee
                                    </Button>
                                </Box>
                            </Container>
                        </Paper>
                    </center>
                </Modal>
            </Grid>
        </Container>
    )
}

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        marginLeft: "-90px"
    },
    th: {
        backgroundColor: '#f2f2f2',
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd'
    },
    tr: {
        backgroundColor: '#f9f9f9'
    },
    td: {
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd'
    }
};
