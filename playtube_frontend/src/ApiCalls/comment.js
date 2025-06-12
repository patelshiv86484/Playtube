import axios from "axios"
async function postComment({ content,videoId }) {
    try {
        const postedComment = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/comments/post-comment/${videoId}`, {
          content
        },{withCredentials:true,}
       )
        return postedComment.data
    }
    catch (error) {
        console.log("Error in posting comment in frontend ", error)
    }
}

async function getComments(videoId){
    const queryParams = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortType: 'desc',
    videoId:videoId.videoid
  };

     try {
        const gettedComments = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/comments/get-all-comments`, 
           
            {params:queryParams,withCredentials:true}
       )
        return gettedComments.data
    }
    catch (error) {
        console.log("Error in gwtting comments in frontend ", error)
    }
}

export {postComment,getComments}