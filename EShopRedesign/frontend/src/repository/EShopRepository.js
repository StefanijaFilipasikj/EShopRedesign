import axios from "../custom-axios/axios";

const EShopService = {
    getAllProducts: () => {
        return axios.get("/products");
    },
    getAllProductColorOptions: () => {
        return axios.get("/product-color-options");
    },
    getAllProductImages: () => {
        return axios.get("/product-images");
    },
    getProduct: (id) => {
        return axios.get(`/products/${id}`);
    },
    getShoppingCart: (username) => {
        return axios.get(`/shopping-cart/${username}`)
    },
    addProductToShoppingCart: (username, productId, quantity, size) => {
        return axios.post("/shopping-cart/add-product", {
            "username": username,
            "productId": productId,
            "quantity": quantity,
            "size": size
        });
    },
    editProductInShoppingCart: (id, username, productId, quantity, size) => {
        return axios.put(`/shopping-cart/edit-product/${id}`, {
            "username": username,
            "productId": productId,
            "quantity": quantity,
            "size": size
        });
    },
    removeProductFromShoppingCart: (id) => {
        return axios.delete(`/shopping-cart/remove-product/${id}`);
    }
}
export default EShopService;