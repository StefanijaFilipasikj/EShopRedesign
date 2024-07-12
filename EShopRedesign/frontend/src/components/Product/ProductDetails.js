import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css'
import tshirt from '../../images/tshirt.png'
import washing_machine from '../../images/washing-machine.png'

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

    const [expandedSections, setExpandedSections] = useState({
        product_details: false,
        washing_instructions: false,
    });


    const toggleExpand = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <div className={"row m-3"}>
            <div className="col-lg-7">
                <div className="row img-container">
                    {colorOptions &&
                        colorOptions.map((option) => (
                            <React.Fragment key={option.id}>
                                {images &&
                                    images
                                        .filter((img) => img.colorOption.id === option.id)
                                        .map((img) => (
                                            <div key={img.id} className="col-lg-6 col-md-6 col-sm-6 mb-2">
                                                <div className="img-wrapper">
                                                    <img className="product-img" src={img.imageUrl} alt="product-img" />
                                                </div>
                                            </div>
                                        ))}
                            </React.Fragment>
                        ))}
                </div>
            </div>
            <div className={"col"}>
                <div className={"row m-2 align-items-center"}>
                    <div className={"col"}>
                        <h5><b>{product.title}</b></h5>
                    </div>
                    <div className={"col text-center"}>
                        {product.discountPrice !== 0.0 ? (
                            <>
                                <p className={"full-price m-1"}>{product.fullPrice}€</p>
                                <p className={"price m-1"}>{product.discountPrice}€</p>
                            </>
                        ) : (
                            <p className={"price"}>{product.fullPrice}€</p>
                        )}
                    </div>
                </div>
                <div className={"m-3"}>
                    <form onSubmit={onFormSubmit}>
                        <div className="mb-3 form-group">
                            <label about={"quantity"} className={"form-label"}>Quantity</label>
                            <input className={"form-control"} value={formData.quantity} type="number" min={1} name="quantity" id={"quantity"} onChange={handleChange}/>
                        </div>
                        <div className="mb-3 form-group">
                            <label about={"size"} className={"form-label"}>Size</label>
                            <select name="size" className={"form-control"} onChange={handleChange}>
                                <option value={"XXS"}>XXS</option>
                                <option value={"XS"}>XS</option>
                                <option value={"S"}>S</option>
                                <option value={"M"}>M</option>
                                <option value={"L"}>L</option>
                                <option value={"XL"}>XL</option>
                                <option value={"XXL"}>XXL</option>
                            </select>
                        </div>
                        <button className="btn btn-dark" type="submit">&#9825; Add To Cart</button>
                    </form>
                </div>
                <div className={"m-3"}>
                    <div className="details" onClick={() => toggleExpand('product_details')}>
                        <h5>
                            <img className={"details-logo m-2"} src={tshirt} alt={"Tshirt img"}/>
                            Product Details
                        </h5>
                        <div className={`expandable-content ${expandedSections.product_details ? 'expanded' : ''}`}>
                            <p>{product.descriptionDetails}</p>
                        </div>
                    </div>
                </div>
                {!product.washingInstructions || product.washingInstructions === "/" ? null : (
                    <div className={"m-3"}>
                        <div className="details" onClick={() => toggleExpand('washing_instructions')}>
                            <h5>
                                <img className={"details-logo m-2"} src={washing_machine} alt={"Washing machine img"}/>
                                Washing Instructions
                            </h5>
                            <div className={`expandable-content ${expandedSections.washing_instructions ? 'expanded' : ''}`}>
                                <p>{product.washingInstructions}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProductDetails;