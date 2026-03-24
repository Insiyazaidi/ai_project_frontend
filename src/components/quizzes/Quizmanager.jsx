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
       const [numquestions , setnumquestion ] = useState(5)
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
        await aiservice.generatequiz(documentid , {numquestions})
        toast.success("Quiz generated successfully")
        setisgeneratemodalopen(false)
        fetchquizzes();
    } catch (error) {
         toast.error( error.message  ||"Failed to genrate quizzes")
    }
    finally{
        setgenerating(false)
    }
}

const handledeleterequest = (quiz)=>{
    setselectedquiz(quiz)
    setisdeletemodalopen(true)
}
const handleconfirmdelete = ()=>{

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


    </div>
  )
}

export default Quizmanager