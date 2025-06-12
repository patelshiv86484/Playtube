import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js"
import searchSlice from "./searchSlice.js"
const store=configureStore({
    reducer:{
        auth:authSlice,
        search:searchSlice,
    }
})

export default store