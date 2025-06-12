import React, { useState, useEffect } from "react";
import { getChannelDetails } from "../ApiCalls/user_auth";
import { Input } from "../components/index.js";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateAccount,changePassword } from "../ApiCalls/user_auth";
const setting = () => {
    const [channel, setChannel] = useState();
    const [personalstatus, setPersonalstatus] = useState(true);
    const [channelinfostatus, setChannelinfostatus] = useState(false);
    const [changepasswordstatus, setChangepasswordstatus] = useState(false);
    const userData = useSelector(state => state.auth.userData)
    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            fullname: userData.fullName,
            username: userData.userName,
            email: userData.email,
            description:userData.description
        }
    })
    const navigate = useNavigate();
    useEffect(() => {
        const channelname = (userData.userName);
        const fetchdata = async () => {
            const chann = await getChannelDetails(channelname)
            setChannel(chann.data)
        }
        fetchdata();
    }, [])

    const persoupdate = async (detail) => {
        const data = await updateAccount({...detail,chann:false})
        if (data) navigate("");
    }
    const channupdate = async (detail) => {
        const data = await updateAccount({...detail,chann:true})
        if (data) navigate("");
    }
    const changepassword=async(detail)=>{
       if(detail.npassword!==detail.cpassword){
        alert("New password not match")}
        const data=await changePassword({oldPassword:detail.currentpassword,newPassword:detail.npassword})
    }
    const cancel = () => {
        reset({
            fullname: userData.fullName,
            username: userData.userName,
            email: userData.email,
            description:userData.description
        });
    }
    function persoinfo() {
        setPersonalstatus(true)
        setChannelinfostatus(false)
        setChangepasswordstatus(false)
    }
    function channinfo() {
        setPersonalstatus(false)
        setChannelinfostatus(true)
        setChangepasswordstatus(false)
    }
    function chanpsswrd() {
        setPersonalstatus(false)
        setChannelinfostatus(false)
        setChangepasswordstatus(true)
    }
   async function admin(){
     navigate("/admin")
    }
    // return (
    //     channel?
    //     <>
    //         <img src={channel.coverImage} alt="Coverimage" />
    //     <img src={channel?.avatar} alt="Coverimage" />
    //     <div>{channel.userName}</div>
    //     <div>{channel.fullName}</div>
    //     <div>{channel.channelsSubscribedToCount}</div>
    //     <div>{channel.subscribersCount}</div>
    //     <div>{"Is subscribed  "+ channel.isSubscribed}</div>
    //     <div>
    //         <button onClick={admin}>View Channel</button>
    //     </div>
    //         <div className="flex justify-between w-full">
    //             <button onClick={persoinfo} className="px-4 py-2 bg-blue-500 text-white rounded">Personal destails</button>
    //             <button onClick={channinfo} className="px-4 py-2 bg-blue-500 text-white rounded">Channel information</button>
    //             <button onClick={chanpsswrd} className="px-4 py-2 bg-blue-500 text-white rounded">Change passsword</button>
    //         </div>

    //         {
    //             personalstatus && <>
    //                 <h2>Persoonal info:</h2>
    //                 <h3>Update your photo and personal details.</h3>

    //                 <div>
    //                     <form onSubmit={handleSubmit(persoupdate)} >
    //                         <Input
    //                             type="text"
    //                             label="Fullname"
    //                             {...register('fullname')}
    //                         />
    //                         <Input
    //                             type="text"
    //                             label="email"
    //                             {...register('email')}
    //                         />
    //                         <button type="button" onClick={cancel} >Cancel</button>
    //                         <button type="submit">Save changes</button>
    //                     </form>
    //                 </div>
    //             </>
    //         }

    //         {
    //             channelinfostatus &&
    //             <>
    //                 <h2>Channel info</h2>
    //                 <h3>Update your channel details here </h3>

    //                 <form onSubmit={handleSubmit(channupdate)}>

    //                     <Input
    //                         type="text"
    //                         label="Channel name"
    //                         {...register('username')}
    //                     />
    //                     <Input
    //                         type="text"
    //                         label="Description"
    //                         {...register('description')}
    //                     />
    //                     <button type="button" onClick={cancel} >Cancel</button>
    //                     <button type="submit">Save changes</button>

    //                 </form>
    //             </>
    //         }
    //          {
    //             changepasswordstatus &&
    //             <>
    //                 <h2>Change Password</h2>
    //                 <h3>Please enter your current password to change your password.</h3>

    //                 <form onSubmit={handleSubmit(changepassword)}>

    //                     <Input
    //                         type="text"
    //                         label="Current password"
    //                         {...register('currentpassword')}
    //                     />
    //                     <Input
    //                         type="text"
    //                         label="New password"
    //                         {...register('npassword')}
    //                     />
    //                     <Input
    //                         type="text"
    //                         label="Confirm password"
    //                         {...register('cpassword')}
    //                     />
    //                     <button type="button" onClick={cancel} >Cancel</button>
    //                     <button type="submit">Save changes</button>

    //                 </form>
    //             </>
    //         }
    //     </>:
    //     <h1>Loading</h1>
    // )

    return channel ? (
  <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-md">
    
    {/* Cover Image & Avatar */}
    <div className="relative">
      <img
        src={channel.coverImage}
        alt="Cover"
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="absolute -bottom-12 left-6 flex items-center space-x-4">
        <img
          src={channel.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{channel.userName}</h2>
          <p className="text-gray-500 text-sm">{channel.fullName}</p>
        </div>
      </div>
    </div>

    {/* View Channel Button */}
    <div className="pt-16 flex justify-end">
      <button
        onClick={admin}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm"
      >
        See details
      </button>
    </div>

    {/* Feature Buttons */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <button
        onClick={persoinfo}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md text-sm font-medium transition"
      >
        Personal Details
      </button>
      <button
        onClick={channinfo}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg shadow-md text-sm font-medium transition"
      >
        Channel Information
      </button>
      <button
        onClick={chanpsswrd}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg shadow-md text-sm font-medium transition"
      >
        Change Password
      </button>
    </div>

    {/* Personal Info Form */}
    {personalstatus && (
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner border">
        <h2 className="text-xl font-semibold mb-1 text-blue-700">Personal Info</h2>
        <p className="text-gray-500 mb-4">Update your photo and personal details.</p>
        <form onSubmit={handleSubmit(persoupdate)} className="space-y-4">
          <Input type="text" label="Fullname" {...register("fullname")} />
          <Input type="text" label="Email" {...register("email")} />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={cancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )}

    {/* Channel Info Form */}
    {channelinfostatus && (
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner border">
        <h2 className="text-xl font-semibold mb-1 text-purple-700">Channel Info</h2>
        <p className="text-gray-500 mb-4">Update your channel details here.</p>
        <form onSubmit={handleSubmit(channupdate)} className="space-y-4">
          <Input type="text" label="Channel Name" {...register("username")} />
          <Input type="text" label="Description" {...register("description")} />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={cancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )}

    {/* Change Password Form */}
    {changepasswordstatus && (
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner border">
        <h2 className="text-xl font-semibold mb-1 text-red-700">Change Password</h2>
        <p className="text-gray-500 mb-4">
          Please enter your current password to change your password.
        </p>
        <form onSubmit={handleSubmit(changepassword)} className="space-y-4">
          <Input type="password" label="Current Password" {...register("currentpassword")} />
          <Input type="password" label="New Password" {...register("npassword")} />
          <Input type="password" label="Confirm Password" {...register("cpassword")} />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={cancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
) : (
  <h1 className="text-center text-xl font-semibold text-gray-700">Loading...</h1>
);

}



export default setting