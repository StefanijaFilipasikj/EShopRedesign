import React from "react";
import './Header.css';
import cart from '../../images/cart-icon.png'
import {Link} from "react-router-dom";

//hard coded for now
const username = 'user';

const Header = (props) =>{
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light p-2 header">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><span className={"text-black title"}><b>LC WAIKIKI</b></span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-black">
                            <li className="nav-item dropdown nav-items">
                                <a className="nav-link dropdown-toggle p-3" href="#" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    WOMEN
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown nav-items">
                                <a className="nav-link dropdown-toggle p-3" href="#" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    MEN
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown nav-items">
                                <a className="nav-link dropdown-toggle p-3" href="#" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    KIDS
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>

                        </ul>
                        <form className="d-flex p-3">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-light" type="submit">Search</button>
                        </form>
                        <div className={"d-flex"}>
                            <Link to={`/shopping-cart/${username}`}><img className={"cart-logo"} src={cart} alt={"Cart logo"}/></Link>
                            <a className={"nav-link active px-3"} href={"#"}>LOGIN</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;