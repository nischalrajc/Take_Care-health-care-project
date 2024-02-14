import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './Slices/adminSlice'
import userReducer from './Slices/userSlice'
import doctorReducer from './Slices/doctorSlice'

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,
        doctor: doctorReducer
    }
})

