import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner.jsx'
import progressservice from '../../services/progressservice.js'
import { BrainCircuit, TrendingUp , BookOpen , FileText , Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import Applayout from '../../components/layout/Applayout.jsx'
import { Link } from 'react-router'
const Dashboardpage = () => {
  const [dashboarddata , setdashboarddata] = useState(null)
  const [loading , setloading] = useState(true)

  useEffect(()=>{
    const fetchdashboarddata = async()=>{
      try {
        const data = await progressservice.getdashboarddata();
        console.log("data__ getdashboarddata" , data)
        setdashboarddata(data)
      } catch (error) {
        toast.error('Failed to fetch dashboard data')
        console.log(error)
      }
      finally{
        setloading(false)
      }
    }
    fetchdashboarddata();
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
      value: dashboarddata.data.totaldocuments,
      icon: FileText,
      gradient: "from-primary-dark to-primary",
      
    },
    {
      label: "Total Flashcards",
      value: dashboarddata.data.totalflashcards,
      icon: BookOpen,
      gradient: "from-primary-dark to-primary",
      
    },
    {
      label: "Total Quizzes",
      value: dashboarddata.data.totalquizzes,
      icon: BrainCircuit,
      gradient: "from-primary-dark to-primary",
      
    }
  ] // bg-[radial-gradient(#e5e7eb_1px , transparent_1px)]

  return (
    <Applayout>

      <div className='min-h-screen'> 
        <div className='absolute inset-0 bg-soft/90 bg-size-[16px_16px] opacity-10 pointer-events-none'/>
        
        <div className='relative max-w-7xl mx-auto'>

          {/* Heading */}
          <div className='mb-6'>
            <h1 className='text-2xl font-medium text-slate-900 tracking-tight mb-2'>Dashboard</h1>
            <p className=' text-slate-500 text-sm'>Track your learning progress and activity</p>
          </div>  

          {/* Stats grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-5'>
            {
              stats.map((stat,index)=>{
                return(
                  <div 
                    key={index} 
                    className='group relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-200/50 p-6 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 hover:-translate-y-1'
                  
                  >

                    <div className='flex items-center justify-between'>
                      <span className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>
                        {stat.label}
                      </span>

                   
                      <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.gradient}  flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className='w-5 h-5 text-white' strokeWidth={2}/>
                      </div>
                    </div>

                    <div className='mt-4 text-2xl font-semibold text-slate-900'>
                      {stat.value}
                    </div>

                  </div> 
                )    
              })
            }      
          </div>  

          {/* Recent activity section */}
          <div className='bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-200/50 p-6'>

            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center'>
                <Clock className="w-5 h-5 text-slate-600" strokeWidth={2}/>
              </div>
              <h3 className='text-xl font-medium text-slate-900 tracking-tight'>Recent Activity</h3>
            </div>

            {
              dashboarddata.recentactivity &&
              (dashboarddata.recentactivity.documents.length > 0 ||
               dashboarddata.recentactivity.quizzes.length > 0)
              ? (
                <div className='space-y-3'>
                  { [   // ... is used - Array ke andar jo items hain unko bahar nikaal do" , 
                    ...(dashboarddata.recentactivity.documents || []).map(doc=>({
                      id:doc._id,
                      description: doc.title,
                      timestamp: doc.lastaccessed,
                      link:`/documents/${doc._id}`, 
                      type:"document"
                    })),
                    ...(dashboarddata.recentactivity.quizzes || []).map(quiz=>({
                      id:quiz._id,
                      description: quiz.title,
                      timestamp: quiz.completedat,
                      link:`/quizzes/${quiz._id}`,
                      type:"quiz"
                    }))
                  ]
                  .sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp)).map((activity,index)=>(

                    <div 
                      key={activity.id || index} 
                      className='group flex items-center justify-between p-4 rounded-xl bg-slate-50/50 border border-slate-200/60 hover:bg-white hover:border-slate-300/60 hover:shadow-md transition-all duration-200'
                    >

                      <div className='flex-1 min-w-0'>

                        <div className="flex items-center gap-2 mb-1">

                     
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type==="document"
                              ? "bg-linear-to-r from-primary to-primary-dark"
                              : "bg-linear-to-r from-primary to-primary-dark"
                          }`}></div>

                          <p className='text-sm font-medium text-slate-900 truncate'>
                            {activity.type === "document" ? "Accessed Document: " : "Attempted Quiz: "}
                            <span className='text-slate-700'>{activity.description}</span>
                          </p>
                        </div>

                        <p className='text-sm text-slate-500'>
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>

                      </div>

                      {activity.link && (
                        <Link 
                          to={activity.link} 
                          className='ml-4 px-4 py-2 text-sm font-semibold text-emerald-800 hover:text-white hover:bg-primary-dark rounded-lg transition-all duration-200 whitespace-nowrap'
                        
                        >
                          View 
                        </Link>
                      )}

                    </div>

                  ))}
                </div>
              )
              : (
                <div className='text-center py-12'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4'>
                    <Clock className='w-8 h-8 text-slate-400'/>
                  </div>
                  <p className='text-sm text-slate-600'>No recent activity yet</p>
                  <p className='text-xs text-slate-500 mt-1'>Start learning to see your progress here</p>
                </div>
              )
            }

          </div>

        </div>
      </div>

    </Applayout>
  )
}

export default Dashboardpage