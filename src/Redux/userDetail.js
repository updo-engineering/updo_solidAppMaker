import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';

export const userDetailsSlice = createSlice({
    name: 'UserDetail',
    initialState: {
        auth: false,
        token: '',
        ref: '',
        type: '',
        defaultCardID: '',
        user: {},
        appointmentData: {},
        profile:{
            type:'',
            phone:'',
            countryCode:'',
            isCustomer:true

        },
        location:{
            location:'Location',
            lat:'',
            lon:''
        },
        socialLinks:[{media_type:'Instagram',link:''},{media_type:'Facebook',link:''},{media_type:'Twitter',link:''},{media_type:'TikTok',link:''}],
        serv_provide:{
            serv_provide_1:{},
            serv_provide_2:{},
            serv_provide_3:{},
            serv_provide_4:{},
            newData:{},
            
        }
    },
    reducers: {
        SetAuth: (state, action) => {
            state.auth = action.payload;
        },
        SetDefaultCardID: (state, action) => {
            state.defaultCardID = action.payload;
        },
        SetToken: (state, action) => {
            state.token = action.payload;
        },
        SetRef: (state, action) => {
            state.ref = action.payload;
        },
        SetType: (state, action) => {
            state.type = action.payload;
        },
        SetUser: (state, action) => {
            state.user = action.payload;
        },
        setLocation:(state,action)=>{
            state.location = action.payload
        },
        setSocialLinks:(state,action)=>{
            state.socialLinks = action.payload
        },
        setProfile:(state,action)=>{
            state.profile = action.payload
        },
        setServProv:(state,action)=>{
            state.serv_provide = action.payload
        },
        setAppointmentData:(state,action)=>{
            state.appointmentData = action.payload
        }
    },
});

export const {
    SetAuth,
    SetDefaultCardID,
    SetType,
    SetRef,
    SetToken,
    SetUser,
    setLocation,
    setProfile,
    setSocialLinks,
    setServProv,
    setAppointmentData
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
