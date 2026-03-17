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

    const [flashcards , setflashcards] = useState([])
    const [selectedset , setselectedset] = useState(null)
    const [loading , setloading]= useState(true)
    const [generating , setgenerating ]= useState(false)
    const [currentcardindex , setcurrentcardindex] = useState(0)
        const [isdeletemodalopen , setisdeletemodalopen ]= useState(false)
    const [deleting , setdeleting ]= useState(false)
    const [settodelete , setsettodelete] = useState(null)
    

  return (
    <div>Flashcardmanager</div>
  )
}

export default Flashcardmanager