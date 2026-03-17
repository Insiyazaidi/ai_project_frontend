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
    return "rendersetlist"
}

  return (
    <div>Flashcardmanager</div>
  )
}

export default Flashcardmanager