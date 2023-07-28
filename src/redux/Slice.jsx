import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterApi = createAsyncThunk('register', async(data)=>{
try{
    const response = await axios.post('http://127.0.0.1:3008/register', data)
    return response
}catch(error){
    console.log(error)
}
})

export const AuthApi = createAsyncThunk('login', async()=>{
const response = await axios.get('http://127.0.0.1:3008/register')
return response?.data
})

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
    loader: "false",
    authData: [],
    regdata: [],
    authRedirect: null
    },
    reducers: {
        Logout: (state, {payload}) =>{
            localStorage.removeItem('name')
            localStorage.removeItem('token')
            alert('Logout Sucessfully')
        }
     },
    extraReducers: {
        [RegisterApi.pending] : (state) =>{
            state.loader = true
        },
        [RegisterApi.fulfilled] : (state, {payload}) =>{
            state.loader = false
            state.regdata = payload
            state.authRedirect = '/login'
        },
        [RegisterApi.rejected] : (state) =>{
            state.loader  = true
            alert ("error")
        },
        [AuthApi.pending] : (state) =>{
            state.loader = true
        },
        [AuthApi.fulfilled] : (state, {payload}) =>{
            state.loader = false
            state.authData = payload
        },
        [AuthApi.rejected] : (state) =>{
            state.loader = true
            alert("error")
        }
    }
})

export const { Logout } = AuthSlice.actions

