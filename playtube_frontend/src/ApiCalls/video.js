
import axios from "axios";

  async function createVideo( data ) {
   const formData = new FormData();
   formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("isPublished", true);

  if (data.thumbnail && data.thumbnail[0]) {
    formData.append("thumbnail", data.thumbnail[0]);  // FileList -> single file
  }
  if(data.videoFile && data.videoFile[0]){
    formData.append("videoFile",data.videoFile[0]);
  }
    try {
      const getteddata= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/videos/uploadVideo`,formData,{
       withCredentials: true,
     } )
     return getteddata.data
    }
    catch (error) {
      console.log("database :: createVideo :: Error::", error);
      throw error;
    }
  }

  async function updateVideo({slug,  title, content,  isPublished,thumbnail }) {
    isPublished=(isPublished=="active");
    
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", content);
  formData.append("isPublished", isPublished);

  if (thumbnail && thumbnail[0]) {
    formData.append("thumbnail", thumbnail[0]);  // FileList -> single file
  }
    try {
      const getteddata= await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/images/edit-image/${slug}`,formData,{
        withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      console.log("database :: update :: Error::", error);
    }

  }

  async function deleteVideo(slug) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/videos/deleteVideo/${slug}`,{
        withCredentials:true,
      })
      return true;
    }
    catch (error) {
      console.log("database :: deletepost :: Error", error);
    }
  }

  async function getVideo(slug) {
    try {
      const getteddata= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/getvideo/${slug}`,{
        withCredentials: true,
      })
      return getteddata.data
    }
    catch (error) {
      console.log("database :: getvideo :: Error:: ", error)
    }
  }

  async function getVideos(data) {//isPublished and true is key value pair created by us in indexes.

    try {
      const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/getAllVideos`,{
        params:{userId:data.userId,query:data.query},
       withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      console.log("database serive :: getVideos :: error", error);
      return false
    }
  }
  
  //non tested
  async function getUserVideos({userid}){
       try {
      const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/videos/getUserVideo/${userid}`,{
       withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      console.log("database serive :: getuservideos :: error", error);
      return false
    }
  }

  async function videosById(arr){
     try {
      const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/videos/videosById`,{
        arr
      },{
       withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      console.log("database serive :: getuservideos :: error", error);
      return false
    }
  }
  async function totalviews(){
     try {
      const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/totalviews`,{
       withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      console.log("database serive :: total views :: error", error);
      return false
    }
  }

  async function adminvideodetail(){
    try {
      const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/admin-video-detail`,{
       withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      
    }
  }

  async function toggle(ele){
    try {
      const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/videos/toggle`,{
        ele
      },{
       withCredentials: true,
      })
      return getteddata.data;
    } catch (error) {
      
    }
  }
  async function deletevid(vidid){
    try {
      const getteddata=await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/videos/deleteVideo/${vidid}`,{
       withCredentials:true,
      })
      return getteddata.data;
    } catch (error) {
      
    }
  }
  export {deletevid,toggle,createVideo,updateVideo,deleteVideo,getVideo,getVideos,getUserVideos,videosById,totalviews,adminvideodetail}