import React from 'react'
import Applayout from '../../components/layout/Applayout'
import { useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router'
import { ChevronRight, ChevronLeft , CheckCircle2 } from 'lucide-react'
import Spinner from '../../components/common/Spinner'
import Pageheader from '../../components/common/Pageheader'
import quizservice from '../../services/quizservice'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'

const Quiztakepage = () => {
  const {quizid} = useParams()
  const navigate = useNavigate()
  const [quiz , setquiz] = useState(null) 
  const [loading, setloading]= useState(true)
  const [currentquesindex , setcurrentquesindex] = useState(0)
  const [selectedanswers , setselectedanswers] = useState({}) 
  const [submitting, setsubmitting]= useState(false)


useEffect(()=>{
  const fetchquiz = async()=>{
    try {
      const response = await quizservice.getquizbyid(quizid)
      setquiz(response.data)
    } catch (error) {
      toast.error("Failed to fetch quiz")
      console.error(error)
    }
    finally{
      setloading(false)
    }
  }
  fetchquiz()

} , [quizid])


const handleoptionchange = (questionid ,  optionindex)=>{
setselectedanswers((prev)=>({
  ...prev , [questionid]:optionindex

}))
}

const handlenextques =()=>{
  if(currentquesindex < quiz.questions.length-1){
    setcurrentquesindex((prev)=>prev+1)
  }
}


const handleprevques =()=>{
  if(currentquesindex >0){
    setcurrentquesindex((prev)=>prev-1)
  }
}

const handlesubmitquiz = async()=>{

}

if(loading){
  return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <Spinner/>
    </div>
  )
}
if(!quiz || quiz.questions.length===0){
  return(
    <div className='flex items-center justify-center min-h-[60vh]'>
      <div className='text-center'>
        <p className='text-slate-600 text-lg'>Quiz not found or has no question</p>
      </div>
    </div>
  )
}

const currentques=quiz.questions[currentquesindex]  // current ques nikala current ques index se 
const isanswered = selectedanswers.hasOwnProperty(currentques._id)
const answeredcount = Object.keys(selectedanswers).length


  return (
<Applayout>

<div className='max-w-4xl mx-auto'>
  <Pageheader title={quiz.title || "Take Quiz"}/>

   {/* Progress bar */}
<div className='mb-6'>
  <div className='flex items-center justify-between mb-2'>
    <span className='text-sm font-semibold text-slate-700'>Question {currentquesindex+1} of {quiz.questions.length}</span>
    <span className='text-sm font-semibold text-slate-500'>{answeredcount} answered</span>
  </div>
  <div className='relative h-2 bg-slate-100 rounded-full overflow-hidden'>

  <div className='absolute inset-y-0 left-0 bg-linear-to-r from-primary-dark to-primary rounded-full transition-all duration-500 ease-out'
   style={{width: `${((currentquesindex+1)/quiz.questions.length)*100}`}} />
  
  </div>
</div>

   {/* ques card */}
<div className='bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 mb-4'>
  <div className='inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary-dark to-primary border border-primary-dark rounded-xl mb-3'>
  

    <div className='w-3 h-3 bg-white rounded-full animate-pulse'/>
      <span className='text-sm font-semibold text-white'>Question {currentquesindex+1}</span>
    </div>



    <h3 className='text-lg font-semibold text-slate-900 mb-6 leading-relaxed '>{currentques.question}</h3>

   {/* options*/}

<div className='space-y-3'>
  {
  currentques.options.map(( option,index)=>{
const isselected = selectedanswers[currentques._id] ===index 
return(
  <label key={index} className={`group relative flex items-center p-3 border-2 mb-5 rounded-xl cursor-pointer transition-all duration-200 ${isselected ? 'border-primary-dark bg-soft text-white ' :'border-slate-200 bg-slate-50/50 hover:border-slate-300 ' } `}>

<input type='radio' name={`question-${currentques._id}`} 
value={index} checked={isselected} onChange={()=>handleoptionchange(currentques._id , index)} className='sr-only'>
</input>

 {/* custom radio btton */}

<div className={`shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${isselected ? 'border-primary-dark bg-soft' : 'border-slate-200 group-hover:border-primary'}`}>
{isselected && (
  <div className='w-full h-full  flex items-center justify-center'>
    <div className='w-2 h-2 bg-primary-dark rounded-full'> </div>
  </div>
)}
</div>

{/* option text  */}

<span className={`ml-4 text-sm font-semibold transition-colors duration-200 ${isselected ? "text-primary-dark " :"text-slate-700 group-hover:text-slate-900"}`}>
{option}
</span>





  </label>
)   
  }
)}</div>
  </div>

{/* navigation buttons  */}


<div>
  <Button onClick={handleprevques} disabled={currentquesindex===0 || submitting} variant='secondary'>
    <ChevronLeft className='' strokeWidth={2.5}/> Previous
    </Button>


{currentquesindex === quiz.questions.length - 1 ? (
  <button onClick={handlesubmitquiz} disabled={submitting}>
    
    {submitting ? (
      <div>Submitting...</div>
    ) : (
      <>
        <CheckCircle2 strokeWidth={2.5} />
        <span>Submit</span>
      </>
    )}

  </button>
) : (
  <button onClick={handlenextques} disabled={submitting}>
    Next <ChevronRight strokeWidth={2.5} />
  </button>
)}


</div>




</div>








</Applayout>
  )
}

export default Quiztakepage