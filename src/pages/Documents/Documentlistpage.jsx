import React, { useEffect, useState } from 'react'
import Applayout from '../../components/layout/Applayout'
import {Plus , Upload , Trash2 , FileText , X} from "lucide-react"
import toast from 'react-hot-toast'
import documentservice from '../../services/documentservice'
import Spinner from '../../components/common/Spinner'
const Documentlistpage = () => {
  const [documents , setdocuments] = useState([])
  const [loading , setloading] = useState(false)
  // state for upload model
   const [isuploadmodelopen , setisuploadmodelopen] = useState(false)
  const [uploadfile , setuploadfile] = useState(null)
  const [uploadtitle , setuploadtitle] = useState("")
    const [uploading , setuploading] = useState(false)

    // delete confirmation model
     const [isdeletemodalopen, setisdeletemodalopen] = useState(false)
    const [deleting , setdeleting] = useState(false)
     const [selecteddoc , setselecteddoc] = useState("")

const fetchdocuments = async()=>{
  try {
  const data =   await documentservice.getdocuments()
  setdocuments(data)
  } catch (error) {
    toast.error("Failed to fetch documents")
    console.error(error)
  }
  finally{
    setloading(false)
  }

}
  useEffect(()=>{
    fetchdocuments();
  } , []) 

const handleupload =  async(e)=>{
  e.preventDefault();
  if(!uploadfile || !uploadtitle){
    toast.error("Please provide a title and select a file")
    return
  }
  setuploading(true)
  const formdata = new FormData();
  formdata.append("file" , uploadfile)
  formdata.append("title" , uploadtitle)
  try {
    await documentservice.uploaddocument(formdata)  // requesting from frontend using axios 
    toast.success("Document uploaded successfully")
    setisuploadmodelopen(false)
    setuploadfile(null)
    setuploadtitle("")
      setloading(true)
    fetchdocuments()




  } catch (error) {
    toast.error(error.message || "Upload failed")
  }
  finally{
    setuploading(false)
  }
}
const handledeletereq = (doc)=>{
  setselecteddoc(doc)
  setisdeletemodalopen(true)
}
const handleconfirmdelete = async()=>{
  if(!selecteddoc){
    return 
  }
setdeleting(true)
try {
  await documentservice.deletedocument(selecteddoc._id)
  toast.success(`${selecteddoc.title} deleted`)
  setisdeletemodalopen(false)
  setselecteddoc(null)
  setdocuments(documents.filter((d)=> d._id !== selecteddoc._id)) // now keep only remaining document 
} catch (error) {
  toast.error(error.message || "Failed to delete document")
}
finally{
  setdeleting(false)
}

}

const rendercontent = ()=>{
  return 
  <div>renderContent</div>
}



  return (
   <Applayout>



   </Applayout>
  )
}

export default Documentlistpage