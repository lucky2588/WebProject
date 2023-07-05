import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/user"
export const userApi = createApi({
    reducerPath: "brandApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
    
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (email) => `getUser?email=${email}`
        }),
        getFavorites: builder.query({
            query: (email) => `findFavorites?email=${email}`
        }),
    }),

});

export const {useGetUserQuery,useLazyGetUserQuery,useLazyGetFavoritesQuery,useGetFavoritesQuery} = userApi;