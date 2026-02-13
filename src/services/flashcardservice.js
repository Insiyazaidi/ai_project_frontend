import axiosinstance from "../utils/axiosinstance.js";
import { API_PATHS } from "../utils/apipath.js";

const getallflashcardsets = async()=>{ 
    try {
     const response = await axiosinstance.get(API_PATHS.FLASHCARDS.GET_ALL_FLASHCARD_SET)
     return response.data  
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch flashcard sets"} 
    }
}

const getflashcardfordocument = async(documentid)=>{ 
    try {
     const response = await axiosinstance.get(API_PATHS.FLASHCARDS.GET_FLASHCARDS_FOR_DOC(documentid))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to fetch flashcards"} 
    }
}
  
const reviewflashcard = async(cardid , cardindex)=>{ 
    try {
     const response = await axiosinstance.post(API_PATHS.FLASHCARDS.REVIEW_FLASHCARDS(cardid) , {cardindex})  // here cardindex bhejna is not required
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to review flashcard"} 
    }
}

const togglestar = async(cardid)=>{ 
    try {
     const response = await axiosinstance.put(API_PATHS.FLASHCARDS.TOGGLE_STAR(cardid))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to star flashcard"} 
    }
}

const deleteflashcardset = async(id)=>{  // yha pure ek flashcard ki id aarhi h 
    try {
     const response = await axiosinstance.delete(API_PATHS.FLASHCARDS.DELETE_FLASHCARD_SET(id))
     return response.data   
    } catch (error) {
       throw error.response?.data|| {message:"Failed to delete flashcards"} 
    }
}
const flashcardservice = { getallflashcardsets , togglestar, deleteflashcardset , reviewflashcard , getflashcardfordocument}
export default flashcardservice