import React from "react";
import { useForm } from "react-hook-form";
import Input from "./input";
import { updateVideo,createVideo } from "../ApiCalls/video.js";
import { useNavigate } from "react-router-dom";
export default function VideoForm({video}) {
    const {register,handleSubmit }=useForm({
        defaultValues:{
            title:video?.title || "Enter title",
            description:video?.description || "Enter Description",
        }
    });
    const navigate=useNavigate();
    const submit=async (data)=>{
            if(video){//video already exist 
              const updatedVideo=await updateVideo(data);
              if(updatedVideo) {
              navigate(`video/${updatedVideo._id}`);
              }
            }
            else{
               const createdVideo=await createVideo({...data});
               navigate(`/video/${createdVideo.data}`)
            }
    }
  return (
    <div className="min-h-screen bg-[#18151c] text-white p-4">
      <div className="max-w-3xl mx-auto border border-gray-600 rounded-md shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit(submit)} >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-600 px-4 py-3 bg-[#18151c]">
           
          <h2 className="text-lg font-semibold">Upload Videos</h2>

          <button type="submit" className="bg-[#ae7aff] hover:bg-[#c9a7fa] text-black font-semibold px-4 py-1 rounded shadow">
            Save
          </button>
        </div>
        {/* Body */}
        <div className="p-6">
          {/* Drag & Drop Area */}
          <div className="border-2 border-dashed border-gray-400 rounded-md p-8 flex flex-col items-center mb-8 bg-[#18151c]">
            {/* Upload Icon */}
            <div className="mb-4">
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="32" fill="#ae7aff" fillOpacity="0.2" />
                <path
                  d="M32 44V24M32 24l-8 8M32 24l8 8"
                  stroke="#ae7aff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="mb-1 font-semibold text-base text-white text-center">
              Drag and drop video files to upload
            </div>
            <div className="mb-4 text-sm text-gray-300 text-center">
              Your videos will be private until you publish them.
            </div>
            <Input
            type="file"
            label="Select Video File"
            {...register("videoFile")}
            />
            
          </div>
          {/* Thumbnail */}
          <div className="mb-5">
            <label htmlFor="thumbnail" className="block mb-1">
              Thumbnail<sup className="text-[#ae7aff]">*</sup>
            </label>
            <Input
              type="file"
              label="Select thumbnail"
              className="block w-full border border-gray-600 bg-[#18151c] px-2 py-1 rounded file:bg-[#ae7aff] file:text-black file:font-semibold file:border-none file:px-4 file:py-1"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("thumbnail")}
            />
          </div>
          {/* Title */}
          <div className="mb-5">
           
            <Input
              type="text"
              label="Title"
              className="block w-full border border-gray-600 bg-[#18151c] px-2 py-1 rounded"
              {...register("title")}
            />
          </div>
          {/* Description */}
          <div>
           
          <Input
            type="text"
            label="Desciption"
            className="block w-full border border-gray-600 bg-[#18151c] px-2 py-1 rounded resize-none"
            {...register("description")}
            />
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
