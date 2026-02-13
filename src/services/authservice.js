import axiosinstance from "../utils/axiosinstance.js";
import { API_PATHS } from "../utils/apipath.js";  // baseurl is already added in axiosinstance req 

const login = async(email ,password)=>{
    try {
        const response = await axiosinstance.post(API_PATHS.AUTH.LOGIN , {email , password}) // await axiosinstance.post(url, data)
        return response.data  // Backend jo res.json() bhejta hai, wo response.data ke andar milta hai.
    }
     catch (error) {
        throw error.response?.data || {message:"An unkonwn error occurred"}
    }
}

const register = async(username , email , password)=>{
    try {
const response = await axiosinstance.post(API_PATHS.AUTH.REGISTER , {username , email , password}) // Axios ka second parameter hamesha ek object hota hai
// Multiple ya single values ho toh {} ke andar bhejo , aur vo value already ek object h toh bs name likho without braces .. 
        return response.data 
    } catch (error) {
   throw    error.response?.data || {message:"An unkonwn error occurred"}
    }
}

const getprofile = async()=>{
    try {
        const response = await axiosinstance.get(API_PATHS.AUTH.UPDATE_PROFILE)
        return response.data
    } catch (error) {
    throw   error.response?.data || {message:"An unkonwn error occurred"}
    }
}
const updateprofile = async(userdata)=>{
    try {
        const response = await axiosinstance.put(API_PATHS.AUTH.UPDATE_PROFILE , userdata)  // purana data update krna 
        return response.data
    } catch (error) {
     throw  error.response?.data || {message:"An unkonwn error occurred"}
    }
}

const changepassword = async(password)=>{
    try {
        const response = await axiosinstance.put(API_PATHS.AUTH.CHANGE_PASSWORD , password)
        return response.data
    } catch (error) {
      throw error.response?.data || {message:"An unkonwn error occurred"}
    }
}
const authservice = {login , register , getprofile , updateprofile , changepassword}
export default authservice
