import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/user"
export const orderApi = createApi({
    reducerPath: "orderApi",
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
        getMyOrder: builder.query({
            query: (email) => `myOrder/${email}`
        }),
        getProductSimilar: builder.query({
            query: (email) => `ProductSimilarInOrder/${email}`
        }),
        getPayment: builder.query({
            query: (paymentId) => `getPayment/${paymentId}`
        }),
        getBillbyId: builder.query({
            query: (orderId) => `getOrder/${orderId}`
        }),
        getMyBill: builder.query({
            query: (email) => `getMyBill/${email}`
        }),
        
     
    }),

});

export const {useGetMyOrderQuery,useLazyGetMyOrderQuery,useGetProductSimilarQuery,useGetBillbyIdQuery,useGetMyBillQuery,useGetPaymentQuery} = orderApi;