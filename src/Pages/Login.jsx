import React, { useEffect } from 'react'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoginSchema } from '../Validation/Schema';
import { useDispatch, useSelector } from 'react-redux';
import { AuthApi } from '../redux/Slice';


const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authData } = useSelector((state) => {
    return state?.Auth
  })
  console.log(authData)

  const initial = {
    email: "",
    password: ""
  }

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues: initial,
    validationSchema: LoginSchema,
    onSubmit: (value) => {
      // console.log(value.email);
      const matchEmail = authData?.filter((e) => {
        return (
          e.email == value.email
        )
      })
      // console.log(matchEmail);
      if (matchEmail.length === 0) {
        alert("Email is not registered")
      }
      else if (matchEmail[0].password !== value.password) {
        alert("password is not matched")
      }
      else {
        alert('login success')
        localStorage.setItem('name',matchEmail[0].name)
        localStorage.setItem('token',matchEmail[0].id)
        navigate('/')
      }
    }
  })

  useEffect(() => {
    dispatch(AuthApi())
  }, [])

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Welcome to My Photo Album
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    autoFocus
                  />
                  <Typography>{errors.email && touched.email ? (<label className='text-danger'>{errors.email}</label>) : ''}</Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <Typography>{errors.password && touched.password ? (<label className='text-danger'>{errors.password}</label>) : ''}</Typography>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid container justifyContent="flex-start">
                    <Grid item>
                      <Typography>Don't have an account? <Link to="/register" variant="body2"> Sign Up</Link></Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Login