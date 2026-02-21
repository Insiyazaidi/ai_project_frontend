import React from 'react'
import { useNavigate } from 'react-router'
import { FileText , Trash2 , BookOpen , BrainCircuit , Clock } from 'lucide-react'
import moment from "moment"

const formatfilesize = (bytes)=>{
    if(bytes==undefined || bytes ===null) return "N/A";
    const units=["B" , "KB" , "MB" , "GB" , "TB"]
    let size = bytes;
    let unitindex = 0;
    while(size>=1024 && unitindex<units.length-1){
        size/=1024;
        unitindex++
    }
    return `${size.toFixed(1)} ${units[unitindex]}`
}
const Documentcard = ({document , oneDelete}) => {


const navigate = useNavigate()
const handlenavigate = ()=>{
    navigate(`documents/${document._id}`)
}
const handledelete =(e)=>{
    e.stopPropagation();
    oneDelete(document)
}

  return <div className='group relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 hover:border-slate-300/60  hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:translate-y-1 ' onClick={handlenavigate}>
    {/* header section */}
    <div>      
        <div className='flex items-start justify-between gap-3 mb-4' >
            <div className='shrink-0 w-12 h-12 bg-linear-to-br from-primary-dark to-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'> 
                <FileText className='w-6 h-6 text-white' strokeWidth={2}/></div>
            <button onClick={handledelete} className='opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all  duration-200'>
                
                <Trash2 className='w-4 h-4'/></button>
        </div>


        {/*  title*/}

        <h3 className='text-base font-semibold text-slate-900 truncate mb-2' title={document.title}>{document.title}</h3>

           {/*Document info */}
        <div className='flex items-center gap-3 text-xs text-slate-500 mb-3'>
            {document.filesize !==undefined && (
                <>
                <span className='font-medium'>{formatfilesize(document.filesize)}</span>
                </>
            )}
        </div>

   {/* Stats section*/}
<div className='flex items-center gap-3'>
    {document.flashcardcount !==undefined && (
        <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-soft rounded-lg'>
            <BookOpen className='w-3.5 h-3.5 text-primary'/><span className='text-xs font-semibold text-primary-dark'>{document.flashcardcount} Flashcards</span></div>
    )}

{document.quizcount !== undefined && (
    <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-soft rounded-lg '>
        <BrainCircuit className='w-3.5 h-3.5 text-primary' strokeWidth={2}/><span className='text-xs font-semibold text-primary-dark'>{document.quizcount} Quizzes</span>
    </div>
)}

</div>

    </div>

       {/* Footer section */}

<div className='mt-5 pt-4 border-slate-100 '>
<div className='flex items-center gap-1.5 text-xs text-slate-500'>
    <Clock className='w-3.5 h-3.5'  strokeWidth={2}/><span>Uploaded {moment(document.createdat).fromNow()}</span>
</div>
</div>

   {/*Hover indicator */}
   <div className='absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none'></div>

    </div>
  
}







export default Documentcard