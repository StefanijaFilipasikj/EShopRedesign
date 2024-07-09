import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ShoppingCart = ({ getShoppingCart, shoppingCart, editProductInCart, onRemoveProduct }) => {
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

    let total = shoppingCart.products && shoppingCart.products.map((p) => p.quantity * p.product.fullPrice).reduce((acc, current) => acc + current, 0);

    return (
        <div>
            <h1>Shopping Cart for {username}</h1>
            <h2>{shoppingCart.id}</h2>
            <table className={"table"}>
                <thead>
                <tr>
                    <th scope={"col"}>Product</th>
                    <th scope={"col"}>Price</th>
                    <th scope={"col"}>Quantity and Size</th>
                    <th scope={"col"}></th>
                    <th scope={"col"}></th>
                </tr>
                </thead>
                <tbody>
                {shoppingCart.products && shoppingCart.products.map((p) => (
                    <tr key={p.id}>
                        {p.product && (
                            <>
                                <td>id: {p.product.id}, {p.product.title}</td>
                                <td>{p.product.fullPrice}</td>
                                <td>
                                    <form onSubmit={(e) => onFormSubmit(e, p.id)}>
                                        <input type="hidden" name="productId" value={p.product.id}/>
                                        <input type="number" min={1} name="quantity" value={formData[p.id]?.quantity || ''} onChange={(e) => handleChange(e, p.id)} />
                                        <select name="size" value={formData[p.id]?.size || ''} onChange={(e) => handleChange(e, p.id)}>
                                            <option value="XXS">XXS</option>
                                            <option value="XS">XS</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                        <button type="submit">Change</button>
                                    </form>
                                </td>
                                <td>
                                    <button onClick={() => onRemoveProduct(p.id, navigate)}>Remove from cart</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            <p>Total price: {total}</p>
        </div>
    );
};
export default ShoppingCart;