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
  const [selectedanswers , setselectedanswers] = useState({})   // ek object h toh ismai key , value ki form m store hoga 
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

const currentques=quiz.questions[currentquesindex] 

// current ques nikala saare ques m  se using index of current ques 
const isanswered = selectedanswers.hasOwnProperty(currentques._id) 
// Kya user ne is current question ka answer diya hai .. finding through currentques._id(key) , value m index store hota h option ka 

const answeredcount = Object.keys(selectedanswers).length  // kitni keys h object m  


  return (
<Applayout>

<div className='max-w-4xl mx-auto h-screen '>
  <Pageheader title={quiz.title || "Take Quiz"}/>

   {/* Progress bar */}
<div className='mb-6'>
  <div className='flex items-center justify-between mb-2'>
    <span className='text-sm font-semibold text-slate-700'>Question {currentquesindex+1} of {quiz.questions.length}</span>
    <span className='text-sm font-semibold text-slate-500'>{answeredcount} answered</span>
  </div>
  <div className='relative h-2 bg-slate-100 rounded-full overflow-hidden'>

  <div className='absolute inset-y-0 left-0 bg-linear-to-r from-primary-dark to-primary rounded-full transition-all duration-500 ease-out'
   style={{width: `${((currentquesindex+1)/quiz.questions.length)*100}%`}} />
  
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

    // { "acgy8y6cc" : 2} means 'acgy8ycc' - is quesid and 2 is the option index 
  currentques.options.map(( option,index)=>{ // here index is option index 
const isselected = selectedanswers[currentques._id] ===index // ab yha checkk krhe ki  selected answer object m jo option index store h vhi ho tum ya nhi 
return(
  <label key={index} className={`group relative flex items-center p-3 border-2  rounded-xl cursor-pointer transition-all duration-200 ${isselected ? 'border-primary-dark bg-soft text-white ' :'border-slate-200 bg-slate-50/50 hover:border-slate-300 ' } `}>

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

<div className='flex items-center justify-between gap-4'>
  <Button onClick={handleprevques} disabled={currentquesindex===0 || submitting} variant='secondary'>
    <ChevronLeft className='w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200' strokeWidth={2.5}/> Previous
    </Button>


{currentquesindex === quiz.questions.length - 1 ? (
  <button onClick={handlesubmitquiz} disabled={submitting} className=' group relative px-8 h-12 bg-linear-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled: cursor-not-allowed disabled:active:scale-100 overflow-hidden' >
    
    <span className='relative z-10 flex items-center justify-center gap-2 '>
      {submitting ? (
        <>
          <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin '>Submitting...</div>
        </>
      ) : (
        <>
          <CheckCircle2 className='w-4 h-4' strokeWidth={2.5} />Submit Quiz 
        </>
      )}
    </span>

    <div className='absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-200'  />

  </button>
) : (
  <Button onClick={handlenextques} disabled={submitting}>
    Next
    <ChevronRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200' strokeWidth={2.5} />
  </Button>
)}

</div>

{/*  question navigation dots */}

<div className='mt-0 flex items-center justify-center gap-2 flex-wrap '>
  {quiz.questions.map((_, index)=>{
    const isansweredques = selectedanswers.hasOwnProperty(quiz.questions[index]._id)
    const iscurrent = index=== currentquesindex
    return(
      <button key={index} onClick={()=>setcurrentquesindex(index)} disabled={submitting} className={`w-8 h-8 rounded-lg font-sembold 
      text-xs transition-all duration-200 ${iscurrent ? 'bg-linear-to-r from-primary-dark to-primary text-white': isansweredques ?
        'bg-soft text-primary-dark ': 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      } disabled:opacity-50 disabled:cursor-not-allowed
      
      `}>
{index+1}
      </button>
    )
  })}
</div>




</div>








</Applayout>
  )
}

export default Quiztakepage