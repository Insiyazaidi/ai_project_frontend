import React, { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'
import {ArrowLeft , Plus , ChevronLeft , ChevronRight , Trash2} from "lucide-react"
import toast from "react-hot-toast"
import flashcardservice from '../../services/flashcardservice.js'
import Emptystate from '../../components/common/Emptystate.jsx'
import Pageheader from '../../components/common/Pageheader.jsx'
import aiservice from "../../services/aiservice.js"
import Spinner from '../../components/common/Spinner.jsx'
import Modal from '../../components/common/Modal.jsx'
import Flashcard from '../../components/flashcards/Flashcard.jsx'
const Flashcardpage = () => {
  const {id:documentid} = useParams()
  const [flashcardsets , setflashcardsets] = useState([])
  const [flashcards , setflashcards] = useState([])
  const [generating , setgenerating] = useState(false)
  const  [loading , setloading] = useState(true)
  const [isdeletemodalopen , setisdeletemodalopen] = useState(false)
  const [currentcardindex , setcurrentcardindex]= useState(0)
  const  [deleting , setdeleting] = useState(false)
  const fetchflashcard = async()=>{
    setloading(true)
    try {
      const response = await flashcardservice.getflashcardfordocument(documentid)
      console.log(response)
      setflashcardsets(response.data[0])
      setflashcards(response.data[0]?.cards || [])
    } catch (error) {
      toast.error("Failed to fetch flashcards")
      console.error(error)
    }
    finally{
      setloading(false)
    }
  }
  useEffect(()=>{
    fetchflashcard()
  } , [documentid])

const handlegenerateflashcards = async()=>{
  setgenerating(true)
  try {
    await aiservice.generateflashcards(documentid)
    toast.success("Flashcards generated successfully")
  } catch (error) {
    toast.error(error.message || "Failed to generate flashcards")
  }
  finally{
    setgenerating(false)
  }
}

const handlenextcard = ()=>{
    if(selectedset){
        handlereview(currentcardindex)  // jb bhi prev ya next card pr click krrhe h toh phle handlereview call horha hh 
        setcurrentcardindex((previndex)=>(previndex+1)%selectedset.cards.length)  // circular iteration ke liye ... 
        // previndex -9 (last card) , previndex+1 10 %10 = 0 which means it will show 0 th index card ie first one ... 
    }
}


const handleprevcard = ()=>{
    if(selectedset){
        handlereview(currentcardindex)
         setcurrentcardindex((previndex)=>(previndex-1+selectedset.cards.length)%selectedset.cards.length)
    }
}


const handlereview = async(index)=>{  // yha pr vo card aarha h vo hmne dekh liya .. 
    const currentcard = selectedset?.cards[currentcardindex]  // currentcard ka data 
    if(!currentcard) return 
    try {
        await flashcardservice.reviewflashcard(currentcard._id , index)
        toast.success("Flashcard reviewed")
    } catch (error) {
        toast.error("failed to review flashcard")
    }
}

const handletogglestar = async (cardid) => {
  try {
    await flashcardservice.togglestar(cardid);
setflashcards((prevflashcards)=>prevflashcards.map((card)=>card._id === cardid ? {...card , isstarred:!card.isstarred} : card))
    toast.success("Flashcard starred status updated!");
  } catch (error) {
    toast.error("Failed to update star status");
  }
};



const handledeleteflashcardset = async()=>{
setdeleting(true)
try {
    await flashcardservice.deleteflashcardset(flashcardsets._id)  // upr phle save krliya set jo delete krna h phir ._id use krke call kiya deletflashcard ko 
    toast.success("Flashcard set deleted successfully")
   setisdeletemodalopen(false)
    fetchflashcard()
} catch (error) {
     toast.error(   error.message || "failed to delete flashcard")
}
finally{
    setdeleting(false)
}
}

const renderflashcardcontent =()=>{
  if(loading){
    return <Spinner/>
  }
  if(flashcards.length ===0){
    return <Emptystate title="No flashcards yet" description="Generate flashcards from your document to start learning"/>
  }
}

const currentcard = flashcards[currentcardindex]




  return (
    <div>



      
    </div>
  )
}

export default Flashcardpage