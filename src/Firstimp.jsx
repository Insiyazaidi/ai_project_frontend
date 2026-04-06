import React, { useState, useEffect } from 'react';
import examboy from "../src/assets/Exams-brooo.svg";
import { useNavigate } from 'react-router';
import { motion } from "framer-motion";
import { container, item, heading, buttonAnim, imageAnim } from "./motions.js";
import { useAuth } from './context/Authcontext.jsx';

const Firstimp = () => {

  const texts = [
    "late night study grinds",
  "last minute revisions",
  "turning doubts into clarity", 

  ];
const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

useEffect(() => {
  const currentText = texts[textIndex];

  let timeout;

  if (!isDeleting && charIndex < currentText.length) {
    // typing
    timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + currentText[charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 40);  // after every 40 sec next char will be displayed ..
  } 
  else if (!isDeleting && charIndex === currentText.length) { // if fuully typed 
    // pause before deleting
    timeout = setTimeout(() => {
      setIsDeleting(true);  // setdeletingtrue after 1200 sec .. wait 1200 sec after that one sentence is typed 
    }, 1200);
  } 
  else if (isDeleting && charIndex > 0) { //  we are deleting and still letter exist 
    // deleting
    timeout = setTimeout(() => {
      setDisplayedText((prev) => prev.slice(0, -1)); // hr baar last char remove hojaiga 
      setCharIndex((prev) => prev - 1);  // -1 is  last character 
    }, 20);
  } 
  else if (isDeleting && charIndex === 0) {  // fully delete then move to next char .. 

    // move to next text
    setIsDeleting(false);
    setTextIndex((prev) => (prev + 1) % texts.length);
  }

  return () => clearTimeout(timeout);
}, [charIndex, isDeleting, textIndex]);




  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-linear-to-r from-primary-dark to-primary text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 items-center mt-9 grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div>
          <h1
           
            className="flex items-center text-9xl font-bold leading-tight mb-8"
          >
            Synaply
          </h1>

          <h1
           
            className="text-5xl font-bold leading-tight text-soft"
          >
            Built for - <br />
<div className='h-15 flex items-center'>
  <span>
              {displayedText}
              <span className=" ml-1 animate-pulse">.</span>
            </span>
</div>
          
          </h1>

          <p variants={item} className="mt-6 text-gray-400 text-lg">
            Organize, revise, and test yourself with tools designed to help you actually retain what you learn.
          </p>

          <button
            variants={buttonAnim}
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
            className="mt-8 bg-white text-primary-dark px-6 py-3 rounded-full font-semibold transition"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <motion.img variants={imageAnim} src={examboy} />
        </div>

      </div>
    </div>
  );
};

export default Firstimp;