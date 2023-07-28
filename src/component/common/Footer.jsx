import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <>
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
    <Typography paragraph>
        Thank you for visiting my photo gallery!<br/>
 Hope You have enjoyed this album.<br/>
 Connect with me if you wish to make something like this for yourself too.
        </Typography>
    </Box>
    </>
  )
}

export default Footer