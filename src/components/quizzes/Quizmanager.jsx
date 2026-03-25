import React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import  quizservice from '../../services/quizservice.js'
import aiservice from '../../services/aiservice.js'
import Spinner from '../common/Spinner.jsx'
import Button from '../common/Button.jsx'
import Modal from '../common/Modal.jsx'
import Quizcard from './Quizcard.jsx'
import Emptystate from '../common/Emptystate.jsx'
const Quizmanager = ({documentid}) => {
    const [quizzes , setquizzes ] = useState([])
     const [loading , setloading ] = useState(true)
      const [generating , setgenerating ] = useState(false)
       const [numques , setnumques ] = useState("5")
        const [isgeneratemodalopen , setisgeneratemodalopen ] = useState(false)
         const [isdeletemodalopen , setisdeletemodalopen ] = useState(false)
          const [deleting , setdeleting ] = useState(false)
           const [selectedquiz , setselectedquiz] = useState(null)

const fetchquizzes =async()=>{

    try {
        const res = await quizservice.getquizzesfordocument(documentid)
        console.log(res.data)
    setquizzes(res.data)
    } catch (error) {
        toast.error("Failed to fetch quizzes")
        console.error(error)
    }
    finally{
        setloading(false)
    }
    
}
useEffect(()=>{
    if(documentid){
        fetchquizzes();
    }
},[documentid])


const handlegeneratequiz = async(e)=>{
e.preventDefault()
setgenerating(true)

    try {
        await aiservice.generatequiz(documentid , {numques})
        toast.success("Quiz generated successfully")
        setisgeneratemodalopen(false)
        fetchquizzes();
    } catch (error) {
         toast.error( error.message  ||"Failed to generate quizzes")
    }
    finally{
        setgenerating(false)
    }
}

const handledeleterequest = (quiz)=>{
    setselectedquiz(quiz)
    setisdeletemodalopen(true)
}
const handleconfirmdelete = async()=>{
if(!selectedquiz)return
setdeleting(true)
try {
    await quizservice.deletequiz(selectedquiz._id)
toast.success(`${selectedquiz.title || "Quiz"} deleted`)
setisdeletemodalopen(false)
setselectedquiz(null)
setquizzes(quizzes.filter(q=>q._id!== selectedquiz._id))
} catch (error) {
    toast.error(error.message || "Failed to delete quiz")
}
finally{
    setdeleting(false)
}
}

const renderquizcontent = ()=>{
if(loading){
    return <Spinner/>
}
  if(quizzes.length===0){
    return (
        <Emptystate title="No Quizzes Yet" description = "Generate a quiz from your document to test your knowledge "/>
    )
  }

return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
       {quizzes.map((quiz) => (
    <Quizcard key={quiz._id} quiz={quiz} ondelete={handledeleterequest}/>
))}

    </div>
)

}



  return (
    <div className='bg-white border border-neutral-200 rounded-lg p-6'>
<div className='flex justify-end gap-2 mb-4'>
    <Button className='' onClick={()=>setisgeneratemodalopen(true)}><Plus size={16} />Generate Quiz</Button>
</div>
    {renderquizcontent()}


{/*  Generate quiz*/}
<Modal isOpen={isgeneratemodalopen} onClose={()=>setisgeneratemodalopen(false)} title="Generate New Quiz">

<form onSubmit={handlegeneratequiz} className='space-y-4'>
    <div>
        <label className='block text-xs font-medium text-neutral-700 mb-1.5'>Number of Question</label>
        <input type='number' value={numques} onChange={(e)=>setnumques(e.target.value)} min="1" required 
        
        className='w-full  h-9 px-3 border-neutral-200 rounded-lg bg-white text-sm  text-neutral-900 placeholder-neutral-400 transition-colors duration-150 focus:outline-none focus:ring-2 '></input>
    </div>

<div className='flex justify-end gap-2 pt-2'>
    <Button type='button' variant='secondary' onClick={()=>setisgeneratemodalopen(false)} disabled={generating}>Cancel</Button>
<Button type='submit' disabled={generating}>{generating?"Generating" : "Generate"}</Button>
</div>
</form>

</Modal>


 {/* Delete configuration model */}





<Modal isOpen={isdeletemodalopen} onClose={()=>setisdeletemodalopen(false)} title="Confirm Delete Quiz">
<div className='space-y-6'>
<p className='text-sm  text-slate-600'>Are you sure you want to delete the quiz:<span className='font-semibold text-neutral-900'>{selectedquiz?.title|| "this quiz"}</span> This action cannot be undone </p>
<div className='flex items-center justify-end gap-3 pt-2'>
    <Button type='button'onClick={()=>setisdeletemodalopen(false)} variant='outline' disabled={deleting}>Cancel</Button>
    <Button onClick={handleconfirmdelete} disabled={deleting} className=' px-5 h-11 bg-linear-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 '
    >   {deleting? "Deleting...":"Delete"}  </Button>
</div>

</div>
    </Modal>



    </div>
  )
}

export default Quizmanager