import React from 'react'
import { useState , useEffect } from 'react'
import { useParams, Link } from 'react-router'
import documentservice from '../../services/documentservice'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'
import {ArrowLeft , ExternalLink} from "lucide-react"
const Documentdetailpage = () => {
  const {id} =useParams()
  const [document , setdocument] = useState(null)
  const [loading , setloading]= useState(true)
  const [activetab , setactivetab] = useState("Content")

  useEffect(()=>{
    const fetchdocumentdetails = async()=>{
      try {
        const data = await documentservice.getdocumentbyid(id)
        setdocument(data)
      } catch (error) {
        toast.error("Failed to fetch document details")
        console.log(error)
      }
      finally{
        setloading(false)
      }
    }
    fetchdocumentdetails();
  } , [id])

// helper function to get the full pdf url 
const getpdfurl = ()=>{
  if(!document?.data?.filepath) return null;
  const fetchfilepath = document.data.filepath
  if(fetchfilepath.startsWith("http://") || fetchfilepath.startsWith("https://")){
    return fetchfilepath
  }
  const baseurl = process.env.REACT_APP_API_URL || "http://localhost:8000"
  return `${baseurl}${fetchfilepath.startsWith("/")? "":"/"}${fetchfilepath}`
}

const rendercontent =()=>{
  if(loading){
    return <Spinner/>
  }
  if(!document || !document.data || !document.data.filepath){
    return <div className='text-center p-8'>PDF not available</div>
  }
  const pdfurl = getpdfurl();
  return(
    <div className='bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm'>
      <div className='flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300'>
        <span className='text-sm font-medium text-gray-700'>Document Viewer </span>
        <a href={pdfurl} target='_blank' rel="noopener noreferrer" className='inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'>
<ExternalLink size={16}/> Open in new tab
        </a>
      </div>

<div className='bg-gray-100 p-1'>
  <iframe src={pdfurl} className='w-full h-[70vh] bg-white rounded border border-gray-300' title="PDF Viewer" frameBorder="0" style ={{colorScheme:"light"}}/>
</div>
    </div>
  )
}


const renderchat =()=>{
  return "render chat"
}

const renderaiactions=()=>{
  return "renderaiactions"
}

const renderflashcardstab=()=>{
  return "renderflashcardstab"
}

const renderquizzestab =()=>{

}

const tabs =[
  {name:"Content" , label:"Content" , content:rendercontent()},
 {name:"Chat" , label:"Chat" , content:renderchat()},
 {name:"AI Actions" , label:"AI Actions" , content:renderaiactions()},
  {name:"Flashcards" , label:"Flashcards" , content:renderflashcardstab()},
  {name:"Quizzes" , label:"Quizzes" , content:renderquizzestab()},
]

if(loading){
  return <Spinner/>
}
if(!document){
  return <div className='text-center p-8'>Document not found</div>
}


  return (
    <div>Documentdetailpage</div>
  )
}

export default Documentdetailpage