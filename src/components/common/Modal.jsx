import React from 'react'
import {X} from "lucide-react"

const Modal = ({isOpen , onClose ,title , children}) => {
  return <div className='fixed inset-0 z-50 overflow-y-auto'>
    <div className='flex items-center justify-center min-h-screen px-4 py-8 '>
        <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/20 p-8 z-10 animate-in fade-in  slide-in-from-bottom-4 duration-300' onClick={onClose}></div>
<div>
    <button onClick={onClose} className=''><X className='' strokeWidth={2}/></button>
    <div className=''>
        <h3 className=''>{title}</h3>
    </div>

    <div>{children}</div>
</div>
    </div>
  </div>
}

export default Modal