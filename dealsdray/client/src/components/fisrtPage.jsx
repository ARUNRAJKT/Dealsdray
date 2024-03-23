import { Container, Typography } from '@mui/material'
import React from 'react'

export default function fisrtPage() {
  return (
    <>
      <Container style={{ height: "100vh" }}>
        <Typography style={{paddingTop:"30%",marginLeft:"20%",fontSize:"60px"}}>
          Welcome to admin panel
        </Typography>
      </Container>
    </>
  )
}
