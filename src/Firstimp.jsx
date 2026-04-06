import React from 'react'
import examboy from "../src/assets/Exams-brooo.svg"
import { useNavigate } from 'react-router';
import { motion } from "framer-motion";
import {container , item , heading , buttonAnim , imageAnim} from "./motions.js"
import { useAuth } from './context/Authcontext.jsx';
const Firstimp = () => {
  const texts = [
  "not just answers.",
  "real understanding.",
  "deep focus.",
  "true clarity."
];
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth();
  return (
   <motion.div variants={container}
  initial="hidden"
  animate="show" className="min-h-screen bg-linear-to-r from-primary-dark to-primary text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-3 items-center mt-9 grid md:grid-cols-2  gap-12">

        {/* LEFT */}
        <div>
         <motion.h1 variants={heading} className="flex items-center text-9xl font-bold leading-tight mb-8">
  Synaply 
  
</motion.h1>


          <motion.h1 variants={item}  className="text-5xl font-bold leading-tight text-soft">
       Built for focused learning - <br /> 

<AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>



          </motion.h1>



          <motion.p variants={item} className="mt-6 text-gray-400 text-lg">
           Organize, revise, and test yourself with tools designed to help you actually retain what you learn.
          </motion.p>

         <motion.button
  variants={buttonAnim}
  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
  className="mt-8 bg-white text-primary-dark px-6 py-3 rounded-full font-semibold transition"
>
  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
</motion.button>
        </div>


        <div>

<motion.img variants={imageAnim} src={examboy} />
        </div>

       
  
      </div>

     

   
    </motion.div>
  )
}

export default Firstimp