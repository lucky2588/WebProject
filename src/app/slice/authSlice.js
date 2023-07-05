import { createSlice } from "@reduxjs/toolkit"
import { authApi } from "../service/authApi"
import {  getData, setData } from "../../untils/localStorageUntil";

const defaultState = {
    auth: null,
    token: null,
    isAuthenticated: false
}

const initialState = getData("authData")
    ? getData("authData")
    : defaultState

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => { // action type : auth/logout
            state = defaultState;
            // lưu vào trong localStorage
            setData("authData", state)
            return state;
        },
        setEmail: (state, action) => {
            state.auth.email = action.payload;
            setData("authData", state);
          },
          setName: (state, action) => {
            state.auth.name = action.payload;
            setData("authData", state);
          },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.auth = action.payload.auth;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.isAuthenticated;
            // lưu vào trong localStorage
            setData("authData", state)
        })
    }
});

export const {logout,setEmail , setName} = authSlice.actions

export default authSlice.reducer