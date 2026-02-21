import React, { useEffect, useState } from 'react'
import Applayout from '../../components/layout/Applayout'
import {Plus , Upload , Trash2 , FileText , X} from "lucide-react"
import toast from 'react-hot-toast'
import documentservice from '../../services/documentservice'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'
import Documentcard from '../../components/document/Documentcard'
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
  if(loading){
    return(
      <div className='flex items-center justify-center min-h-400px'>
        <Spinner/>
      </div>
    )
  }
  if(documents.length===0){
    return(
      <div className='flex items-center justify-center min-h-400px'>
        <div className='text-center max-w-md'>
          <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 shadow-lg shadow-slate-200/50 mb-6'>
            <FileText className='w-10 text-slate-400' strokeWidth={1.5}/>
          </div>
          <h3 className='text-xl font-medium text-slate-900 tracking-tight mb-2'>No document</h3>
          <p className='text-sm text-slate-500 mb-6'>Get started by uploading your first PDF document to begin learning </p>
          <button onClick={()=>setisuploadmodelopen(true) } className='inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-primary-dark to-primary  text-white text-sm font-semibold rounded-xl transition-all duration-200  '> <Plus strokeWidth={2.5}/>Upload document</button>
        </div>
      </div>
    )
  }

return(
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
    {documents?.map((doc)=>
      (
 <Documentcard key={doc._id} document={doc} oneDelete={handledeletereq}/>
      )

    )}
  </div>
)

}



  return (
   <Applayout>
<div className='min-h-screen'>
  {/* subtle background page  */}
  <div className='absolute inset-0 bg-soft/90 bg-size-[16px_16px] opacity-10 pointer-events-none'></div>


<div className='relative max-w-7xl mx-auto'>
{/* header  */}
<div className='flex items-center justify-between mb-10'>
  <div >
    <h1 className='text-2xl font-medium text-slate-900 tracking-tight mb-2'>My Documents</h1>
    <p className='text-slate-500 text-sm'>Manage and organize your learning material</p>
  </div>
  {documents.length>0 && (
    <Button onClick={()=>setisuploadmodelopen(true)}><Plus className='w-4 h-4' strokeWidth={2.5}/>Upload Document</Button>
  )}
</div>

{rendercontent()}
</div>

<div>
  <div>
    <button onClick={()=>setisuploadmodelopen(false)} className=''><X className='' strokeWidth={2}/></button>
   
    {/* Modal header */}
    <div>
      <h2 className=''>Upload New Document</h2>
      <p className=''>Add a PDF document to your library</p>
    </div>

     {/* form */}
<form onSubmit={handleupload} className=''>
 {/* title input */}
 <div>
  <label className=''>Document Title</label>
  <input type=''></input>
 </div>
</form>

  </div>
</div>

</div>


   </Applayout>
  )
}

export default Documentlistpage