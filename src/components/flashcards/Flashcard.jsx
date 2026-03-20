import React, { useState } from 'react'
import {Star , RotateCcw} from "lucide-react"
const Flashcard = ({flashcard , ontogglestar}) => {
  const [isflipped , setisflipped] = useState(false)
const handleflip =()=>{
  setisflipped(!isflipped)
}

  return   <div className='relative w-full h-72' style={{perspective:"1000px"}}>

<div className={`relative w-full h-full transition-transform duration-500 transform-gpu cursor-pointer`} style={{transformStyle:"preserve-3d" , transform: isflipped? "rotateY(180deg)":"rotateY(0deg)"}}

onClick={handleflip}>


   {/* front side with ques*/} 

<div className='absolute inset-0 w-full h-full bg-white/80 backdrop-blur-xl border-2 border-slate-200  rounded-2xl  flex flex-col justify-between p-8' style={{backfaceVisibility:"hidden" , WebkitBackfaceVisibility:"hidden"}}>

   {/* Star button*/} 

<div className='flex items-start justify-between'>
  <div className='bg-slate-100 text-[10px] text-slate-600 rounded px-4 uppercase py-1'>{flashcard.difficulty}</div>

<button
  onClick={(e) => {
    e.stopPropagation();
    ontogglestar(flashcard._id);
  }}
  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
    flashcard.isstarred
      ? "bg-linear-to-br from-blue-600 to-blue-300 text-white"
      : "bg-pink-700 text-slate-400 hover:bg-slate-200 hover:text-blue-900"
  }`}
><Star className='w-4 h-4'   strokeWidth={2} fill ={flashcard.isstarred ? "currentColor":"none"}/></button>
</div>


   {/* ques content*/} 

<div className='flex-1  items-center justify-center px-4 py-6  min-h-0  '>
  <p className='text-lg font-semibold text-slate-900 text-center leading-relaxed  overflow-y-auto'>{flashcard.question}</p>
</div>

   {/* flip indicator*/} 
   <div className='flex items-center justify-center gap-2 text-xs text-slate-400 font-medium'>
    <RotateCcw className='w-3.5 h-3.5' strokeWidth={2}/>
    <span className=''>Click to reveal answer</span>
   </div>


</div>


{/*backside */} 

<div className='absolute inset-0 h-full w-full bg-linear-to-br from-primary to-soft border-2  border-primary-dark rounded-2xl p-8 flex flex-col justify-between' style={{backfaceVisibility:"hidden" , WebkitBackfaceVisibility:"hidden" , transform:"rotateY(180deg)"}}>


   {/* Star button */} 

<div className='flex justify-end'>

<button
  onClick={(e) => {
    e.stopPropagation();
    ontogglestar(flashcard._id);
  }}
  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
    flashcard.isstarred
      ? "bg-white/30 backdrop:backdrop-blur-sm text-white border-white/40 "
      : "bg-amber-300 backdrop-blur-sm text-white/70 hover:bg-white/30 hover:text-white border border-white/20"
  }`}
><Star className='w-4 h-4'   strokeWidth={2} fill ={flashcard.isstarred ? "currentColor":"none"}/></button>

</div>

   {/*answer*/} 

<div className='flex-1 min-h-0 flex  items-center justify-center px-4 py-6  overflow-hidden'>
  <p className='text-lg font-semibold text-slate-900 text-center leading-relaxed'>{flashcard.answer}</p>
</div>


   {/* flip indicator*/} 

<div className='flex items-center justify-center gap-2 text-xs text-slate-400 font-medium'>
    <RotateCcw className='w-3.5 h-3.5' strokeWidth={2}/>
    <span className='text-primary'>Click to reveal question</span>

   </div>
</div>




</div>

  </div>
   
}

export default Flashcard