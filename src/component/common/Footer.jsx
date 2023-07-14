import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <>
            <Box sx={{flexGrow: 1}} color="black">
                <Typography variant='h4' align="center" gutterBottom>
                    Hope you guy's have enjoied my photo album.
                </Typography>
                <Typography variant='h6' align="center" gutterBottom>
                    Please visit again here to see more photos in my album. Thank you. Bye Bye....
                </Typography>
            </Box>
        </>
    )
}

export default Footer