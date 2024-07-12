import {Component} from "react";
import EShopService from "../../repository/EShopRepository";
import Products from "../Product/ProductList";
import ProductDetails from "../Product/ProductDetails";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productColorOptions: [],
            productImages: [],
            selectedProduct: {},
            selectedProductColorOptions: [],
            selectedProductImages: [],
            selectedShoppingCart: {},
            dataLoaded: false
        }
    }
    render() {
        if (!this.state.dataLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <Router>
                <Header/>
                <Routes>
                    <Route path={'/products'} element={<Products products={this.state.products} productColorOptions={this.state.productColorOptions} productImages={this.state.productImages} onDetails={this.getProduct}/>}></Route>
                    <Route path={'/product/:id'} element={<ProductDetails product={this.state.selectedProduct} colorOptions={this.state.selectedProductColorOptions} images={this.state.selectedProductImages} getProduct={this.getProduct} onAddToCart={this.addToCart}/>}></Route>
                    <Route path={'/shopping-cart/:username'} element={<ShoppingCart shoppingCart={this.state.selectedShoppingCart} getShoppingCart={this.getShoppingCart} editProductInCart={this.editProductInCart} onRemoveProduct={this.removeProduct}/>}></Route>
                    <Route path={'/'} element={<Products products={this.state.products} productColorOptions={this.state.productColorOptions} productImages={this.state.productImages} onDetails={this.getProduct}/>}></Route>
                </Routes>
                <Footer/>
            </Router>
        )
    }
    loadProducts = () => {
        EShopService.getAllProducts()
            .then((data) => {
                this.setState({
                    products: data.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadProductColorOptions = () => {
        EShopService.getAllProductColorOptions()
            .then((data) => {
                this.setState({
                    productColorOptions: data.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadProductImages = () => {
        EShopService.getAllProductImages()
            .then((data) => {
                this.setState({
                    productImages: data.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getProduct = (id) => {
        if (this.state.dataLoaded) {
            EShopService.getProduct(id)
                .then((data) => {
                    this.setState({
                        selectedProduct: data.data,
                        selectedProductColorOptions: this.state.productColorOptions.filter(option => option.product.id == id),
                        selectedProductImages: this.state.productImages.filter(img => this.state.selectedProductColorOptions.some(option => option.id == img.colorOption.id))
                    })
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            console.log("Data not loaded yet");
        }
    }

    getShoppingCart = (username) => {
        EShopService.getShoppingCart(username)
            .then((data) => {
                this.setState({
                    selectedShoppingCart: data.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    addToCart = (productId, quantity, size, navigate) => {
        // default for now
        let username = "user";
        EShopService.addProductToShoppingCart(username, productId, quantity, size)
            .then((data) => {
                this.loadData();
                navigate(`/shopping-cart/${username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    editProductInCart = (id, productId, quantity, size, navigate) => {
        // default for now
        let username = "user";
        EShopService.editProductInShoppingCart(id, username, productId, quantity, size)
            .then((data) => {
                this.getShoppingCart(username);
                navigate(`/shopping-cart/${username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    removeProduct = (id, navigate) => {
        // default for now
        let username = "user";
        EShopService.removeProductFromShoppingCart(id)
            .then((data) => {
                this.getShoppingCart(username);
                navigate(`/shopping-cart/${username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadData = () => {
        Promise.all([this.loadProducts(), this.loadProductColorOptions(), this.loadProductImages()])
            .then(() => {
                this.setState({ dataLoaded: true });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.loadData();
    }
}
export default App;