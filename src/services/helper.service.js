import React from "react";

export const BASE_URL = `http://localhost:9090`;

export const Product_Pages = 10;

// making info useble for image
export const getProductImageUrl = (productId)=>{

    return `${BASE_URL}/products/image/${productId}`;
}