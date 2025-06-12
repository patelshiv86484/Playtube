import axios from "axios";  
 
async function postLike({id,idNumber}){
    try {
          const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/likes/post-like/${id}`,{
            idNumber,//1 for video,2 for comment ,3 for tweet
          },{
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: postlike error :: error", error);
          return false
        }
}
async function geAllLikes({id,idNumber}){

    try {
          const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/likes/get-likes/${id}`,{
            idNumber,//1 for video,2 for comment ,3 for tweet
          },
           {
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: gtAlllikes  :: error", error);
          return false
        }
}
async function removeLike({id,idNumber}){
    try {
       
          const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/likes/dislike/${id}`,{
             idNumber
          },{
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: removelike  :: error", error);
          return false
        }
}


async function likedVideoByUser(){
     try {
          const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/likes/likedVideoByUser`,{
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: removelike  :: error", error);
          return false
        }
}
async function getlikescount(userName){
   try {
          const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/likes/getlikescount/${userName}`,{
            idNumber:1
          },{
           withCredentials: true,
          })
          return getteddata.data;
        } catch (error) {
          console.log("database serive :: getting likes count  :: error", error);
          return false
        }
}
export {postLike,geAllLikes,removeLike,likedVideoByUser,getlikescount}