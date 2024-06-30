import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword,pageNumber}) => ({
                url: PRODUCTS_URL,
                params:{
                    pageNumber,
                    keyword
                }
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["Products"]
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["Products"]
        }),
        createProduct: builder.mutation({
            query: ()=> ({
                url: PRODUCTS_URL,
                method: "POST"
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation({
            query: (data)=> ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method:"PUT",
                body:data   
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: builder.mutation({
            query: (productId)=> ({
                url: `${PRODUCTS_URL}/${productId}`,
                method:"DELETE"            
            })
        }),
        createReviews: builder.mutation({
            query: (data)=> ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method:"POST",
                body: data
            }),
            invalidatesTags:["Products"]
        }),
        getTopProducts: builder.query({
            query: ()=> ({
                url: `${PRODUCTS_URL}/top`
            }),
            keepUnusedDataFor:5
        })
    })
});

export const {useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useCreateReviewsMutation, useGetTopProductsQuery} = productApiSlice;