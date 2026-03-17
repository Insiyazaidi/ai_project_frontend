import React from 'react'
import { useState, useEffect } from 'react'
import {Plus , ChevronLeft ,ChevronRight , Trash2 , ArrowLeft , Sparkles , Brain} from "lucide-react"
import toast from 'react-hot-toast'
import moment from "moment"
import flashcardservice from '../../services/flashcardservice'
import aiservice from '../../services/aiservice'
import Spinner from '../common/Spinner'
import Modal from '../common/Modal'
import Flashcard from './Flashcard'
const Flashcardmanager = ({documentid}) => {

    const [flashcardsets , setflashcardssets] = useState([])
    const [selectedset , setselectedset] = useState(null)
    const [loading , setloading]= useState(true)
    const [generating , setgenerating ]= useState(false)
    const [currentcardindex , setcurrentcardindex] = useState(0)
        const [isdeletemodalopen , setisdeletemodalopen ]= useState(false)
    const [deleting , setdeleting ]= useState(false)
    const [settodelete , setsettodelete] = useState(null)
    
const fetchflashcardsets = async()=>{
    setloading(true)
    try {
       const  response= await flashcardservice.getflashcardfordocument(documentid)
setflashcardssets(response.data)
    } catch (error) {
        toast.error("Failed to fetch flashcard sets")
        console.error(error)
    }
    finally{
        setloading(false)
    }
}

useEffect(()=>{
    if(documentid){
        fetchflashcardsets()
    }
} , [documentid])

const handlegenerateflashcards = async()=>{
    setgenerating(true)
    try {
        await aiservice.generateflashcards({documentid})
        toast.success("flashcards generated successfully")
        fetchflashcardsets()

    } catch (error) {
         toast.error(error.message || "Failed to generate flashcards")
        console.error(error)
    }
    finally{
        setgenerating(false)
    }
}

const handlenextcard = ()=>{
    if(selectedset){
        handlereview(currentcardindex)
        setcurrentcardindex((previndex)=>(previndex+1)%selectedset.cards.length)
    }
}

const handleprevcard = ()=>{
    if(selectedset){
        handlereview(currentcardindex)
         setcurrentcardindex((previndex)=>(previndex-1+selectedset.cards.length)%selectedset.cards.length)
    }
}

const handlereview = async(index)=>{
    const currentcard = selectedset?.cards[currentcardindex]
    if(!currentcard) return 
    try {
        await flashcardservice.reviewflashcard(currentcard._id , index)
        toast.success("Flashcard reviewed")
    } catch (error) {
        toast.error("failed to review flashcard")
    }
}
const  handletogglestar = async(cardid)=>{

}

const  handledeleterequest = (e , set)=>{
    e.stopPropagation()
    setsettodelete(set)
    setisdeletemodalopen(true)
}

const handleconfirmdelete = async()=>{

}

const handleselectset = (set)=>{
    setselectedset(set)
    setcurrentcardindex(0)
}

const renderflashcardviewer= ()=>{
    return "renderflashcardviewer"
}

const rendersetlist = ()=>{
if(loading){
    return(
        <div className='flex items-center justify-center py-20'><Spinner/></div>
    )
}

return(
    <div className='flex flex-col items-center justify-center py-16 px-6 '>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary-dark to-primary'>
            <Brain className='w-8 h-8 text-primary-dark' strokeWidth={2}/>
        </div>
        <h3>No flashcards Yet</h3>
        <p>Generate flashcards from your document to start learning and reinforce your knowledge</p>
        <button onClick={handlegenerateflashcards} disabled={generating} className=''>{generating ? (<>
        
        <div className=''>Generating</div>
        
        </>):<><Sparkles className='' strokeWidth={2}/>Generate Flashcards</>}</button>
    </div>
)
}

  return (
    <div className='bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 p-8'>
 {selectedset ? renderflashcardviewer():rendersetlist()}
    </div>
  )
}

export default Flashcardmanager