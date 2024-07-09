import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ getProduct, product, colorOptions, images, onAddToCart }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getProduct(id);
    }, [id, getProduct]);

    const [formData, updateFormData] = React.useState({
        quantity: 1,
        size: 'XXS'
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const quantity = formData.quantity;
        const size = formData.size;
        onAddToCart(product.id, quantity, size, navigate)
    }

    return (
        <div>
            <p>{product.title}</p>
            <p>{product.fullPrice}</p>
            <p>{product.discountPrice}</p>
            <p>{product.description}</p>
            <p>{product.descriptionDetails}</p>
            <p>{product.washingInstructions}</p>
            <p>{product.clothingCategory}</p>
            <p>{product.personCategory}</p>

            <form onSubmit={onFormSubmit}>
                <input type="number" min={1} name="quantity" onChange={handleChange}/>
                <select name="size" onChange={handleChange}>
                    <option value={"XXS"}>XXS</option>
                    <option value={"XS"}>XS</option>
                    <option value={"S"}>S</option>
                    <option value={"M"}>M</option>
                    <option value={"L"}>L</option>
                    <option value={"XL"}>XL</option>
                    <option value={"XXL"}>XXL</option>
                </select>
                <button type="submit">Add To Cart</button>
            </form>

            <hr />
            <p>COLOR OPTIONS</p>

            {colorOptions && colorOptions.map(option => (
                <div key={option.id}>
                    <p>{option.code}</p>
                    <p>{option.color}</p>
                    <img src={option.thumbnailUrl} alt="color-thumbnail" style={{ width: '50px', height: '50px' }} />
                    <p>{option.modelSize}</p>

                    {images && images.filter(img => img.colorOption.id === option.id).map(img => (
                        <div key={img.id}>
                            <img src={img.imageUrl} alt="product-img" style={{ width: '100px', height: '100px' }} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
export default ProductDetails;