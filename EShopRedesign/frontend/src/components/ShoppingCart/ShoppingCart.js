import React, { useEffect, useState } from "react";
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

    let total = shoppingCart.products?.map((p) => p.quantity * p.product.fullPrice).reduce((acc, current) => acc + current, 0) || 0.0;
    let count = shoppingCart.products?.length;

    return (
        <div className={"row"}>
            <div className={"col-8"}>
                {shoppingCart.products?.map(p => {
                    const colorOption = productColorOptions.find(c => c.color.id == p.colorOption.colorId && c.product.id == p.product.id);
                    const imageUrl = productImages.find(img => img.colorOption.id == colorOption.id)?.imageUrl;

                    return(
                        <div className={"cards mt-1"}>
                            <div className={"row d-flex align-items-center"}>
                                <div className={"col-4"}>
                                    <img className={"cart-img m-2"} src={imageUrl} alt={"Product img"} />
                                </div>
                                <div className={"col-8"}>
                                    <div className={"row"}>
                                        <div className={"col-4 mt-2"}>
                                            <div>
                                                <h5>{p.product.clothingCategory}</h5>
                                                <p className={"code"}>{p.colorOption.code}</p>
                                            </div>
                                            <div className={"mt-4"}>
                                                <h6>Color: <strong>{colorOption.color.color}</strong></h6>
                                            </div>
                                        </div>
                                        <div className={"col-4 mt-2"}>
                                            <form onSubmit={(e) => onFormSubmit(e, p.id)}>
                                                <input type="hidden" name="productId" value={p.product.id} />
                                                <div className="form-group">
                                                    <label htmlFor={"quantity"} className={"form-label"}>Quantity</label>
                                                    <input className={"form-control"} type="number" min={1} name="quantity" id={"quantity"} value={formData[p.id]?.quantity || ''} onChange={(e) => handleChange(e, p.id)} />
                                                </div>
                                                <div className="form-group mt-4">
                                                    <label htmlFor={"size"} className={"form-label"}>Size</label>
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
                                        </div>
                                        <div className={"col-4 mt-2 text-center"}>
                                            <p className={"price"}>{p.product.fullPrice}</p>
                                            <div className="button-container justify-content-center">
                                                <button type="submit" onClick={(e) => onFormSubmit(e, p.id)}><img className={"button-img"} src={edit} alt={"edit img"}/></button>
                                                <button type="button" onClick={() => onRemoveProduct(p.id, navigate)}><img className={"button-del-img"} src={delete_img} alt={"delete img"}/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
            <div className={"col order-summary m-4 p-3"}>
                <h3 className={"m-2"}><strong>Order Summary</strong></h3>
                <hr/>
                <h5>Item count: {count}</h5>
                <h5>Total price: {total.toFixed(2)}€</h5>
                <a className={"btn btn-dark"} href={"#"}>Pay</a>
            </div>
        </div>
    );
};
export default ShoppingCart;