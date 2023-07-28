import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../common/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';



const CollageDetails = () => {

  const [darkMode, setDarkMode] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode?'dark':'light'
    },
  });

  const { id } = useParams()

  const [singledata, setSingledata] = useState()

  const ApiSinglePage = async () => {
    const response = await axios.get(`http://127.0.0.1:3005/all/${id}`)
    console.log(response)
    setSingledata(response?.data)
  }

  useEffect(() => {
    ApiSinglePage(id)
  }, [])
  console.log(singledata)



  return (
    <>
    <ThemeProvider theme={darkTheme}>
      {
        singledata &&
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <Navbar check={darkMode} change={()=>setDarkMode(!darkMode)}/>
            </div>
            <div className="col-md-10" style={{ marginTop: '100px' }}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ minWidth: 600 }}
                  image={`.${singledata.image}`}
                  style={{ 'objectFit': "contain" }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {singledata.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {`${singledata.date} ${singledata.time}`}
                    </Typography>
                    <Typography paragraph>{singledata.place}</Typography>
                    <Typography paragraph>{singledata.about}</Typography>
                    <Typography paragraph>{singledata.description}</Typography>
                  </CardContent>
                </Box>
              </Card>
            </div>
          </div>
        </div>
      }
    </ThemeProvider>
    </>
  )
}

export default CollageDetails