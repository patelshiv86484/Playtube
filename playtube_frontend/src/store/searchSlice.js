import { createSlice } from "@reduxjs/toolkit";
const initialState={
    text:null
}

const authSlice=createSlice({
    name:"search",
   initialState,
   reducers:{
    insert:(state,action)=>{
        state.text=action.payload
    },
    erase:(state)=>{
        state.text=null;
    } 

   }  
})

export const {insert,erase} =authSlice.actions
export default authSlice.reducer  //only for store.js