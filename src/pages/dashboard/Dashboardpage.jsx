import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner.jsx'
import progressservice from '../../services/progressservice.js'
import { BrainCircuit, TrendingUp , BookOpen , FileText } from 'lucide-react'
const Dashboardpage = () => {
  const [dashboarddata , setdashboarddata] = useState(null)
  const [loading , setloading] = useState(true)
  useEffect(()=>{
    const fetchdashboarddata = async()=>{
      try {
        const data = await progressservice.getdashboarddata(); // frontend se axios ki help se data 
        console.log("data__ getdashboarddata" , data)
        setdashboarddata(data.data)
      } catch (error) {
        toast.error('Failed to fetch dashboard data')
        console.log(error)
      }
      finally{
        setloading(false)
      }
    }
    fetchdashboarddata()  // function call kiya .. aur useffect m hi define krdia ... 
  } , [])
  if(loading){
    return <Spinner/>
  }

  if(!dashboarddata || !dashboarddata.overview){
    return(
      <div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4'>
<TrendingUp className='w-8 h-8 text-slate-700'/>
          </div>
          <p className='text-slate-800 text-sm'>No dashboard data available</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: "Total documents",
      value: dashboarddata.overview.totaldocuments,
      icon:FileText ,
      gradient: "from-blue-400 to-cyan-500",
      shadowColor: "shadow-blue-500/25"
    },

    {
      label: "Total Flashcards",
      value: dashboarddata.overview.totalflashcards,
      icon:BookOpen ,
      gradient: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/25"
    },

        {
      label: "Total Quizzes",
      value: dashboarddata.overview.totalquizzes,
      icon:BrainCircuit,
      gradient: "from-emerald-400 to-teal-500",
      shadowColor: "shadow-emerald-500/25"
    }


  ]

  return (
    <div>Dashboardpage</div>
  )
}

export default Dashboardpage