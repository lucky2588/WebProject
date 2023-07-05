import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/auth"
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl:baseUrl }),
    endpoints: (builder) => ({
        confirmUser : builder.query({
            query: (data)=> `confirmToken/${data}` ,
         }),
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data
            }),
        })
    }),
    
});

export const {useConfirmUserQuery,useLoginMutation,useRegisterMutation} = authApi;