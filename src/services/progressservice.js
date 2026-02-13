import axiosinstance from "../utils/axiosinstance.js";
import { API_PATHS } from "../utils/apipath.js";

const getdashboarddata = async()=>{ 
    try {
     const response = await axiosinstance.get(API_PATHS.PROGRESS.GET_DASHBOARD)
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch quiz"} 
    }
}
const progressservice = {getdashboarddata}
export default progressservice