import React, { useEffect } from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { RegistationSchema } from '../Validation/Schema';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterApi } from '../redux/Slice';

const Register = () => {

    const theme = createTheme();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {regdata,authRedirect} = useSelector((state) =>{
      console.log(state?.Auth)
      return (state?.Auth)
    })

    const initial= {
        id: new Date().getTime(),
        name: "",
        email: "",
        phone: "",
        password: ""
    }

const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
initialValues: initial,
validationSchema: RegistationSchema,
onSubmit: (value) => {
  dispatch(RegisterApi(value))
}
})

useEffect(() =>{
  navigate(authRedirect)
}, [authRedirect])

  return (
    <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
            Welcome to My Photo Album
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    fullWidth
                    label="Name"
                    autoFocus
                  />
                  <Typography>{errors.name && touched.name ? (<label className='text-danger'>{errors.name}</label>) : ''}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                  />
                <Typography>{errors.email && touched.email ? (<label className='text-danger'>{errors.email}</label>) : ''}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="phone"
                  />
                <Typography>{errors.phone && touched.phone ? (<label className='text-danger'>{errors.phone}</label>) : ''}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                  />
            <Typography>{errors.password && touched.password ? (<label className='text-danger'>{errors.password}</label>) : ''}</Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-start">
                <Grid item>
                    <Typography>Already have an account? <Link to="/login" variant="body2"> Sign in</Link></Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  )
}

export default Register