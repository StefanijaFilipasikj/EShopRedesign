import React, { useState, useRef } from "react";
import {Link} from "react-router-dom";
import './ProductList.css';
import view_3 from '../../../images/view-3.png';
import view_4 from '../../../images/view-4.png';
import PriceFilter from "../Filters/PriceFilter/PriceFilter";
import ColorFilter from "../Filters/ColorFilter/ColorFilter";
import CustomizeFilter from "../Filters/CustomizeFilter/CustomizeFilter";

const Products = (props) => {
    const [expandedSections, setExpandedSections] = useState({
        price: false,
        color: false,
        customize: false
    });

    const priceFilterRef = useRef();
    const colorFilterRef = useRef();
    const customizeFilterRef = useRef();

    const toggleExpand = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const clearAllFilters = (e) => {
        e.preventDefault();

        priceFilterRef.current.reset();
        colorFilterRef.current.reset();
        customizeFilterRef.current.reset();

        props.clearFilters();
    }

    const [hoveredProductId, setHoveredProductId] = useState(null);

    const handleMouseEnter = (productId) => {
        setHoveredProductId(productId);
    };

    const handleMouseLeave = () => {
        setHoveredProductId(null);
    };

    return (
        <div className={`row card-container m-2`}>
            <div className="col-2 sidebar p-3">
                <div className={"text-center m-2 filterWrap"}>
                    <div className="filter p-1" onClick={() => toggleExpand('price')}>
                        <h5>Price</h5>
                    </div>
                    <div className={`expandable-content ${expandedSections.price ? 'expanded' : ''}`}>
                        <p className={"mt-4"}></p>
                        <PriceFilter ref={priceFilterRef} onFilterPrice={props.onFilterPrice}/>
                    </div>
                </div>

                <div className={"text-center m-2 filterWrap"}>
                    <div className="filter text-center p-1" onClick={() => toggleExpand('color')}>
                        <h5>Color</h5>
                    </div>
                    <div className={`expandable-content ${expandedSections.color ? 'expanded' : ''}`}>
                        <ColorFilter ref={colorFilterRef} colors={props.colors} onFilterColors={props.onFilterColors}/>
                    </div>
                </div>

                <div className={"text-center m-2 filterWrap"}>
                    <div className="filter text-center p-1" onClick={() => toggleExpand('customize')}>
                        <h5>Customize</h5>
                    </div>
                    <div
                        className={`expandable-content ${expandedSections.customize ? 'expanded' : ''}`}>
                        <CustomizeFilter ref={customizeFilterRef} onFilterCustom={props.onFilterCustom}/>
                    </div>
                </div>

                <div className={"text-center m-2 filterWrap"}>
                    <div className="filter text-center p-1">
                        <a className={"link"} onClick={clearAllFilters}><h5>Clear filters</h5></a>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="adjust-view">
                    <img className="adjust-view-img m-2" src={view_3} alt="Change view to 3 columns"/>
                    <img className="adjust-view-img m-2" src={view_4} alt="Change view to 4 columns"/>
                </div>
                <div className="row card-container">
                    {props.products.length === 0 ?

                        <h2 className={"px-4 text-center"}>no products matched your search</h2> :

                        props.products.map((p) => {
                            const colorOption = props.productColorOptions.find(option => option.product.id === p.id);
                            const optionImages = props.productImages.filter(image => image.colorOption.id === colorOption.id);
                            const mainImage = optionImages.length > 0 ? optionImages[0].imageUrl : 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10951.jpg';
                            const hoverImage = optionImages.length > 1 ? optionImages[1].imageUrl : mainImage;

                            return (
                                <div className={"card-wrapper m-1"} key={p.id}>
                                    <Link onClick={() => props.onDetails(p.id)} to={`/product/${p.id}`} className={"card-link"}>
                                        <div className="card"
                                             onMouseEnter={() => handleMouseEnter(p.id)}
                                             onMouseLeave={handleMouseLeave}>
                                            <img src={hoveredProductId === p.id ? hoverImage : mainImage} className="card-img-top" alt="Product image" />
                                            <div className="card-body text-center">
                                                <h6 className="card-title">{p.title}</h6>
                                                <p className="card-text">
                                                    {p.discountPrice !== 0.0 ? `${p.discountPrice}€` : `${p.fullPrice}€`}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Products;
