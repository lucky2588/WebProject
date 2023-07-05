import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/public"
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({content, page, pageSize } = { page: 0, pageSize: 8 }) => `getProducts/${content}?page=${page}&pageSize=${pageSize}`
        }),
        getProductById: builder.query({
            query: (productId) => `getProduct/${productId}`
        }),
        getProductComment: builder.query({
            query: (productId) => `getCommentProduct/${productId}`
        }),
        getProductSimilar: builder.query({
            query: ({productId,brandId}) => `getProductSimilar/${productId}/${brandId}`
        }),
        searchProduct: builder.query({
            query: ({keyword,page,pageSize}) => `searchProduct?title=${keyword}&page=${page}&pageSize=${pageSize}`
        }),
        getProductFilter: builder.query({
            query: ({brandId , categoryId ,price,option,page, pageSize } = { page: 0, pageSize: 5 }) => `getProductsFilter?brandId=${brandId}&categoryId=${categoryId}&price=${price}&option=${option}&page=${page}&pageSize=${pageSize}`
        }),
        getBrandForCategory : builder.query(
            {
                query: (categoryId) => `getBrandformCategory/${categoryId}`
            }
        ),
        getProductFilterByCategory: builder.query({
            query: ({brandId , categoryId, page, pageSize } = { page: 0, pageSize: 5 }) => `ProductAboutCategory?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`
        }),   
        getTopProductView : builder.query(
            {
                query: () => "getProductTopView"
            }
        ),
        getTopProductBestSeller : builder.query(
            {
                query: () => "getProductTopSeller"
            }
        ),
    }),
});

export const {useGetProductByIdQuery,useLazyGetProductCommentQuery,useLazySearchProductQuery,useGetProductSimilarQuery,useGetProductsQuery,useGetProductCommentQuery,useGetBrandForCategoryQuery,useLazyGetProductsQuery,useLazyGetProductFilterByCategoryQuery,useLazyGetProductFilterQuery,useGetTopProductBestSellerQuery,useGetTopProductViewQuery} = productApi;