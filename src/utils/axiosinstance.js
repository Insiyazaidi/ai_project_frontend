import axios from "axios"
import {BASE_URL} from "./apipath"
const axiosinstance = axios.create({
    baseUrl : BASE_URL,
    timeout:8000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
})
// request interceptor 
axiosinstance.interceptors.request.use(
    (config)=>{
        const accesstoken = localStorage.getItem("token")
        if(accesstoken){
            config.headers.Authorization=`Bearer ${accesstoken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
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