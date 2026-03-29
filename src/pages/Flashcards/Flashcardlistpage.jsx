import React from 'react'

import { useEffect  , useState } from 'react'
import Pageheader from '../../components/common/Pageheader'
import Spinner from '../../components/common/Spinner'
import EmptyState from "../../components/common/Emptystate"
import Flashcardsetcard from '../../components/flashcards/Flashcardsetcard'
import toast from 'react-hot-toast'
import Flashcardservice from "../../services/flashcardservice.js"
import flashcardservice from '../../services/flashcardservice.js'
import Applayout from '../../components/layout/Applayout.jsx'
const Flashcardlistpage = () => {

  const [flashcardsets , setflashcardsets] = useState([])
  const [loading , setloading] = useState(true)
  useEffect(()=>{
const fetchflashcardsets = async()=>{
try {
  const response =  await flashcardservice.getallflashcardsets()
  console.log(response)
  setflashcardsets(response.data)
} catch (error) {
  toast.error("Failed to fetch flashcard set")
  console.error(error)
}
finally{
  setloading(false)
}
}
fetchflashcardsets()

  }, [])


  const rendercontent =()=>{
  if(loading){
    return <Spinner/>
  }
  if(flashcardsets.length===0){
    return (
      <EmptyState title ="No flashcard set found " description="You haven't generated any flashcards yet .Go to a document to create your first set"/>
    )
  }
  return (
    
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      
      {flashcardsets.map((set)=>
      <Flashcardsetcard key={set._id} flashcardset={set}/>)} 
      
    </div>
  )
}
  return (
    <Applayout>
 <div>
      <Pageheader title="All flashcard sets"/>
      {rendercontent()}
    </div>
    </Applayout>
    
   
  )
}

export default Flashcardlistpage