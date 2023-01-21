import React from 'react'
import "./TrendCard.css"
import {TrendData} from "../../data/TrendData"
const TrendCard = () => {
  return (
    <div className='TrendCard'>
        <h3>Trends for You</h3>
        {
            TrendData.map((TrendData)=>{

                return (
                   <div className="trend">
                       <span>#{TrendData.name}</span>
                       <span>{TrendData.shares}k Shares</span>
                   </div>

                )
            })
        }
     
    </div>
  )
}

export default TrendCard
