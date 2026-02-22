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
  const formdata = new FormData();  // make the data into form ... 
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

const handlefilechange =  (e)=>{
const file = e.target.files[0]
if(file){
  setuploadfile(file)
  setuploadtitle(file.name.replace(/\.[^/.]+$/, ""))
}
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
  setdocuments(documents.filter((d)=> d._id !== selecteddoc._id)) // now keep only remaining document on ui 
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
  if(documents.length===0){ // if no document  ... 
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

return( // if documents are present  and we want to delete it ... 
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

  {isuploadmodelopen && ( <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm'>
  <div className='relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/20 p-3'>
    <button onClick={()=>setisuploadmodelopen(false)} className='absolute top-6 right-6 w-8 h-8 flex items-center justify-center rouunded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200'><X className='w-5 h-5' strokeWidth={2}/></button>
   
    {/* Modal header */}
    <div className='mb-6'>
      <h2 className='text-xl font-medium text-slate-900 tracking-tight'>Upload New Document</h2>
      <p className='text-sm text-slate-500 mt-1'>Add a PDF document to your library</p>
    </div>

     {/* form */}
<form onSubmit={handleupload} className='space-y-5'>
 {/* title input */}
 <div className='space-y-2'>
  <label className='block text-xs font-semibold text-slate-700 uppercase tracking-wide'>Document Title</label>
  <input type='text' value={uploadtitle} onChange={(e)=>setuploadtitle(e.target.value)} className='w-full h-12 px-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary-dark focus:bg-white focus:shadow-lg focus:shadow-primary' required placeholder="Enter title"></input>
 </div>

 {/* file upload*/}
<div className='space-y-2'>
  <label className='block text-xs font-semibold text-slate-700 uppercase tracking-wide'>PDF File</label>
  <div className='relative border-2 border-dashed  border-slate-300  hover:border-primary rounded-xl bg-slate-50/50  transition-all duration-200'>
  
  <input id="file-upload" type='file' className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10' onChange={handlefilechange} accept='.pdf'></input>
  
  <div className='flex flex-col items-center justify-center py-10 px-6'>
    <div className='w-14 h-14 rounded-xl bg-primary-dark flex items-center justify-center mb-4 '>
      <Upload className='text-white' strokeWidth={2}/>
    </div>
    <p className='text-sm font-medium text-slate-700 mb-1'>{uploadfile ? (<span>{uploadfile.name}</span>) :(<>
    
    <span className='text-primary-dark'>Click to upload</span>{" "}or drag and drop
     </>)}</p>
     <p className='text-xs text-slate-500'>PDF up to 10MB</p>
  </div>  
  </div>
</div>

{/* Action button*/}
<div className='flex gap-3 pt-2'>
  <button type='button' onClick={()=>setisuploadmodelopen(false)} disabled={uploading} className='flex-1 h-11 px-4 border-2 border-slate-200 rounded-xl bg-white  text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-allduration-200 disabled:opacity-50 disabled:cursor-not-allowed'>Cancel </button>
  <button type='submit' disabled={uploading} className='flex-1 h-11 px-4 bg-primary-dark hover:bg-primary text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-soft disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'>{uploading ?
  
  (<span className='flex items-center justify-center gap-2'><div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'>Uploading...</div></span>):("Upload")}</button>
</div>

</form>

  </div>
</div>)}

</div>


   </Applayout>
  )
}

export default Documentlistpage