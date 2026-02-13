import axiosinstance from "../utils/axiosinstance.js";
import { API_PATHS } from "../utils/apipath.js";
const getdocuments = async()=>{ 
    try {
     const response = await axiosinstance.get(API_PATHS.DOCUMENTS.GET_DOCUMENTS)
     return response.data?.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch documents"} 
    }
}

const uploaddocument = async(formdata)=>{ 
    try {
     const response = await axiosinstance.post(API_PATHS.DOCUMENTS.UPLOAD, formdata , { headers:{"Content-Type":"multipart/form-data"} })
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to upload document"} 
    }
}

const deletedocument = async(id)=>{ 
    try {
     const response = await axiosinstance.delete(API_PATHS.DOCUMENTS.DELETE_DOCUMENT(id))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to delete document"} 
    }
}

const getdocumentbyid = async(id)=>{ 
    try {
     const response = await axiosinstance.get(API_PATHS.DOCUMENTS.GET_DOCUMENTS_BY_ID(id))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch document details "} 
    }
}

const documentservice = {getdocumentbyid , getdocuments , deletedocument , uploaddocument }
 export default documentservice