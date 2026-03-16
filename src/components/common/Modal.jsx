import React from 'react'
import { X } from "lucide-react"

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">

      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">

        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-8">
          <h3 className="text-xl font-medium text-slate-900">
            {title}
          </h3>
        </div>

        {children}

      </div>
    </div>
  )
}

export default Modal