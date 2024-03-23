import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const defaultTheme = createTheme();

export default function SignUp() {
  const navGate = useNavigate()
  const [input, setInput] = useState()
  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4004/login/reg', input).then(function (res) {
      console.log(res);
      navGate('/')
      alert('Registration succesfull');
    })
      .catch(function (error) {
        const message = error.response.data.message
        alert(message)
        console.log(error);
      });
    console.log(input);
    console.log(input)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"  style={{height:"100vh"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              type='text'
              label="Username"
              name="f_userName"
              autoComplete="username"
              autoFocus
              onChange={inputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="company"
              type='text'
              label="Company"
              name="f_company"
              autoComplete="company"
              autoFocus
              onChange={inputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type='email'
              label="Email Address"
              name="f_email"
              autoComplete="email"
              autoFocus
              onChange={inputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="f_Pwd"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={inputChange}
            />
            <Button
              type="submit"
              fullWidth
              color='secondary'
              variant="contained"
              onSubmit={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>

              <Grid item xl='12'>
                <Link to='/' >
                  Have an account ! Sign In here..
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

