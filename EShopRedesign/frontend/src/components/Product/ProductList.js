import React, { useState } from "react";
import './ProductList.css';
import view_3 from '../../images/view-3.png';
import view_4 from '../../images/view-4.png';
import {Link} from "react-router-dom";

const Products = (props) => {
    const [expandedSections, setExpandedSections] = useState({
        price: false,
        color: false,
        customize: false
    });


    const toggleExpand = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <div className={`row card-container m-2`}>
            <div className="col-2 sidebar p-3">
                <div className="filter text-center p-1 m-2" onClick={() => toggleExpand('price')}>
                    <h5>Price</h5>
                    <div
                        className={`expandable-content ${expandedSections.price ? 'expanded' : ''}`}
                    >
                        <p>Additional content for Price</p>
                    </div>
                </div>

                <div className="filter text-center p-1 m-2" onClick={() => toggleExpand('color')}>
                    <h5>Color</h5>
                    <div
                        className={`expandable-content ${expandedSections.color ? 'expanded' : ''}`}
                    >
                        <p>Additional content for Color</p>
                    </div>
                </div>

                <div className="filter text-center p-1 m-2" onClick={() => toggleExpand('customize')}>
                    <h5>Customize</h5>
                    <div
                        className={`expandable-content ${expandedSections.customize ? 'expanded' : ''}`}
                    >
                        <p>Additional content for Customize</p>
                    </div>
                </div>
                <div className="filter text-center p-1 m-2">
                    <a className={"link"} href={"#"}><h5>Clear filters</h5></a>
                </div>
            </div>
            <div className="col">
                <div className="adjust-view">
                    <img className="adjust-view-img m-2" src={view_3} alt="Change view to 3 columns"/>
                    <img className="adjust-view-img m-2" src={view_4} alt="Change view to 4 columns"/>
                </div>
                <div className="row card-container">
                    {props.products.map((p) => {
                        const colorOption = props.productColorOptions.find(option => option.product.id === p.id);
                        const optionImage = props.productImages.find(image => image.colorOption.id === colorOption.id);
                        const image = optionImage ? optionImage.imageUrl : 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10951.jpg';

                        return (
                            <div className={"card-wrapper m-1"} key={p.id}>
                                <Link onClick={() => props.onDetails(p.id)} to={`/product/${p.id}`} className={"card-link"}>
                                    <div className="card">
                                        <img src={image} className="card-img-top" alt="Product image" />
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
