import React, { useState } from 'react'
import Navbar from '../component/common/Navbar'
import FormControl from '@mui/material/FormControl';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { UploadSchema } from '../Validation/Schema';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';



const Upload = () => {

  const [darkMode, setDarkMode] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    },
  });
  const initial = {
    title: '',
    about: '',
    image: '',
    date: '',
    place: '',
    catagory: '',
    description: ''
  }

  const API = async (data, value) => {
    // console.log(data);
    // console.log(value);
    const res = await axios.post("https://api.cloudinary.com/v1_1/dl3uuxdrz/image/upload", data)
    const response = await axios.post('http://127.0.0.1:3005/all', {
      catagory: value.catagory,
      image: res?.data?.url,
      title: value.title,
      description: value.description,
      about: value.about,
      date: value.date,
      place: value.place
    })

    if (response?.status === 201) {
      // setloader(false)
      alert(`${value.title} , Photo Is Added Successfully`)
    } else {
      alert("error in add photo")
    }
    console.log(response);
  }
  
  const { values, handleChange, handleBlur, handleSubmit, errors, touched, handleReset, setFieldValue } = useFormik({
    initialValues: initial,
    validationSchema: UploadSchema,
    onSubmit: (value) => {
      console.log(value);
      const data = new FormData()
      data.append('file', value.img)
      data.append("upload_preset", "eovobzyz")
      data.append("cloud_name", "dl3uuxdrz")
      API(data, value)
      handleReset()
    }
  })

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <Navbar check={darkMode} change={() => setDarkMode(!darkMode)} />
            </div>
            <div className="col-md-10" style={{ marginTop: '100px' }}>
              <Card sx={{ maxWidth: 900 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Upload Your Image
                  </Typography>
                  <form onSubmit={handleSubmit}>
                  <FormControl fullWidth sx={{ m: 2 }}>
                    <TextField
                      id='outlined-about-static'
                      label='Title'
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ m: 2, width: 800 }} />
                    <Typography>{errors.title && touched.title ? (<label className='text-danger'>{errors.title}</label>) : ''}</Typography>
                    <TextField
                      id='outlined-about-static'
                      label='About'
                      name="about"
                      value={values.about}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ m: 2, width: 800 }} />
                    <Typography>{errors.about && touched.about ? (<label className='text-danger'>{errors.about}</label>) : ''}</Typography>
                    <Stack direction="row" spacing={4} sx={{ m: 2 }}>
                      <input type="date" className='form-control' id='date' name='date' value={values.date} onChange={handleChange} onBlur={handleBlur}></input>
                      <TextField
                        id='outlined-place-static'
                        label='Place'
                        name="place"
                        value={values.place}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ width: 350 }} />
                    </Stack>
                    <Typography>{errors.date && touched.date ? (<label className='text-danger'>{errors.date}</label>) : ''}</Typography>
                    <Typography>{errors.place && touched.place ? (<label className='text-danger'>{errors.place}</label>) : ''}</Typography>
                    <Stack direction="row" spacing={6} sx={{ m: 2 }}>
                    <div className="form-group">
                      <select class="form-control" name='catagory' value={values.catagory} onChange={handleChange} onBlur={handleBlur}>
                        <option className='text-dark'>Select Catagory</option>
                        <option className='text-dark' name='catagory' value="Profile">Profile</option>
                        <option className='text-dark' name='catagory' value="Hobby">Hobby</option>
                        <option className='text-dark' name='catagory' value="Party">Party</option>
                        <option className='text-dark' name='catagory' value="Collage">Collage</option>
                        <option className='text-dark' name='catagory' value="Friends">Friends</option>
                      </select>
                    </div>
                      <input type="file" className='form-control' style={{width: '2'}} id='image' name='image' onChange={(e) => setFieldValue("img", e.target.files[0])} onBlur={handleBlur} />                   
                      </Stack>
                    <Typography>{errors.catagory && touched.catagory ? (<label className='text-danger'>{errors.catagory}</label>) : ''}</Typography>
                    <Typography>{errors.image && touched.image ? (<label className='text-danger'>{errors.image}</label>) : ''}</Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      multiline
                      rows={4}
                      sx={{ m: 2, width: 800 }}
                    />
                    <Typography>{errors.description && touched.description ? (<label className='text-danger'>{errors.description}</label>) : ''}</Typography>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ width: 100 }}
                      display="flex"
                      type='submit'
                      justifyContent="center"
                      alignItems="center" >
                      Upload
                    </Button>
                  </FormControl>
                  </form>
                  <div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Upload