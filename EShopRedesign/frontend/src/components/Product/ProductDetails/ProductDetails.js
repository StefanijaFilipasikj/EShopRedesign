import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css'
import tshirt from '../../../images/tshirt.png'
import washing_machine from '../../../images/washing-machine.png'

const ProductDetails = ({ getProduct, product, colorOptions, images, onAddToCart }) => {
    const navigate = useNavigate();
    const { id } = useParams();


    const initialColorOption = colorOptions.find(option =>
        images.some(img => img.colorOption.id === option.id));

    const [selectedColorOption, setSelectedColorOption] = useState(initialColorOption || {});


    useEffect(() => {
        getProduct(id);
    }, [id, getProduct]);

    useEffect(() => {
        if (initialColorOption) {
            setSelectedColorOption(initialColorOption);
        }
    }, [colorOptions, images]);

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
        const colorOptionId  = selectedColorOption.id
        onAddToCart(product.id, colorOptionId, quantity, size, navigate)
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

    const formatDescriptionDetails = (details) => {
        return details.split(';').map((detail, index) => {
            const [key, value] = detail.split(':').map(item => item.trim());
            return (
                <p key={index}><strong>{key}:</strong> {value}</p>
            );
        });
    };

    const formatWashingInstructions = (instructions) => {
        return instructions.split(';').map((instruction, index) => (
            <p key={index}><strong>{`${index + 1}. ${instruction.trim()}`}</strong></p>
        ));
    }

    const handleColorChange = (option) => {
        setSelectedColorOption(option);
    };


    return (
        <div className={"row m-4"}>
            <div className="col-lg-7">
                <div className="row img-container">
                    {images &&
                        images
                            .filter((img) => img.colorOption.id === selectedColorOption.id)
                            .map((img) => (
                                <div key={img.id} className="col-lg-6 col-md-6 col-sm-6 mb-2">
                                    <div className="img-wrapper">
                                        <img className="product-img" src={img.imageUrl} alt="product-img" />
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
            <div className={"col"}>
                <div className={"d-flex justify-content-between px-4"}>
                    <div className={"me-5"}>
                        <h5><b className={"fs-4"}>{product.title}</b></h5>
                    </div>
                    <div className={"ms-5 text-center"}>
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
                    <div className="color-options">
                        <div className="color-thumbnails">
                            {colorOptions &&
                                colorOptions.map((option) => (
                                    <div key={option.id} className="color-thumbnail-container">
                                        <img
                                            src={option.thumbnailUrl}
                                            alt={option.color}
                                            className={`color-thumbnail ${selectedColorOption.id === option.id ? 'selected' : ''}`}
                                            onClick={() => handleColorChange(option)}
                                        />
                                        <p className="m-2 text-center">{option.color.color}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
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
                {!product.descriptionDetails || product.descriptionDetails === "/" ? null : (
                    <div className={"m-3"}>
                        <div className="details" onClick={() => toggleExpand('product_details')}>
                            <h5>
                                <img className={"details-logo m-2"} src={tshirt} alt={"details"}/>
                                Product Details
                            </h5>
                            <div className={`content ${expandedSections.product_details ? 'expanded' : ''}`}>
                                {formatDescriptionDetails(product.descriptionDetails)}
                            </div>
                        </div>
                    </div>
                )}
                {!product.washingInstructions || product.washingInstructions === "/" ? null : (
                    <div className={"m-3"}>
                        <div className="details" onClick={() => toggleExpand('washing_instructions')}>
                            <h5>
                                <img className={"details-logo m-2"} src={washing_machine} alt={"instructions"}/>
                                Washing Instructions
                            </h5>
                            <div className={`content ${expandedSections.washing_instructions ? 'expanded' : ''}`}>
                                {formatWashingInstructions(product.washingInstructions)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProductDetails;