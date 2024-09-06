import React, { useLayoutEffect, useState} from "react";
import './Header.css';
import {Link, useNavigate} from "react-router-dom";


const Header = (props) =>{

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const onNavigateToCategory = (e, person, clothing) => {
        e.preventDefault();
        if (clothing === '/') {
            navigate(`/products/${person.toLowerCase()}`);
        } else {
            navigate(`/products/${person.toLowerCase()}/${clothing.toLowerCase()}`);
        }
    };

    useLayoutEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight;
            document.body.style.paddingTop = `${headerHeight}px`;
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value)
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        props.searchProducts(searchTerm.trim())
        setSearchTerm("");
        navigate('/products');
    };


    let authenticate;
    if(localStorage.getItem("JWT")){
        authenticate = (
            <>
                <span id={"username"} className={"nav-link fs-6 text-white align-self-center text-truncate"}>{props.username}</span>
                <a className={"nav-link px-3 fs-4 text-white"} href={`/shopping-cart/${props.username}`}><span className={"fa fa-shopping-cart"}></span></a>
                <button className="nav-link ps-3 fs-4 text-white" onClick={() => {localStorage.removeItem("JWT"); navigate("/login");}}><span className={"fa fa-user-times"}></span></button>
            </>
        )
    } else {
        authenticate = (<Link className="nav-link ps-3 fs-4 text-white" to={"/login"}><span className={"fa fa-user"}></span></Link>)
    }

    return (
        <header className={"fixed-top"}>
            <nav className="navbar navbar-expand header">
                <div className="container-fluid mx-5">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="col-4 navbar-nav me-auto mb-2 mb-lg-0 text-white">
                            <li className="nav-item dropdown nav-items d-flex">
                                <form className={"d-inline"} onSubmit={(event) => onNavigateToCategory(event, 'WOMEN', '/')}>
                                    <button className={"h-link nav-link btn-unstyled mt-1 text-white"} type={"submit"}>WOMEN</button>
                                </form>
                                <a className="d-inline nav-link dropdown-toggle me-3 mt-1 text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {props.women.map((c) => {
                                        return(
                                            <li className="dropdown-item" key={c}>
                                                <form onSubmit={(event) => onNavigateToCategory(event, 'WOMEN', c)}>
                                                    <button className={"nav-link btn-unstyled"} type={"submit"}>{c}</button>
                                                </form>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li className="nav-item dropdown nav-items d-flex">
                                <form className={"d-inline"} onSubmit={(event) => onNavigateToCategory(event, 'MEN', '/')}>
                                    <button className={"h-link nav-link btn-unstyled mt-1 text-white"} type={"submit"}>MEN</button>
                                </form>
                                <a className="d-inline nav-link dropdown-toggle me-3 mt-1 text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                <ul className="dropdown-menu text-white" aria-labelledby="navbarDropdown">
                                    {props.men.map((c) => {
                                        return(
                                            <li className="dropdown-item" key={c}>
                                                <form onSubmit={(event) => onNavigateToCategory(event, 'MEN', c)}>
                                                    <button className={"nav-link btn-unstyled"} type={"submit"}>{c}</button>
                                                </form>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li className="nav-item dropdown nav-items d-flex">
                                <form className={"d-inline"} onSubmit={(event) => onNavigateToCategory(event, 'GIRLS', '/')}>
                                    <button className={"h-link nav-link btn-unstyled mt-1 text-white"} type={"submit"}>GIRLS</button>
                                </form>
                                <a className="d-inline nav-link dropdown-toggle me-3 mt-1 text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {props.girls.map((c) => {
                                        return(
                                            <li className="dropdown-item" key={c}>
                                                <form onSubmit={(event) => onNavigateToCategory(event, 'GIRLS', c)}>
                                                    <button className={"nav-link btn-unstyled"} type={"submit"}>{c}</button>
                                                </form>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <a className="col-4 text-center navbar-brand" href="/"><span className={"text-white title"}>LC WAIKIKI</span></a>
                        <form className="d-flex me-3 w-100 justify-content-end" onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control search-bar rounded-0"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </form>

                        <div className={"d-flex"}>
                            {authenticate}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;