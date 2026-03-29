import React from 'react'
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
  return (
    <div>Flashcardpage</div>
  )
}

export default Flashcardpage