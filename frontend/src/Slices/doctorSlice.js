import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        doctor: localStorage.getItem('doctorInfo') ? JSON.parse(localStorage.getItem('doctorInfo')) : null
    },
    reducers: {
        doctorLogin: (state, action) => {
            state.doctor = action.payload
            localStorage.setItem('doctorInfo', JSON.stringify(action.payload))
        },
        doctorLogout: (state) => {
            state.doctor = null;
            localStorage.removeItem('doctorInfo');
        }
    }
})

export const { doctorLogin, doctorLogout } = doctorSlice.actions

export default doctorSlice.reducer;