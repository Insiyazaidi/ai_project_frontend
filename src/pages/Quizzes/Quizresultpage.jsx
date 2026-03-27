import React from 'react'
import { useEffect, useState } from 'react'
import { useParams ,Link } from 'react-router'
import quizservice from '../../services/quizservice'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'
import { ArrowLeft, CheckCircle2 , XCircle , Trophy , Target , BookOpen } from 'lucide-react'
import Pageheader from '../../components/common/Pageheader'
import Applayout from '../../components/layout/Applayout'

const Quizresultpage = () => {
  const {quizid}  = useParams()
  const [result , setresult]= useState(null)
  const [loading , setloading] = useState(true)
  useEffect(()=>{
    const fetchresults = async()=>{
      try {
        const res = await quizservice.getquizresults(quizid)  // this data will be object containing - quiz , results 
      
        setresult(res)
       
     
      } catch (error) {
        toast.error("Failed to fetch quiz result ")
        console.error(error)
      }
      finally{
        setloading(false)
      }
    }
    fetchresults() 
  } , [quizid])

if(loading){
  return(
    <div className=' flex items-center justify-center min-h-[60vh]'>
      <Spinner/>
    </div>
  )
}

if(!result){
  return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <div className='text-center'>
        <p className='text-slate-600 text-lg'>Quiz results not found</p>
      </div>
    </div>
  )
}
//  result ek obj h jismai quiz , results , successs aarha h toh hmne usmai se destructure krke cheeze fetch ki .. 
 const quiz = result.quiz
 const detailedresult = result.results

 // console.log(detailedresult)
 const score = quiz.score 
 const totalques = detailedresult.length
 const correctans = detailedresult.filter(r=>r.iscorrect).length  // detailedresult is also an object containing multiple info ... 
const incorrect   = totalques - correctans
 const getscorecolor = ()=>{
   if(score>=80) return "from-primary-dark to-primary"
   if(score>=60) return "from-amber-500 to-orange-500"
   return "from-rose-500 to-red-500"
 }

 const getscoremessage =(score)=>{
   if(score>=90) return "Outstanding!"
    if(score>=80) return "Great job!"
    if(score>=70) return "Good work!"
     if(score>=70) return "Not bad!"
     return "Keep practicing"
 }


  return (
<Applayout>


    <div className='max-w-5xl mx-auto'>

{/* Back button*/}
<div className='mb-6'>
  <Link className='group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200' to={`/documents/${quiz.document._id}`}>
  <ArrowLeft className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' strokeWidth={2}/>Back to Document</Link>
</div>
<Pageheader title={`${quiz.title || "Quiz"} Results`}/>

{/* Score card */}

<div className='bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-2xl p-8 mb-3'>

<div className='text-center space-y-6'>
  <div className='inline-flex items-center justify-center w-15 h-15 rounded-2xl bg-linar-to-r from-primary-dark to-primary'>
    <Trophy className='w-7 h-7 text-primary-dark'/>
  </div>



  <p className='text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2'>Your Score</p>
  <div className={`inline-block text-5xl font-bold bg-linear-to-r ${getscorecolor(score)} bg-clip-text  text-transparent  mb-2` }>{score}%</div>
  <p className='text-lg font-medium text-slate-700'>{getscoremessage(score)}</p>
</div>

{/* Stas  */}

<div className='flex items-center justify-center gap-4 pt-4'>
  <div className='flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl'>
    <Target className='w-4 h-4 text-slate-600'/><span className='text-sm font-semibold text-slate-700'>{totalques} Total</span>
  </div>
  <div className='flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-500 to-emerald-400 border border-soft rounded-xl'>
    <CheckCircle2 className='w-4 h-4 text-emerald-600'/><span className='text-sm font-semibold text-emerald-800'>{correctans} Correct</span>
  </div>
<div className='flex items-center gap-2 px-4 py-2 bgrose-50 border border-rose-200 rounded-xl'>
    <XCircle className='w-4 h-4 text-rose-600'/><span className='text-sm font-semibold text-rose-700'>{incorrect} Incorrect</span>
  </div>
</div>
</div>

{/*   Question review   */}

<div className='space-y-6'>
  <div className='flex items-center gap-3 mb-2'>
    <BookOpen className='w-5 h-5 text-slate-600' strokeWidth={2}/>
    <h3 className='text-lg font-semibold text-slate-900'>Detailed Review</h3>
  </div>

{detailedresult.map((result , index)=>{   // options is an array of string , option[0] pr jo string hogi vo compare hogi selectedanswer vli string se  
  const useranswerindex = result.options.findIndex(option=>option=== result.selectedanswer) // options array pr traverse krhe h 
  const correctanswerindex = result.correctAnswer.startsWith("O")? // in case correct answer puri string nhi just "02" form m ho ki yeh option shi h 
  parseInt(result.correctAnswer.substring(1))-1: // toh us case m "02" m se 0 hta do only "2" rkho aur usko integer 2 bnao then  2-1 =1 kro kyu ki index toh 1 hoga option 2 ka 
  result.options.findIndex(opt=>opt===result.correctAnswer) // options array m loop lga kr check krhe ki kaun sa correct answer index h 
 
  const iscorrect = result.iscorrect // yeh toh true ya false store krega 


  return (
    <div key={index} className='bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-2xl p-6 '>
      <div className='flex items-center justify-between gap-4 mb-3'>
        <div className=' flex-1'>
          <div className='inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg mb-3'>
            <span className='text-xs font-semibold text-slate-600'>Question {index+1}</span>
          </div>
          <h4 className='text-base font-semibold text-slate-900 leading-relaxed'>{result.question}</h4>
        </div>
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${iscorrect ? "bg-emerald-400  border-emerald-600" :"bg-rose-50 border-2 border-rose-200"}`}>
{iscorrect ? <CheckCircle2 className='w-5 h-5 text-emerald-800' strokeWidth={2.5}/>:<XCircle className='text-rose-600' strokeWidth={2.5}/>}
        </div>
      </div>



<div className='space-y-3 mb-4'>
  {result.options.map((option , optionindex)=>{
    const iscorrectoption = optionindex=== correctanswerindex  // kya yeh option correct h  
    const isuseranswer = optionindex === useranswerindex  // kya user ne yeh option select kiya?
    const iswronganswer = isuseranswer && !iscorrect  // kya yeh userne select kiya aur answer overall wrong ho   
    return (
      <div key={optionindex} className={`relative px-4 py-3 rounded-lg  border-2 transition-all duration-200 ${iscorrectoption
        ? "bg-emerald-100 border-emerald-700" : iswronganswer ? "bg-rose-50 border-rose-300" : "bg-slate-50 border-slate-200"
      }` }>
        <div className='flex items-center justify-between gap-4 '>
          <span className={`text-sm font-medium ${iscorrectoption ? "text-emerald-700" : iswronganswer ? "text-rose-900" : "text-slate-500"}`}>{option}</span>
       <div className='flex items-center gap-2 '>
        {iscorrectoption && (<span  className='inline-flex items-center gap-1 px-2 py-1 bg-emerald-400 rounded-lg text-xs font-semibold text-white/90'  ><CheckCircle2 className='w-3 h-3' strokeWidth={2.5}/>Correct</span>)}
        {iswronganswer && (<span className='inline-flex items-center gap-1 px-2 py-1 bg-rose-100 border-rose-300 rounded-lg text-xs font-semibold text-rose-700'><XCircle className='w-3 h-3' strokeWidth={2.5}  />Your answer</span>)}
       </div>
        </div>
      </div>
    ) 
  })}
</div>


{/*  explanation    */}

{
  result.explanation && (
    <div className='p-4 bg-linear-to-r from-slate-50 to-slate-100/50 border border-slate-200 rounded-xl '>
      <div className='flex items-start gap-3'>
        <div className='shrink-0 w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center mt-0.5'>
          <BookOpen className='w-4 h-4 text-slate-600'/>
        </div>
        <div className='flex-1'>
          <p className='text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1'>Explanation</p>
          <p className='text-sm text-slate-700 leading-relaxed'>{result.explanation}</p>
        </div>
      </div>
    </div>
  )
}

{/*  action button    */}






    </div>
  )




})}
</div>






    </div>



</Applayout>


  )
}

export default Quizresultpage