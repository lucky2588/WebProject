import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/order"
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
            query: (id) => `myOrder/${id}`
        }),
        getProductSimilar: builder.query({
            query: (id) => `ProductSimilarInOrder/${id}`
        }),
        getPayment: builder.query({
            query: (id) => `getPayment/${id}`
        }),
        getBillbyId: builder.query({
            query: (orderId) => `getOrder/${orderId}`
        }),
        getMyBill: builder.query({
            query: (id) => `getMyBill/${id}`
        }),
    }),

});

export const {useGetMyOrderQuery,useLazyGetMyOrderQuery,useGetProductSimilarQuery,useGetBillbyIdQuery,useLazyGetMyBillQuery,useGetMyBillQuery,useGetPaymentQuery} = orderApi;