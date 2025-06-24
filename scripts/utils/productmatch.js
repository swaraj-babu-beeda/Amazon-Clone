import { products } from "../../data/productsalt.js";

export function productMatch(product) {
    let matchedProduct = null;

    products.forEach(pro => {
        if (product == pro.id) {
            matchedProduct = { 
                id: pro.id,
                image: pro.image,
                name: pro.name 
            };
        }
    });

    return matchedProduct; 
}