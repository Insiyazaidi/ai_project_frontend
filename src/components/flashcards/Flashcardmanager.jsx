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
        await aiservice.generateflashcards(documentid)
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
if(!settodelete) return 
setdeleting(true)
try {
    await flashcardservice.deleteflashcardset(settodelete._id)
    toast.success("Flashcard set deleted successfully")
   setisdeletemodalopen(false)
    setsettodelete(null)
    fetchflashcardsets()
} catch (error) {
     toast.error(   error.message || "failed to delete flashcard")
}
finally{
    setdeleting(false)
}


}

const handleselectset = (set)=>{
    setselectedset(set)
    setcurrentcardindex(0)
}

const renderflashcardviewer= ()=>{
    const currentcard = selectedset.cards[currentcardindex]
    return(
        <div className='space-y-8'>
 {/* back button*/} 
<button className='group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200' onClick={()=>setselectedset(null)}><ArrowLeft className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' strokeWidth={2}/>Back to Sets</button>

 {/*Flashcard display*/} 

 <div className='flex flex-col items-center space-y-8'>
    <div className='w-full max-w-2xl '><Flashcard flashcard = {currentcard} ontogglestar ={handletogglestar}/></div>
 </div>


 {/*Navigation control */} 

<div className='flex items-center gap-6'>
    <button onClick={handleprevcard} disabled={selectedset.cards.length<=1} className='group flex items-center gap-2 px-5 h-11 bg-slate-100 hover:bg-slate-200  text-slate-700 font-medium rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100'>
<ChevronLeft className='w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200' strokeWidth={2.5}/>Previous
    </button>
    <div className='px-4 py-2  bg-slate-50 rounded-lg border border-slate-200 '><span className='text-sm font-semibold text-slate-700'>{currentcardindex+1}{}<span className=''>/</span>{" "}{selectedset.cards.length} </span></div>
    <button onClick={handlenextcard} className='' disabled={selectedset.cards.length<=1}>Next<ChevronRight className='' strokeWidth={2.5}/></button>
</div>
        </div>
    )
}

const rendersetlist = ()=>{
if(loading){
    return(
        <div className='flex items-center justify-center py-20'><Spinner/></div>
    )
}

if(flashcardsets.length===0){
    return(
    <div className='flex flex-col items-center justify-center py-16 px-6 '>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-soft'>
            <Brain className='w-8 h-8 text-primary-dark' strokeWidth={2}/>
        </div>
        <h3 className='text-xl font-semibold text-slate-900 mb-2'>No flashcards Yet</h3>
        <p className='text-sm text-slate-500 mb-8 text-center max-w-sm'>Generate flashcards from your document to start learning and reinforce your knowledge</p>
        <button onClick={handlegenerateflashcards} disabled={generating} className='group inline-flex items-center gap-2 px-6 h-12 bg-linear-to-r from-primary-dark to-primary hover:from-primary hover:to-primary text-white font-semibold text-sm rounded-xl transition-all duration-200  active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'>{generating ? (<>
        
        <div className='w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin'>Generating</div>
        
        </>):<><Sparkles className='w-4 h-4' strokeWidth={2}/>Generate Flashcards</>}</button>
    </div>
)
}

return (
    <div className='space-y-6'>
        {/* Header with Generate button*/} 
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='text-lg font-semibold text-slate-900 '>Your flashcard Sets</h3>
                <p className='text-sm text-slate-500 mt-1'>{flashcardsets.length}{" "}{flashcardsets.length===1 ? "set" : "sets"} available</p>
            </div>



          <button 
  onClick={handlegenerateflashcards} 
  disabled={generating} 
  className='group inline-flex items-center gap-2 px-5 h-11 bg-linear-to-br  from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'
>
  {generating ? (
    <>
      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
      <span>Generating...</span>
    </>
  ) : (
    <>
      <Plus className='w-4 h-4' strokeWidth={2.5}/>
      Generate New Set
    </>
  )}
</button>



        </div>
   {/* Flashcard sets grid*/} 
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
    {flashcardsets.map((set)=>(
        <div key={set._id} onClick={()=>handleselectset(set)} className='group relative bg-white/80 backdrop-blur-xl border-2 border-slate-200 hover:border-secondary rounded-2xl p-6 cursor-pointer  transition-all duration-200  '>
 {/* Delete button*/} 
<button onClick={(e)=>handledeleterequest(e,set)} className='absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100'><Trash2 className='w-4 h-4' strokeWidth={2}/></button>
 {/* Set content*/}

 <div className='space-y-4'>
    <div className='inline-flex items-center justify-center w-12 h-12  rounded-xl bg-soft'>
        <Brain className='w-6 h-6 text-primary-dark' strokeWidth={2}/>
    </div>
    </div> 

<div className='py-2'>
<h4 className='text-base font-semibold text-slate-900  '>Flashcard Set</h4>
<p className='text-xs font-medium text-slate-500 uppercase tracking-wide'>Created {moment(set.createdat ).format("MMM D, YYYY")}</p>
</div>

<div className='flex items-center gap-2 pt-2 border-t border-slate-100'>
    <div className='px-3 py-1.5 bg-soft border border-primary rounded-lg '>
        <span className='text-sm  font-semibold text-primary-dark'>{set.cards.length}{" "}{set.cards.length===1 ? "card" :"cards"}</span>
    </div>
</div>


        </div>



    ))}
</div>

    </div>
)



}

  return (

    <>

       <div className='bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 p-8'>
 {selectedset ? renderflashcardviewer():rendersetlist()}
    </div>

 {/* Delete configuration model */}

<Modal isOpen={isdeletemodalopen} onClose={()=>setisdeletemodalopen(false)} title="Delete Flashcard Set?">
<div className='space-y-6'>
<p className='text-sm  text-slate-600'>Are you sure you want to delete this flashcard set? This action cannot be undone and all cards will be permanently removed </p>
<div className='flex items-center justify-end gap-3 pt-2'>
    <button type='button'onClick={()=>setisdeletemodalopen(false)} className='px-5 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>Cancel</button>
    <button onClick={handleconfirmdelete} disabled={deleting} className=' px-5 h-11 bg-linear-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ' >{deleting? (<span className='flex items-center gap-2' ><div className='w-4 h-4  border-2 border-white/30 rounded-full animate-spin'>Deleting</div></span>):"Delete Set"}</button>
</div>

</div>
    </Modal>

 
    </>
 
  )
}

export default Flashcardmanager