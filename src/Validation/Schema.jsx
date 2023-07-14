import * as Yup from 'yup'

export const RegistationSchema = Yup.object({
    name: Yup.string().min(2).max(30).required("Please Enter Your Name"),
    email: Yup.string().email().required("Please Enter Valid Email Address"),
    phone: Yup.number().required("Please Enter Your Mobile Number"),
    password: Yup.string().min(6).max(12).required("Please Enter Your Password")
})

export const LoginSchema = Yup.object({
    email: Yup.string().email().required("Please Enter Your Email-ID"),
    password: Yup.string().min(6).max(12).required("Please Enter Password")
})