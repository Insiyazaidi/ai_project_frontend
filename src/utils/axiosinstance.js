import axios from "axios"
import {BASE_URL} from "./apipath"
const axiosinstance = axios.create({   // think it like a custom axios with default settings made by me 
    baseURL : BASE_URL,
    timeout:8000,  // if we fail to get res withing 8 sec then req will fail
    headers:{
        "Content-Type":"application/json", //  I am sending JSON data & want JSON response These headers
        //  will automatically be added to every request
        Accept:"application/json"
    }
})

// request interceptor , interceptor is a function 
axiosinstance.interceptors.request.use(  // this is just adding token from localstorage to req  
    (config)=>{  // config contain everything abt req like url , data , headers , methods 
        const accesstoken = localStorage.getItem("token")
        if(accesstoken){
            config.headers.Authorization=`Bearer ${accesstoken}`
        }
        return config
    },
    (error)=>{  // axios return promise 
        return Promise.reject(error)  // pass this error to .catch()-- 
    }
)
// respnose interceptor
axiosinstance.interceptors.response.use(
    (response)=>{
        return response
    }, 
    (error)=>{
        if(error.response){
            if(error.response.status===500){
                console.log("Server error please try again later")
            }
            else if(error.code==="ECONNABORTED"){
                console.log("Request timeout.Please try again")
            }
            return Promise.reject(error)
        }
    }
)
export default axiosinstance