import {Component} from "react";
import EShopService from "../../repository/EShopRepository";
import Products from "../Product/ProductList/ProductList";
import ProductDetails from "../Product/ProductDetails/ProductDetails";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Home from "../Home/Home";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            products: [],
            productColorOptions: [],
            productImages: [],
            colors: [],
            selectedProduct: {},
            selectedProductColorOptions: [],
            selectedProductImages: [],
            selectedShoppingCart: {},
            categoriesWomen: [],
            categoriesMen: [],
            categoriesGirls: [],
            categoriesBoys: [],
            selectedPerson: {},
            selectedClothing: {},
            dataLoaded: false,
            username: null,
        }
    }
    render() {
        if (!this.state.dataLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <Router>
                <div className={"min-vh-100 d-flex flex-column justify-content-between"}>
                    <Header username={this.state.username} women={this.state.categoriesWomen} men={this.state.categoriesMen} girls={this.state.categoriesGirls} boys={this.state.categoriesBoys} onFilter={this.filterProductsByPersonAndClothingCategory} searchProducts={this.searchProducts}/>
                    <Routes>
                        <Route path={'/products'} element={<Products products={this.state.products} productColorOptions={this.state.productColorOptions} productImages={this.state.productImages} colors={this.state.colors} onDetails={this.getProduct} onFilterPrice={this.filterPrice} onFilterColors={this.filterColors} onFilterCustom={this.filterCustom} clearFilters={this.clearFilters}/>}></Route>
                        <Route path={'/products/:person'} element={<Products products={this.state.products} productColorOptions={this.state.productColorOptions} productImages={this.state.productImages} colors={this.state.colors} onDetails={this.getProduct} onFilter={this.filterProductsByPersonAndClothingCategory} onFilterPrice={this.filterPrice} onFilterColors={this.filterColors} onFilterCustom={this.filterCustom} clearFilters={this.clearFilters}/>}></Route>
                        <Route path={'/products/:person/:category'} element={<Products products={this.state.products} productColorOptions={this.state.productColorOptions} productImages={this.state.productImages} colors={this.state.colors} onDetails={this.getProduct} onFilter={this.filterProductsByPersonAndClothingCategory} onFilterPrice={this.filterPrice} onFilterColors={this.filterColors} onFilterCustom={this.filterCustom} clearFilters={this.clearFilters}/>}></Route>
                        <Route path={'/product/:id'} element={<ProductDetails product={this.state.selectedProduct} colorOptions={this.state.selectedProductColorOptions} images={this.state.selectedProductImages} getProduct={this.getProduct} onAddToCart={this.addToCart}/>}></Route>
                        <Route path={'/shopping-cart/:username'} element={<ShoppingCart shoppingCart={this.state.selectedShoppingCart} productColorOptions={this.state.productColorOptions} productImages={this.state.productImages} getShoppingCart={this.getShoppingCart} editProductInCart={this.editProductInCart} onRemoveProduct={this.removeProduct} clearShoppingCart={this.clearShoppingCart}/>}></Route>
                        <Route path={"/login"} element={<Login refreshUsername={this.loadUsername}/>}/>
                        <Route path='/register' element={<Register roles={this.state.roles}/>}/>
                        <Route path={'/'} element={<Home/>}></Route>
                    </Routes>
                </div>
                <Footer/>
            </Router>
        )
    }
    loadProducts = () => {
        EShopService.getAllProducts()
            .then((data) => {
                this.setState({
                    products: data.data
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadUsername = () => {
        EShopService.getUserUsername()
            .then(resp => {
                this.setState({
                    username: resp.data
                });
            }).catch((error) => {
            console.log(error)
        });
    }

    searchProducts = (term) => {
        EShopService.searchProducts(term)
            .then((data) => {
                this.setState({
                    products: data.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    loadProductColorOptions = () => {
        EShopService.getAllProductColorOptions()
            .then((data) => {
                this.setState({
                    productColorOptions: data.data
                });
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
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadColors = () => {
        EShopService.getAllColors()
            .then((data) => {
                this.setState({
                    colors: data.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadRoles = () => {
        EShopService.getAllRoles()
            .then((data) => {
                this.setState({
                    roles: data.data
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
                    });
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

    clearShoppingCart = (username) => {
        EShopService.clearShoppingCart(username)
            .then(() => {
                this.getShoppingCart(username);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    addToCart = (productId, colorOptionId, quantity, size, navigate) => {
        EShopService.addProductToShoppingCart(this.state.username, productId, colorOptionId, quantity, size)
            .then((data) => {
                this.loadData();
                navigate(`/shopping-cart/${this.state.username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    editProductInCart = (id, productId, quantity, size, navigate) => {
        EShopService.editProductInShoppingCart(id, this.state.username, productId, quantity, size)
            .then((data) => {
                this.getShoppingCart(this.state.username);
                navigate(`/shopping-cart/${this.state.username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    removeProduct = (id, navigate) => {
        EShopService.removeProductFromShoppingCart(id)
            .then((data) => {
                this.getShoppingCart(this.state.username);
                navigate(`/shopping-cart/${this.state.username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadCategories = () => {
        EShopService.getAllCategoriesForPerson("women")
            .then((data) => {
                this.setState({
                    categoriesWomen: data.data
                })
            })
        EShopService.getAllCategoriesForPerson("men")
            .then((data) => {
                this.setState({
                    categoriesMen: data.data
                })
            })
        EShopService.getAllCategoriesForPerson("girls")
            .then((data) => {
                this.setState({
                    categoriesGirls: data.data
                })
            })
        EShopService.getAllCategoriesForPerson("boys")
            .then((data) => {
                this.setState({
                    categoriesBoys: data.data
                })
            })
    }

    filterProductsByPersonAndClothingCategory = (person, clothing) => {
        this.state.selectedPerson = person;
        if(clothing === '/'){
            EShopService.filterProductsByPersonCategory(person)
                .then((data) => {
                    this.setState({
                        products: data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                });
        }else{
            this.state.selectedClothing = clothing;
            EShopService.filterProductsByPersonAndClothingCategory(person, clothing)
                .then((data) => {
                    this.setState({
                        products: data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    filterPrice = (min, max) => {
        let person = Object.keys(this.state.selectedPerson).length === 0 ? 'ALL' : this.state.selectedPerson;
        let clothing = Object.keys(this.state.selectedClothing).length === 0 ? 'ALL' : this.state.selectedClothing;
        EShopService.filterProductsByPrice(person, clothing, min, max)
            .then((data) => {
                this.setState({
                    products: data.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    filterColors = (colors) => {
        let person = Object.keys(this.state.selectedPerson).length === 0 ? 'ALL' : this.state.selectedPerson;
        let clothing = Object.keys(this.state.selectedClothing).length === 0 ? 'ALL' : this.state.selectedClothing;
        EShopService.filterProductsByColor(person, clothing, colors)
            .then((data) => {
                this.setState({
                    products: data.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    filterCustom = (person, clothing, length, sleeves, neckline, waist, fit) => {
        EShopService.filterProductsByCustom(person, clothing, length, sleeves, neckline, waist, fit)
            .then((data) => {
                this.setState({
                    products: data.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    clearFilters = () => {
        const currentPath = window.location.pathname;

        if (currentPath.includes('/women')) {
            EShopService.filterProductsByPersonCategory('WOMEN')
                .then((data) => {
                    this.setState({ products: data.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (currentPath.includes('/men')) {
            EShopService.filterProductsByPersonCategory('MEN')
                .then((data) => {
                    this.setState({ products: data.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (currentPath.includes('/girls')) {
            EShopService.filterProductsByPersonCategory('GIRLS')
                .then((data) => {
                    this.setState({ products: data.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            EShopService.getAllProducts()
                .then((data) => {
                    this.setState({ products: data.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


    loadData = () => {
        Promise.all([this.loadProducts(), this.loadProductColorOptions(), this.loadProductImages(), this.loadCategories(), this.loadColors(), this.loadRoles(), this.loadUsername()])
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