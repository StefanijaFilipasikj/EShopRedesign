import React, { useState, useRef } from "react";
import {Link} from "react-router-dom";
import './ProductList.css';
import view_1 from '../../../images/view-1.png';
import view_3 from '../../../images/view-3.png';
import view_4 from '../../../images/view-4.png';
import filters from '../../../images/filters.png';
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

    const handleViewChange = (colClass) => {
        const cardWrappers = document.querySelectorAll('.card-wrapper');

        cardWrappers.forEach(cardWrapper => {
            cardWrapper.classList.remove('col-3', 'col-4', 'col-12');
            cardWrapper.classList.add(colClass);
        });

        const cards = document.querySelectorAll('.card');
        if(colClass === 'col-12'){
            cards.forEach(card => {
                card.style.width = '45em';
            });
        }else{
            cards.forEach(card => {
                card.style.width = '100%';
            });
        }
    }

    const handleToggleFilters = () => {
        const sidebar = document.querySelector('.sidebar');
        if(sidebar.classList.contains('d-none')){
            sidebar.classList.remove("d-none")

        }else{
            sidebar.classList.add("d-none")
        }
    }

    return (
        <div className={"row card-container m-2"}>
            <div className={"d-flex justify-content-between fixed-custom pe-4"}>
                <div className={"m-1 ms-3"}>
                    <img className={"filter-img"} src={filters} alt={"filters"}
                         onClick={() => handleToggleFilters()}/>
                </div>
                <div className="adjust-view me-3 d-flex justify-content-end">
                    <img className="adjust-view-img m-2" src={view_1} alt="1 column"
                         onClick={() => handleViewChange('col-12')}/>
                    <img className="adjust-view-img m-2" src={view_3} alt="3 columns"
                         onClick={() => handleViewChange('col-4')}/>
                    <img className="adjust-view-img m-2" src={view_4} alt="4 columns"
                         onClick={() => handleViewChange('col-3')}/>
                </div>
            </div>
            <div className={"col-2 sidebar p-3 mb-3 mt-5 me-5 d-none"}>
                <div className={"text-center m-2 filterWrap"}>
                    <div className={"filter p-1"} onClick={() => toggleExpand('price')}>
                        <h5>Price</h5>
                    </div>
                    <div className={`m-0 expandable-content ${expandedSections.price ? 'expanded' : ''}`}>
                        <p className={"mt-4"}></p>
                        <PriceFilter ref={priceFilterRef} onFilterPrice={props.onFilterPrice}/>
                    </div>
                </div>

                <div className={"text-center m-2 filterWrap"}>
                    <div className="filter text-center p-1" onClick={() => toggleExpand('color')}>
                        <h5>Color</h5>
                    </div>
                    <div className={`m-0 expandable-content ${expandedSections.color ? 'expanded' : ''}`}>
                        <ColorFilter ref={colorFilterRef} colors={props.colors} onFilterColors={props.onFilterColors}/>
                    </div>
                </div>

                <div className={"text-center m-2 filterWrap"}>
                    <div className="filter text-center p-1" onClick={() => toggleExpand('customize')}>
                        <h5>Customize</h5>
                    </div>
                    <div
                        className={`m-0 expandable-content ${expandedSections.customize ? 'expanded' : ''}`}>
                        <CustomizeFilter ref={customizeFilterRef} onFilterCustom={props.onFilterCustom}/>
                    </div>
                </div>

                <div className={"text-center m-2 filterWrap"}>
                    <div className="filter text-center p-1">
                        <a className={"link"} onClick={clearAllFilters}><h5>Clear filters</h5></a>
                    </div>
                </div>
            </div>
            <div className="col mt-5">
                <div className="row mx-4">
                    {props.products.length === 0 ?
                        <h2 className={"col px-4 text-center"}>no products matched your search</h2> :
                        props.products.map((p) => {
                            const colorOption = props.productColorOptions.find(option => option.product.id === p.id);
                            const optionImages = props.productImages.filter(image => image.colorOption.id === colorOption.id);
                            const mainImage = optionImages.length > 0 ? optionImages[0].imageUrl : 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10951.jpg';
                            const hoverImage = optionImages.length > 1 ? optionImages[1].imageUrl : mainImage;

                            return (
                                <div className={"col-3 card-wrapper p-0"} key={p.id}>
                                    <Link onClick={() => props.onDetails(p.id)} to={`/product/${p.id}`} className={"card-link"}>
                                        <div className="card mb-3 rounded-0 border-0"
                                             onMouseEnter={() => handleMouseEnter(p.id)}
                                             onMouseLeave={handleMouseLeave}>
                                            <img src={hoveredProductId === p.id ? hoverImage : mainImage} className="card-img-top rounded-0" alt="Product image" />
                                            <div className="card-body text-center">
                                                <h6 className="card-title">{p.title}</h6>
                                                <p className="card-text">
                                                    {/*{p.discountPrice !== 0.0 ? `${p.discountPrice}€` : `${p.fullPrice}€`}*/}
                                                    {p.discountPrice !== 0.0 ? (
                                                        <>
                                                            <p className={"full-price m-0"}>{p.fullPrice}€</p>
                                                            <p className={"price m-0"}>{p.discountPrice}€</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className={"price"}>{p.fullPrice}€</p>
                                                        </>
                                                    )}
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
