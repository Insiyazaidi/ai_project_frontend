import React , {useState} from 'react'
import {useParams} from "react-router-dom"
import {Sparkles , BookOpen , Lightbulb} from "lucide-react"
import aiservice from '../../services/aiservice'
import toast from 'react-hot-toast'
import MarkdownRenderer from '../common/MarkdownRenderer'
const Aiactions = () => {
    const {id : documentid} = useParams()
    const [loadingaction , setloadingaction] = useState(null)
    const [ismodelopen , setismodelopen] = useState(false)
    const [modaltitle , setmodeltitle] = useState("")
const [modalcontent , setmodelcontent] = useState("")
const [concept, setconcept] = useState("")

const handlegeneratesummary = async()=>{
    setloadingaction("summary")
    try {
        const {summary} = await aiservice.generatesummary(documentid)
        setmodeltitle("Generated Summary")
        setmodelcontent(summary)
        setismodelopen(true)
    } catch (error) {
      toast.error("Failed to generate summary")

    }
    finally{
        setloadingaction(null)
    }
}

const handleexplainconcept = async(e)=>{
    e.preventDefault()
    if(!concept.trim()){
        toast.error("Please enter a concept to explain")
        return
    }
    setloadingaction("Explain")
    try {
       const {explanation} = await aiservice.explainconcept(documentid , concept)
       setmodeltitle(`Explanation of ${concept}`)
       setmodelcontent(explanation) 
       setismodelopen(true)
    } catch (error) {
        toast.error("Failed to explain concept")
    }
    finally{
        setloadingaction(null)
    }
}

  return (
   <>
    {/* Header */}
   <div className='bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-xl shadow-slate-200/50 overflow-hidden'>

<div className='px-6 py-5 border-b border-slate-200/60 bg-linear-to-br from-slate-50/50 to-white/50'>
    <div className='flex items-center gap-3'>

<div className='w-10 h-10 rounded-xl bg-linear-to-br from-primary-dark to-primary shadow-lg shadow-secondary flex items-center justify-center'><Sparkles className='w-5 h-5 text-white' strokeWidth={2} /></div>
<div>
    <h3 className='text-lg font-semibold text-slate-900 '>AI Assistant</h3>
    <p className='text-xs text-slate-500'>Powered by advance AI</p>
</div>
    </div>
</div>



<div className='p-6 space-y-6'>
 {/* Generate summary */}
<div className='group p-5 bg-linear-to-br from-slate-50/50 to-white rounded-xl border border-slate-200/60 hover:border-slate-300/60  hover: shadow-md transition-all duration-all duration-200'>
    <div className='flex items-start gap-3 mb-2'>
        <div className='flex-1'>
<div className='flex items-center gap-2 mb-2'>
      <div className='w-8 h-8 rounded-lg bg-linear-to-br from-blue-100 to-cyan-100 flex items-center justify-center'>
                <BookOpen className='w-4 h-4' strokeWidth={2}/>
            </div>
            <h4 className='font-semibold text-slate-900'>Generate Summary</h4>
</div>
   <p className='text-sm text-slate-600 leading-relaxed'>Get a concise sumary of the entire document</p>       
        </div>
        <button onClick={handlegeneratesummary} disabled={loadingaction ==="summary"} className='shrink-0 h-10 px-5 bg-linear-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'>{loadingaction === "summary" ? (
<span className='flex items-center gap-2'>
    <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'/>
    Loading...
</span>

        ): "Summarize"}</button>
    </div>
</div>

 {/* Explanation */}
<div className='group p-5 bg-linearto-br from-slate-50/50 to-white rounded-xl border border-slate-200/60 hover:border-slate-300/60 hover:shadow-md transition-all duration-200 '>
<form onSubmit={handleexplainconcept}>
    <div className='flex items-center gap-2 mb-3'>
        <div className='w-8 h-8 rounded-lg bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center'>
<Lightbulb className='w-4 h-4 text-amber-600' strokeWidth={2}/>
        </div>
<h4 className='font-semibold text-slate-900 '>Explain a concept</h4>
    </div>
    <p className='text-sm text-slate-600 leading-relaxed mb-4'>Enter a topic or concept from the document to get a detailed explanation</p>
    <div className='flex items-center gap-3'>
        <input type='text' value={concept} onChange={(e)=>setconcept(e.target.value)} placeholder='eg- React Hooks' className='flex-1 h-11 px-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary-dark focus:bg-white focus:shadow-lg  focus:shadow-purple-500'disabled={loadingaction ==="explain"}></input>
   <button type='submit'disabled={loadingaction === "explain" || !concept.trim()} className='shrink-0 h-11 px-5 bg-linear-to-r   from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'>{loadingaction === "explain" ? (<span className='flex items-center gap-2'
    ><div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'/></span>):"Explain"}</button>
   
   
    </div>
</form>

</div>

</div>
   </div>
   
   
   </>
  )
}

export default Aiactions