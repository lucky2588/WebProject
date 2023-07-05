import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/public"
export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: ({ page, pageSize } = { page: 0, pageSize: 6 }) => `getBlogs?page=${page}&pageSize=${pageSize}`
        }),
        getBlogById: builder.query(
            {
                query: (blogId) => `blog/${blogId}`
            }
        ),
        getBlogView: builder.query(
            {
                query: () => "blog/topView"
            }
        ),
        getCommentBlog: builder.query(
            {
                query: (blogId)=> `commentBlog/${blogId}`
            }
        ),
        getBlogWithBrand : builder.query(
            {
                query: ({blogId,brandId})=> `findBrand/${blogId}/${brandId}`
            }
        ),
        getProductWithBrand : builder.query(
            {
                query: (brandId)=> `getProductForBlog/${brandId}`
            }
        ),


    }),

});

export const { useGetBlogsQuery, useLazyGetBlogsQuery, useGetBlogByIdQuery, useGetBlogViewQuery,useLazyGetCommentBlogQuery,useGetBlogWithBrandQuery,useGetProductWithBrandQuery} = blogApi;