import axiosinstance from "../utils/axiosinstance.js";
import { API_PATHS } from "../utils/apipath.js";

const getquizzesfordocument = async(documentid)=>{ 
    try {
     const response = await axiosinstance.get(API_PATHS.QUIZZES.GET_QUIZZES_FOR_DOC(documentid))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch quiz"} 
    }
}

const getquizbyid = async(quizid)=>{ 
    try {
     const response = await axiosinstance.get(API_PATHS.QUIZZES.GET_QUIZ_BY_ID(quizid))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch particular quiz"} 
    }
}
const submitquiz = async(quizid , answers)=>{ 
    try {
     const response = await axiosinstance.post(API_PATHS.QUIZZES.SUBMIT_QUIZ(quizid) , {answers})
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to submit answers"} 
    }
}

const getquizresults = async(quizid)=>{ 
    try {
     const response = await axiosinstance.get(API_PATHS.QUIZZES.GET_QUIZ_RESULTS(quizid))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch quiz results"} 
    }
}

const deletequiz = async(quizid)=>{ 
    try {
     const response = await axiosinstance.delete(API_PATHS.QUIZZES.DELETE_QUIZ(quizid))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to delete quiz"} 
    }
}

const quizservice = { submitquiz , deletequiz , getquizbyid , getquizresults , getquizzesfordocument}
export default quizservice