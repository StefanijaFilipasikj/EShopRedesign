import React, {useEffect, useRef, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ShoppingCart.css'
import edit from '../../images/edit.png'
import delete_img from '../../images/delete.png'

const ShoppingCart = ({ getShoppingCart, shoppingCart, editProductInCart, onRemoveProduct, productColorOptions, productImages }) => {
    const navigate = useNavigate();
    const { username } = useParams();

    useEffect(() => {
        getShoppingCart(username);
    }, [username, getShoppingCart]);

    const [formData, updateFormData] = useState({});

    useEffect(() => {
        if (shoppingCart.products) {
            const initialFormData = shoppingCart.products.reduce((acc, p) => {
                acc[p.id] = {
                    productId: p.product.id,
                    quantity: p.quantity,
                    size: p.size || ''
                };
                return acc;
            }, {});
            updateFormData(initialFormData);
        }
    }, [shoppingCart]);

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        updateFormData((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [name]: value.trim()
            }
        }));
    }

    const onFormSubmit = (e, id) => {
        e.preventDefault();
        const { productId, quantity, size } = formData[id];
        editProductInCart(id, productId, quantity, size, navigate);
    }

    let total = shoppingCart.products?.map((p) => p.quantity * (p.product.discountPrice != 0.0 ? p.product.discountPrice : p.product.fullPrice)).reduce((sum, price) => sum + price, 0) || 0.0;
    let count = shoppingCart.products?.map(p => p.quantity).reduce((sum, quantity) => sum + quantity, 0);

    //for box-shadow to be on top of image
    const cartRefs = useRef([]);
    useEffect(() => {
        cartRefs.current.forEach((cards, index) => {
            if (cards) {
                cards.style.zIndex = 1000 - index; // Adjust z-index dynamically
                const img = cards.querySelector('.cart-img');
                if (img) {
                    img.style.zIndex = 1000 - index - 1; // Ensure image z-index is always less
                }
            }
        });
    }, [shoppingCart.products]);

    return (
        <div className={"row m-4 p-1"}>
            <div className={"col-8"}>
                {shoppingCart.products?.map((p, index) => {
                    const colorOption = productColorOptions.find(c => c.color.id == p.colorOption.colorId && c.product.id == p.product.id);
                    const imageUrl = productImages.find(img => img.colorOption.id == colorOption.id)?.imageUrl;

                    return(
                        <div className={"cards me-5 position-relative"} ref={i => cartRefs.current[index] = i}>
                            <button className={"btn-close-absolute"} type="button" onClick={() => onRemoveProduct(p.id, navigate)}>&#10005;</button>
                            <div className={"row d-flex align-items-center"}>
                                <div className={"col-4"}>
                                    <img className={"cart-img"} src={imageUrl} alt={"Product img"}/>
                                </div>
                                <div className={"col-8"}>
                                    <div className={"row"}>
                                        <div className={"col-6 mt-2 me-3 align-self-center"}>
                                            <div>
                                                <h5>{p.product.title}</h5>
                                                <p className={"code"}>{p.colorOption.code}</p>
                                            </div>
                                            <div className={"mt-4"}>
                                                <h6 className={"d-inline"}>Color: <strong>{colorOption.color.color}</strong></h6>,&nbsp;
                                                <h6 className={"d-inline"}>Size: <strong>{p.size}</strong></h6>,&nbsp;
                                                <h6 className={"d-inline"}>Quantity: <strong>{p.quantity}</strong></h6>
                                            </div>
                                        </div>
                                        <div className={"col mt-2 align-self-center"}>
                                            <form onSubmit={(e) => onFormSubmit(e, p.id)}>
                                                <input type="hidden" name="productId" value={p.product.id}/>
                                                <div className="form-group d-flex mb-2">
                                                    <label htmlFor={"quantity"} className={"form-label me-3 align-self-center col-3"}>Quantity: </label>
                                                    <input className={"form-control"} type="number" min={1} name="quantity" id={"quantity"} value={formData[p.id]?.quantity || ''} onChange={(e) => handleChange(e, p.id)}/>
                                                </div>
                                                <div className="form-group d-flex mb-2">
                                                    <label htmlFor={"size"} className={"form-label me-3 align-self-center col-3"}>Size: </label>
                                                    <select className={"form-control"} name="size" id={"size"} value={formData[p.id]?.size || ''} onChange={(e) => handleChange(e, p.id)}>
                                                        <option value="XXS">XXS</option>
                                                        <option value="XS">XS</option>
                                                        <option value="S">S</option>
                                                        <option value="M">M</option>
                                                        <option value="L">L</option>
                                                        <option value="XL">XL</option>
                                                        <option value="XXL">XXL</option>
                                                    </select>
                                                </div>
                                            </form>
                                            <button type={"submit"} className={"btn btn-dark"}
                                                    onClick={(e) => onFormSubmit(e, p.id)}><span
                                                className={"fa fa-edit"}></span> Edit Item
                                            </button>
                                        </div>
                                        <div className={"col mt-2 text-center align-self-center"}>
                                            <p className={"price"}>{p.quantity * (p.product.discountPrice != 0.0 ? p.product.discountPrice : p.product.fullPrice)}€</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
            <div className={"col-4 order-summary mx-4 p-3"}>
                <h3 className={"m-2"}><strong>Order Summary</strong></h3>
                <hr/>
                <h5>Item count: {count}</h5>
                <h5>Total price: {total.toFixed(2)}€</h5>
                <a className={"btn btn-dark mt-2"} href={"#"}>Pay</a>
            </div>
        </div>
    );
};
export default ShoppingCart;