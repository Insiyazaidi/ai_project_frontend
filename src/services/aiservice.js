import axiosinstance from "../utils/axiosinstance.js";
import { API_PATHS } from "../utils/apipath.js";
const generateflashcards = async(documentid , options)=>{ 
    try {
     const response = await axiosinstance.post(API_PATHS.AI.GENERATE_FLASHCARDS, {documentid, ...options})
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to generate flashcards"} 
    }
}
const generatequiz = async(documentid , options)=>{
    try {
     const response = await axiosinstance.post(API_PATHS.AI.GENERATE_QUIZ, {documentid, ...options})
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to generate quiz"} 
    }
}
const generatesummary = async(documentid)=>{
    try {
     const response = await axiosinstance.post(API_PATHS.AI.GENERATE_FLASHCARDS, {documentid})
     return response.data?.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to generate summary"} 
    }
}
const chat = async(documentid , question)=>{    // did something different** 
    try {
     const response = await axiosinstance.post(API_PATHS.AI.CHAT, {documentid, question})
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Chat request failed"} 
    }
}

const explainconcept = async(documentid , concept)=>{
    try {
     const response = await axiosinstance.post(API_PATHS.AI.EXPLAIN_CONECPT, {documentid, concept})
     return response.data?.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to explain concept"} 
    }
}

const getchathistory = async(documentid)=>{
    try {
     const response = await axiosinstance.post(API_PATHS.AI.GET_CHAT_HISTORY, documentid)
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch chat history"} 
    }
}
const aiservice = {
    generateflashcards , generatequiz, generatesummary , explainconcept , getchathistory , chat}

    export default aiservice

    // kahi pr hmne res.data likha h aur kahi pr res.data?.data - depend krta h ki backend ne kis format m data bheja h  ... 