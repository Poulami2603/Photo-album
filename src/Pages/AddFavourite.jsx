import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Footer from '../component/common/Footer';
import Navbar from '../component/common/Navbar';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';




const AddFavourite = () => {

  const [darkMode, setDarkMode] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode?'dark':'light'
    },
  });
  
  const [data, setData] = useState([])
  
  const token = localStorage.getItem('token')
  const favapi = async () => {
    try{
      const res = await axios.get(`http://127.0.0.1:3008/favourite`)
      const match = res?.data.filter((e) => {
        return e.id === token
      })
      console.log(match);
      setData(match[0].data)
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    favapi()
  }, [])
  // console.log(data);


  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(6)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = data.slice(firstPostIndex, lastPostIndex)



  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Navbar check={darkMode} change={()=>setDarkMode(!darkMode)}/>
          </div>
          <div className="col-md-10" style={{ marginTop: '100px' }}>
            <Typography paragraph>
              "A picture is worth a thousand words" Our life's journey reflects this proverb in many ways when we want to convey our special moments to people quickly. This gallery is one such way in which I intend to tell my story to you or even keep it for myself to flip over at times when I wish to hop through memory lanes.
            </Typography>
              <div className="row">
                {
                  currentPosts && currentPosts?.map((e) => {
                    return (
                      <>
                        <div className="col-md-4 my-3">
                          <Card sx={{ minWidth: 280 }}>
                            <CardMedia
                              component="img"
                              height={300}
                              coverFit={'auto'}
                              image={ e && e.image}
                              alt="Cake1"
                              style={{ 'objectFit': "contain" }}
                            />
                            <CardContent>
                              <Typography variant="h6" align='center' color="text.secondary">
                                { e && e.title}
                              </Typography>
                              <Typography variant="h6" align='center' color="text.secondary">
                              {e && e.date}
                              </Typography>
                              <Typography variant="h6" align='center' color="text.secondary">
                              { e && e.place}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )
                  })
                }
              </div>
              <Box justifyContent={'center'} alignItems={'center'} display={'flex'} sx={{margin: "20px 0px"}}>
            <Stack spacing={10} >
              <Pagination count={5} color="secondary" variant='outlined' onChange={(event, value) => setCurrentPage(value)}/>
            </Stack>
            </Box>
          </div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
    </>
  )
}

export default AddFavourite