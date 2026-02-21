import React from 'react'
import { useNavigate } from 'react-router'
import { FileText , Trash2 , BookOpen , BrainCircuit , Clock } from 'lucide-react'
import moment from "moment"

const formatfilesize = (bytes)=>{
    if(bytes==undefined || bytes ===null) return "N/A";
    const units=["B" , "KB" , "MB" , "GB" , "TB"]
    let size = bytes;
    let unitindex = 0;
    while(size>=1024 && unitindex<units.length-1){
        size/=1024;
        unitindex++
    }
    return `${size.toFixed(1)} ${units[unitindex]}`
}
const Documentcard = ({document , oneDelete}) => {


const navigate = useNavigate()
const handlenavigate = ()=>{
    navigate(`documents/${document._id}`)
}
const handledelete =(e)=>{
    e.stopPropagation();
    oneDelete(document)
}

  return (
    <div>Documentcard</div>
  )
}







export default Documentcard