import React from "react"
import { Videodetail } from "../components/index.js"
import { useParams } from "react-router-dom"

const video=()=>{
    const {slug} =useParams();
    return (
        <>
         <Videodetail videoid={slug} />
        </>
    )
}

export default video