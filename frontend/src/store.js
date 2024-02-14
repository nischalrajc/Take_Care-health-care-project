import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './Slices/adminSlice'
import userReducer from './Slices/userSlice'

export const store = configureStore({
    reducer:{
        admin:adminReducer,
        user:userReducer
    }
})

