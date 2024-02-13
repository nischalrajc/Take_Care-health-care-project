import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './Slices/adminSlice'


export const store = configureStore({
    reducer:{
        admin:adminReducer
    }
})

