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

export const UploadSchema = Yup.object({
    title: Yup.string().min(6).max(20).required("Please Give a Title"),
    // date: Yup.number().min(6).max(20).required("Please Give a Date"),
    about: Yup.string().min(6).max(30).required("Please Say About This Image"),
    place: Yup.string().min(6).max(20).required("Please Mention The Place"),
    catagory: Yup.string().min(5).max(10).required("Please Select a catagory"),
    description: Yup.string().min(6).max(40).required("Please Describe About This Image"),
//     image: Yup.mixed().required("Please Select an image file")
//     .test("FILE_TYPE", "Please select an Image File Types (JPEG, JPG, WEBP, PNG)!", (value) => value && ['image/png','image/jpeg','image/jpg','image/webp'].includes(value.type))
})