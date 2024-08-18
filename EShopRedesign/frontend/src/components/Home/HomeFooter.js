import React from 'react';

function HomeFooter() {
    return (
        <div className="container mt-4 mb-5 py-5">
            <div className="v-stack gap-8">
                <div className="text-with-icons text-with-icons--stacked d-flex" role="region" style={{'--border-color': 'black;'}}>
                    <a href="" className="text-with-icons__item is-selected text-center w-25" role="group" aria-label="Item 1 of 4" >
                        <div className="v-stack gap-6 justify-items-center sm:justify-items-center">
                            <div className="mb-3" style={{'--border-color': 'black;'}}>
                                <svg aria-hidden="true" focusable="false" fill="none" strokeWidth="1.5" width="24" className="sm:hidden icon icon-picto-success" viewBox="0 0 24 24">
                                    <path d="M6 13.223 8.45 16.7a1.049 1.049 0 0 0 1.707.051L18 6.828" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path clipRule="evenodd" d="M12 23.249c6.213 0 11.25-5.037 11.25-11.25S18.213.749 12 .749.75 5.786.75 11.999 5.787 23.249 12 23.249Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="v-stack gap-2 text-center sm:text-center">
                                <p className="h6 text-dark">100% Authentic</p>
                                <div className="prose text-dark">
                                    <p>Authorized reseller with original warranty</p>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="" className="text-with-icons__item text-center w-25" role="group" aria-label="Item 2 of 4" >
                        <div className="v-stack gap-6 justify-items-center sm:justify-items-center">
                            <div className="mb-3" style={{'--border-color': 'black'}}>
                                <svg aria-hidden="true" focusable="false" fill="none" strokeWidth="1.5" width="24" className="sm:hidden icon icon-picto-delivery-truck" viewBox="0 0 24 24">
                                    <path d="M23.25 13.5V6a1.5 1.5 0 0 0-1.5-1.5h-12A1.5 1.5 0 0 0 8.25 6v6m0 0V6h-3a4.5 4.5 0 0 0-4.5 4.5v6a1.5 1.5 0 0 0 1.5 1.5H3" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M.75 12h3a1.5 1.5 0 0 0 1.5-1.5V6" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path clipRule="evenodd" d="M7.5 19.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm12 0a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 18h3" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="v-stack gap-2 text-center sm:text-center">
                                <p className="h6 text-dark">FAST SHIPPING</p>
                                <div className="prose text-dark">
                                    <p>Free shipping on orders over 300$</p>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="" className="text-with-icons__item text-center w-25" role="group" aria-label="Item 3 of 4" >
                        <div className="v-stack gap-6 justify-items-center sm:justify-items-center">
                            <div className="mb-3" style={{'--border-color': 'black'}}>
                                <svg aria-hidden="true" focusable="false" fill="none" strokeWidth="1.5" width="24" className="sm:hidden icon icon-picto-return" viewBox="0 0 24 24">
                                    <path d="m1.25 15.08 2.207-3.384 3.385 2.206" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.13 2.5a9.525 9.525 0 1 1 0 19.049 9.68 9.68 0 0 1-9.673-9.853" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="v-stack gap-2 text-center sm:text-center">
                                <p className="h6 text-dark">FREE RETURNS</p>
                                <div className="prose text-dark">
                                    <p>Free and easy returns from customer account</p>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="" className="text-with-icons__item text-center w-25" role="group" aria-label="Item 4 of 4" >
                        <div className="v-stack gap-6 justify-items-center sm:justify-items-center">
                            <div className="mb-3" style={{'--border-color': 'black'}}>
                                <svg aria-hidden="true" focusable="false" fill="none" strokeWidth="1.5" width="24" className="sm:hidden icon icon-picto-customer-support" viewBox="0 0 24 24">
                                    <path d="M12.75 15.75h3v4.5l4.5-4.5h1.494c.832 0 1.506-.674 1.506-1.506V2.25a1.5 1.5 0 0 0-1.5-1.5h-12a1.5 1.5 0 0 0-1.5 1.5v4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19.875 7.875a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75m-7.5 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75m3.75 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path clipRule="evenodd" d="M6.75 16.5a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.75 23.25a6.054 6.054 0 0 0-12 0" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="v-stack gap-2 text-center sm:text-center">
                                <p className="h6 text-dark">CUSTOMER SUPPORT</p>
                                <div className="prose text-dark">
                                    <p>Exceptional customer care by phone, chat or email</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HomeFooter;
