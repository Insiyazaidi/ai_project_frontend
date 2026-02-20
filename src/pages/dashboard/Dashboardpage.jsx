import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner.jsx'
import progressservice from '../../services/progressservice.js'
import { BrainCircuit, TrendingUp , BookOpen , FileText , Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import Applayout from '../../components/layout/Applayout.jsx'
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
    fetchdashboarddata();  // function call kiya .. aur useffect m hi define krdia ... 
  } , [])
  if(loading){
    return <Spinner/>
  }

  if(!dashboarddata){
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
      value: dashboarddata.totaldocuments,
      icon:FileText ,
      gradient: "from-blue-400 to-cyan-500",
      shadowColor: "shadow-blue-500/25"
    },

    {
      label: "Total Flashcards",
      value: dashboarddata.totalflashcards,
      icon:BookOpen ,
      gradient: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/25"
    },

        {
      label: "Total Quizzes",
      value: dashboarddata.totalquizzes,
      icon:BrainCircuit,
      gradient: "from-emerald-400 to-teal-500",
      shadowColor: "shadow-emerald-500/25"
    }


  ]

  return (
        <Applayout>
<div> </div>
<div>

{/* Heading */}

  <div>
    <h1>Dashboard</h1>
    <p>Track your learning progress and activity</p>
    </div>  

{/* Stats grid */}

<div>
  {
    stats.map((stat,index)=>{

      return(
            <div key={index}>
<div>
  <span className=''>{stat.label}</span>
  <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg ${stats.shadowColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}></div>
<stat.icon className='' strokeWidth={2}/>
</div>
<div>{stat.value}</div>
      </div> 
      )    
    })
  }      
</div>  
{/* Recent activity section  */}

<div>
  <div>
    <div>
      <Clock className="" strokeWidth={2}/>
    </div>
    <h3>Recent Activity</h3>
  </div>

{dashboarddata.recentactivity && (dashboarddata.recentactivity.documents.length > 0 || dashboarddata.recentactivity.quizzes.length>0 )

 && 
<div>
  {[
    ...(dashboarddata.recentactivity.documents || []).map(doc=>({
      id:doc._id,
      description: doc.title,
      timestamp: doc.lastaccessed,
      link:`/documents/${doc._id}`,
      type:"document"
    }))
  ]}
</div>


}




</div>



  </div>

        </Applayout>

    
  )
}

export default Dashboardpage