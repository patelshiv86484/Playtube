import axios from "axios"
 
//axios.post(url,body,credential)
//axios.get(url,credential)
    async function createAccount({ email, password, userName,fullName,avatar,coverImage }) {//applying wraper on database methods to avoid dependency on database only OR avoiding vendor locking situation 
          const formData = new FormData();

    // Append text fields
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userName", userName);
    formData.append("fullName", fullName);

    // Append file fields — take first file from FileList
    if (avatar && avatar.length > 0) {
      formData.append("avatar", avatar[0]);
    }

    if (coverImage && coverImage.length > 0) {
      formData.append("coverImage", coverImage[0]);
    }
        try {
     const newUser=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/register`,formData ,{
        withCredentials:true
     })
            return newUser.data
        }
        catch (error) {
             console.log("Error in creating new user in frontend /database/js",error)
        }
    }
    async function updateAccount({ email,fullname,username,description,chann }) {  
        let data={}
        if(chann){
         data.userName=username
         data.description=description
         data.cahnn=chann
        }
        else{
          data.fullName=fullname
          data.email=email
          data.cahnn=chann
        }

        try {
            const updatedUser=await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/update-account`,{
              ...data
            },{
                withCredentials:true
            })
            return updatedUser.data
        }
        catch (error) {
             console.log("Error in updating user in frontend /database/js",error)
        }
    }
    async function changePassword({ oldPassword,newPassword }) {  
        try {
  const updatedUser=await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/change-password`,{
              oldPassword,
              newPassword,
            },{
                withCredentials:true
            })
            return updatedUser.data
        }
        catch (error) {
             console.log("Error in changing password in frontend /database/js",error)
        }
    }
    
    async function LoginDB({ email, psswrd }) {
        try {
            const loggedinuser= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`,{
                email,
                password:psswrd
            },{
                withCredentials:true,
            })
            return loggedinuser.data
        }
        catch (error) {
            console.log("Error in creating logging user in frontend /database/js",error)
        }
    }   

    async function getcurrentuser() {
        try {
            return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/current-user`,
                  {
                     withCredentials: true,
                  })
        }
        catch (error) {
            console.log("database serive :: getCurrentUser :: error", error);
        }
        return null;//no active user.
    }
    
    async function LogoutDB() {
       try {
            return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/logout`,{},
                  {
                     withCredentials: true,
                  })
        }
        catch (error) {
            console.log("database service :: logout :: error", error);
        }
        return null;//no active user.
    }

    async function getChannelDetails(channelName){
         try {
           
      const getteddata= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/c/${channelName}`,
                  {
                     withCredentials: true,
                  })
                  return getteddata.data;
        }
        catch (error) {
            console.log("database service :: getChanneldetails :: error", error);
        }
        return null;//no active user.
    }

    async function getUserById(userid){
        try {
        const getteddata= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/getuserbyid/${userid}`,{},{})
        return getteddata.data;
        }
        catch (error) {
            console.log("database service :: getuserbyid :: error", error);
        }
        return null;//no active user.
    }
        async function getWatchHistory() {
        try {
            const hist= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/history`,{
                withCredentials:true,
            })
            return hist.data
        }
        catch (error) {
            console.log("Error in fetching history in frontend /database/js",error)
        }
    }   
      
//implement refreshaccessstoken,changepassword,updateaccount.
    export {createAccount,LoginDB,getcurrentuser,changePassword,LogoutDB,getChannelDetails,getUserById,getWatchHistory,updateAccount}
