import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentDoctor : null,
    loading : false,
    error:false
}

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers : {
        signInStart : (state) =>{
            state.loading = true;
        },
        signInSuccess : (state,action) => {
            state.currentDoctor = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure : (state,action) =>{
            state.loading = false;
            state.error = action.payload
        },
        updateDoctorStart : (state) =>{
            state.loading = true;
        },
        updateDoctorSuccess : (state,action) => {
            state.currentDoctor = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateDoctorFailure : (state,action) =>{
            state.loading = false;
            state.error = action.payload
        },
        deleteDoctorStart : (state) =>{
            state.loading = true;
        },
        deleteDoctorSuccess : (state) => {
            state.currentDoctor = null;
            state.loading = false;
            state.error = false;
        },
        deleteDoctorFailure : (state,action) =>{
            state.loading = false;
            state.error = action.payload
        },
        signOut : (state) => {
            state.currentDoctor = null;
            state.loading = false;
            state.error = false;
        }
    
    }
})

export const {signInStart,signInSuccess,signInFailure,updateDoctorStart,updateDoctorSuccess,updateDoctorFailure,deleteDoctorStart,deleteDoctorSuccess,deleteDoctorFailure,signOut} = doctorSlice.actions
export default doctorSlice.reducer