import React, { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'
import {ArrowLeft , Plus , ChevronLeft , ChevronRight , Trash2, Bubbles} from "lucide-react"
import toast from "react-hot-toast"
import flashcardservice from '../../services/flashcardservice.js'
import Emptystate from '../../components/common/Emptystate.jsx'
import Pageheader from '../../components/common/Pageheader.jsx'
import aiservice from "../../services/aiservice.js"
import Spinner from '../../components/common/Spinner.jsx'
import Modal from '../../components/common/Modal.jsx'
import Flashcard from '../../components/flashcards/Flashcard.jsx'
import Button from '../../components/common/Button.jsx'
import Applayout from '../../components/layout/Applayout.jsx'
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
    if(flashcards.length > 0){
        handlereview(currentcardindex)  // jb bhi prev ya next card pr click krrhe h toh phle handlereview call horha hh 
        setcurrentcardindex((previndex)=>(previndex+1)%flashcards.length)  // circular iteration ke liye ... 
        // previndex -9 (last card) , previndex+1 10 %10 = 0 which means it will show 0 th index card ie first one ... 
    }
}


const handleprevcard = ()=>{
    if(flashcards.length > 0){
        handlereview(currentcardindex)
         setcurrentcardindex((previndex)=>(previndex-1+flashcards.length)%flashcards.length)
    }
}


const handlereview = async(index)=>{  // yha pr vo card aarha h vo hmne dekh liya .. 
    const currentcard = flashcards[currentcardindex]  // currentcard ka data 
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

const currentcard = flashcards[currentcardindex]



  return (
    <div className='flex flex-col items-center space-y-6'>

<div className='w-full max-w-md'>
  <Flashcard flashcard={currentcard} ontogglestar={handletogglestar}/>
</div>
<div className='flex items-center gap-4'>
  <Button onClick={handleprevcard} variant = "secondary" disabled={flashcards.length<=1}>
     <ChevronLeft size={16}/>Previous
    </Button>
 <span className='text-sm text-neutral-600 '>{currentcardindex+1}/{flashcards.length}</span>
   <Button onClick={handlenextcard} variant = "secondary" disabled={flashcards.length <= 1}>
     Next<ChevronRight size={16}/>
    </Button>
</div>

    </div>
  )
}



return(

  <Applayout>

 <div>

<div className='mb-4'>
  <Link to={`/documents/${documentid}`} className='inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900
  transition-colors'><ArrowLeft size={16}/>Back to document</Link>
</div>


<Pageheader title="Flashcards">

  <div className='flex gap-2'>
    {!loading && (
      flashcardsets.length > 0 ? (
        <Button 
          onClick={() => setisdeletemodalopen(true)} 
          disabled={deleting}
        >
          <Trash2 size={16} />
        </Button>
      ) : (
        <Button 
          onClick={handlegenerateflashcards}  
          disabled={generating}
        >
          {generating ? (
            <Spinner />
          ) : (
            <>
              <Plus size={16} /> Generate Flashcards
            </>
          )}
        </Button>
      )
    )}
  </div>

</Pageheader>
{renderflashcardcontent()}

<Modal isOpen={isdeletemodalopen} onClose={()=>setisdeletemodalopen(false)} title="Confirm delete flashcard set">
<div className='space-y-4 '>
  <p className='text-sm text-neutral-600 '>Are you sure you want to delete all flashcards for this document ? This action cannnot be undone</p>
  <div className='flex justify-end gap-2 pt-2'>
    <Button type="button" variant="secondary" onClick={()=>setisdeletemodalopen(false)} disabled={deleting}>
Cancel
    </Button>
   <Button className="bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-500" onClick={handledeleteflashcardset} disabled={deleting}>
{deleting ? "Deleting..." : "Delete"}
    </Button>

  </div>
</div>
</Modal>


  </div>


  </Applayout>

 
)


}

export default Flashcardpage