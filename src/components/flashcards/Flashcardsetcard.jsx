import React from 'react'
import { useNavigate } from 'react-router'
import { BookOpen , Sparkles , TrendingUp } from 'lucide-react'
import moment from "moment"

const Flashcardsetcard = ({flashcardset}) => {
    const navigate = useNavigate()
    const handlestudynow =()=>{
        navigate(`/documents/${flashcardset.documentid._id}/flashcards`)
    }
    const reviewedcount = flashcardset.cards.filter(card=>card.lastreviewed).length  // jitne cards ka lastreviewed exist karta hai → unki count
    const totalcards  = flashcardset.cards.length
    const progresspercentage = totalcards>0?Math.round((reviewedcount/totalcards)*100):0




  return (
    <div className='group relative bg-white/80 backdrop-blur-xl border-2 border-slate-200 hover:border-primary rounded-2xl p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between' onClick ={handlestudynow}>
        <div className='space-y-4'>
{/*  Icon and title*/}


<div className='flex items-start gap-4 '>
    <div className='shrink-0 w-12 h-12 rounded-xl bg-soft flex items-center justify-center'><BookOpen strokeWidth={2} className='w4 h-4 text-primary-dark'/></div>
    <div className='flex-1 min-w-0 '>
        <h3 className='text-base font-semibold text-slate-900 line-clamp-2 mb-1' title = {flashcardset?.documentid?.title}>{flashcardset?.documentid?.title}</h3>
    <p className='text-xs font-medium text-slate-500 uppercase tracking-wide'>Created {moment(flashcardset.createdAt).fromNow()}</p>
    </div>
</div>

{/*  Stats*/}

<div className='flex items-center gap-3 pt-2 '>
    <div className='px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg '>
        <span className='text-sm font-semibold text-slate-700'>{totalcards} {totalcards===1 ? "Card" : "Cards "}</span>
    </div>
    {reviewedcount>0 && (
        <div className='flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-primary-dark rounded-lg '>
            <TrendingUp className='w-3.5 h-3.5 text-primary-dark' strokeWidth={2.5}/><span className='text-sm font-semibold text-primary-dark'>{progresspercentage}</span>
        </div>
    )}
</div>

{/*  Progress bar */}

{totalcards>0 && (
    <div className='space-y-2'>
        <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-slate-600'>Progress</span>
            <span className='text-xs font-semibold text-slate-700'>{reviewedcount}/{totalcards} reviewed</span>
        </div>
        <div className='relative h-2 bg-slate-100 rounded-full overflow-hidden'>
            <div className='absolute inset-y-0 left-0 bg-linear-to-r from-primary-dark to-primary rounded-full  transition-all duration-500 ease-out'   style={{width : `${progresspercentage}%`}}></div>
        </div>
    </div>
)}

{/* Study button  */}
<div className='mt-6 pt-4 border-t border-slate-100 '>
    <button onClick={(e)=>
       { e.stopPropagation()
        handlestudynow() }
    } className='group/btn relative w-full h-11 bg-linear-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 overflow-hidden'>
<span className='relative z-10 flex items-center justify-center gap-2'><Sparkles className='w-4 h-4 ' strokeWidth={2.5}/>Study Now</span>
<div className='absolute inset-0 bg-linear-to-r  from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700  '/>
    </button>
</div>

        </div>
    </div>
  )
}

export default Flashcardsetcard