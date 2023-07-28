import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';




const Hobby = () => {

  const [darkMode, setDarkMode] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode?'dark':'light'
    },
  });

  const [data, setData] = useState([])

  const ApiFetchData = async () => {
    const response = await axios.get(`http://127.0.0.1:3005/all`)
    const catagory = response?.data.filter((e)=>{
      return e.catagory === 'Hobby'
    })
    setData(catagory)
  }

  useEffect(() => {
    ApiFetchData()
  }, [])

  const name = localStorage.getItem('name')
  const token = localStorage.getItem('token')

  const handleClick = async (data) => {
    const response = await axios.get('http://127.0.0.1:3008/favourite')
    const matchdata = response?.data.filter((e) => {
      return e.id = token
    })
    console.log(response?.data)
    const initial = {
      name: name,
      id: token,
      data: [data]
    }
    const fav = async () => {
      const res = await axios.post('http://127.0.0.1:3008/favourite', initial)
      console.log(res)
    }
    if (matchdata.length !== 0) {
      const res = await axios.patch(`http://127.0.0.1:3008/favourite/${token}`, {
        data: response?.data[0].data.concat(data)
      })
      console.log(res)
    } else {
      fav()
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(6)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = data.slice(firstPostIndex, lastPostIndex)

  const navigate = useNavigate()
  const handleClick1 = (item) => {
    navigate(`/${item.id}`)
  }


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
                currentPosts?.map((item) => {
                  return (
                    <>
                      <div className="col-md-4 my-3">
                      <ImageList sx={{ width: 500, height: 450 }}>
                          <ImageListItem cols={4}>
                          </ImageListItem>
                          <ImageListItem key={item.image}>
                            <img
                              src={item.image}
                              srcSet={item.image}
                              alt={item.title}
                              loading="lazy"
                            />
                            <ImageListItemBar
                              title={item.title}
                              actionIcon={
                                <IconButton
                                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                  aria-label={item.title}
                                >
                                  <InfoIcon style={{ color: 'orange' }} onClick={() => { handleClick1(item) }} />
                                  <IconButton aria-label="add to favorites" onClick={() => { handleClick(item) }}>
                                    <FavoriteIcon style={{ color: 'red' }} />
                                  </IconButton>
                                </IconButton>
                              }
                            />
                          </ImageListItem>
                        </ImageList>
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

export default Hobby