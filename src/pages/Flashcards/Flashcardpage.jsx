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
  return (
    <div>Flashcardpage</div>
  )
}

export default Flashcardpage