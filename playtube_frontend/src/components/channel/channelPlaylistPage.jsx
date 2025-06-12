import React from "react";
import Playlistpreview from "../playListPreview"
import {getUserPlaylist}  from "../../ApiCalls/playlist"
const channelPlaylist=()=>{
  const [playlist,setPlaylist]=useState([])
  const [loader,setLoader]=useState(true)

  useEffect(()=>{
    setLoader(true)
   const fetchData=async()=>{
    const playlst=await getUserPlaylist({userid})
    setPlaylist(playlst);
   }
   fetchData();
   setLoader(false)
  },[]  )

    return ((!loader)?
    <>
      {playlist.legth!==0?(
        playlist?.map(plylst=>{
            <Playlistpreview playlist={plylst} />
        })) :(
        <h2>No playlist Uploaded by this channel</h2>
        )
      }
    </>:
    <h1>Loading</h1>
  )
}

export default channelPlaylist;