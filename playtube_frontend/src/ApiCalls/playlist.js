
import axios from "axios";  
 
async function getUserPlaylist(userid){
    try {
          const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/playlists/getUserPlaylist/${userid}`,{
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: getuserplaylists :: error", error);
          return false
        }
}

async function createPlaylist({arr,title ,description,thumbnail}){
  const formData = new FormData();
  formData.append("arr", JSON.stringify(arr));
  formData.append("title",title)
  formData.append("description",description)
  formData.append("thumbnail",thumbnail)
    try {
          const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/playlists/create-playlist`,
            formData,
            {
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: createplaylist :: error", error);
          return false
        }
}

async function deletePlaylist(playlistId){
    try {
          const getteddata=await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/playlists/delete-playlist/${playlistId}`,{
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: deleteplaylist :: error", error);
          return false
        }
}

async function getplaylistbyid(id){
 try {
          const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/playlists/get-playlist/${id}`,{
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: getplaylistbyid :: error", error);
          return false
        }
}
export {getUserPlaylist,createPlaylist,deletePlaylist,getplaylistbyid} 