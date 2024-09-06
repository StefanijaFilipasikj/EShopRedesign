import axios from "../custom-axios/axios";

const EShopService = {
    login: (username, password) => {
        return axios.post("/login", {
            "username": username,
            "password": password
        })
    },
    register: (username, password, repeatPassword, role) => {
        return axios.post("/user/register", {
            "username": username,
            "password": password,
            "repeatPassword": repeatPassword,
            "role": role
        })
    },
    getUserRole: () => {
        return axios.get("/user/role")
    },
    getUserUsername: () => {
        return axios.get("/user/username")
    },
    getAllRoles: () => {
        return axios.get("/user/roles")
    },
    getAllProducts: () => {
        return axios.get("/products");
    },
    getAllProductColorOptions: () => {
        return axios.get("/product-color-options");
    },
    getAllProductImages: () => {
        return axios.get("/product-images");
    },
    getAllColors: () => {
        return axios.get("/colors");
    },
    getProduct: (id) => {
        return axios.get(`/products/${id}`);
    },
    getShoppingCart: (username) => {
        return axios.get(`/shopping-cart/${username}`)
    },
    addProductToShoppingCart: (username, productId, colorOptionId, quantity, size) => {
        return axios.post("/shopping-cart/add-product", {
            "username": username,
            "productId": productId,
            "colorOptionId" : colorOptionId,
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
    },
    getAllCategoriesForPerson: (person) => {
        return axios.get(`/products/categories/${person}`)
    },
    filterProductsByPersonCategory: (person) => {
        return axios.get(`/products/filter/${person}`)
    },
    filterProductsByPersonAndClothingCategory: (person, clothing) => {
        return axios.get(`/products/filter/${person}/${clothing}`)
    },
    filterProductsByPrice: (person, clothing, min, max) => {
        return axios.put(`/products/filter-price/${person}/${clothing}`, {
            "min": min,
            "max": max
        });
    },
    filterProductsByColor: (person, clothing, colors) => {
        return axios.put(`/products/filter-color/${person}/${clothing}`, {
            "colors": colors
        });
    },
    filterProductsByCustom: (person, clothing, length, sleeves, neckline, waist, fit) => {
        return axios.put(`/products/filter-custom/${person}/${clothing}`, {
            "length": length,
            "sleeves": sleeves,
            "neckline": neckline,
            "waist": waist,
            "fit": fit,
        });
    },
    searchProducts: (query) =>{
        return axios.get(`/products/search`, {
            params: { query }
        });
    },
    clearShoppingCart: (cartId) => {
        return axios.delete(`/shopping-cart/clear/${cartId}`);
    },

}
export default EShopService;