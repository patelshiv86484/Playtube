import React, { useState,useEffect } from "react";
import { getWatchHistory } from "../ApiCalls/user_auth.js";
import { Videopreview } from "../components/index.js";
import { useNavigate } from "react-router-dom";
const watchHistory=()=>{
     const [history,setHistory]=useState([])
     const navigate=useNavigate();
     useEffect(()=>{
       const fetchdata=async()=>{
        const hist=await getWatchHistory();
           setHistory(hist.data.watchHistory)
       }
       fetchdata();
        }
     ,[])
const play=(vid)=>{
  navigate(`/video/${vid._id}`)
  }
    return (
        history? <>{
                history.map((vid)=>(
                        <div key={vid._id}  style={{cursor: "pointer"}} onClick={()=>play(vid)}>
                        <Videopreview video={vid} />
                        </div>
                    ))
                  }  </>
        :
        <h1>No watch history</h1>
    )
}

export default watchHistory;