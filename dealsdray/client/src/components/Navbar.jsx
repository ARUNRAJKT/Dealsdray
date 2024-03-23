import { React, useEffect } from 'react'
import './navbar.css'
import { MenuItems } from './menuItems.js'
import { Link, useNavigate } from "react-router-dom"
import AdbSharpIcon from '@mui/icons-material/AdbSharp';
import { Button, Grid, Typography } from '@mui/material';
export default function Navbar() {
    const navGate = useNavigate()
    const user = localStorage.getItem('loginName')

    const handleSubmit = (e) => {
        localStorage.removeItem('loginName')
        navGate('/')
    };
    const value = localStorage.getItem('loginName')
    useEffect(() => {
        if (value === null) {
            navGate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <nav className='NavbarItems'>
                <Grid container>
                    <Grid item xs='1'>
                        <h1 className='navbar-logo'><AdbSharpIcon /></h1>
                    </Grid>
                    <Grid item xs='4'></Grid>
                    <Grid item xs='5'>
                        <ul className='nav-menu active' >
                            {MenuItems.map((item, index) => (
                                <li key={index}>
                                    <Link className={item.cName} to={item.url} >
                                        {item.title}
                                    </Link>
                                </li>
                            )
                            )}
                        </ul>
                    </Grid>
                    <Grid item xs='2'>
                        <Typography h2 className='user'>
                            &nbsp;&nbsp;&nbsp; &nbsp;
                            {user}
                            &nbsp;&nbsp;&nbsp;
                            <Button type="submit" color='error' variant='outlined' onClick={handleSubmit}>LOGOUT </Button></Typography>
                    </Grid>
                </Grid>
            </nav>
        </>
    )
}
