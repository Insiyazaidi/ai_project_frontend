import React from 'react'
import examboy from "../src/assets/Exams-brooo.svg"
import { useNavigate } from 'react-router';
const Firstimp = () => {
    const navigate = useNavigate()
  return (
   <div className="min-h-screen bg-linear-to-r from-primary-dark to-primary text-white relative overflow-hidden">


   
      <div className="max-w-7xl mx-auto px-6 py-3 items-center mt-9 grid md:grid-cols-2  gap-12">

        {/* LEFT */}
        <div>
          <h1 className="text-9xl font-bold leading-tight mb-8">  Synaply</h1>
          <h1 className="text-5xl font-bold leading-tight text-soft">
       Built for focused learning - <br /> not just answers.
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
           Organize, revise, and test yourself with tools designed to help you actually retain what you learn.
          </p>

          <button onClick={()=>navigate("/login")} className="mt-8 bg-white text-primary-dark px-6 py-3 rounded-full font-semibold  transition">
            Get Started
          </button>
        </div>


        <div>

<img src={examboy} />
        </div>

       
  
      </div>

     

   
    </div>
  )
}

export default Firstimp