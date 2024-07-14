import React from "react";
import './Header.css';
import cart from '../../images/cart-icon.png'
import {Link} from "react-router-dom";

//hard coded for now
const username = 'user';

const Header = (props) =>{

    const onFormSubmit = (e, person, clothing) => {
        e.preventDefault();
        console.log(person, clothing)
        props.onFilter(person, clothing);
    }

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
                            <li className="nav-item dropdown nav-items d-flex">
                                <form className={"d-inline"} onSubmit={(event) => onFormSubmit(event, 'WOMEN', '/')}>
                                    <button className={"h-link nav-link btn-unstyled mt-1"} type={"submit"}>WOMEN</button>
                                </form>
                                <a className="d-inline nav-link dropdown-toggle me-3 mt-1" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {props.women.map((c) => {
                                        return(
                                            <li className="dropdown-item">
                                                <form onSubmit={(event) => onFormSubmit(event, 'WOMEN', c)}>
                                                    <button className={"nav-link btn-unstyled"} type={"submit"}>{c}</button>
                                                </form>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li className="nav-item dropdown nav-items d-flex">
                                <form className={"d-inline"} onSubmit={(event) => onFormSubmit(event, 'MEN', '/')}>
                                    <button className={"h-link nav-link btn-unstyled mt-1"} type={"submit"}>MEN</button>
                                </form>
                                <a className="d-inline nav-link dropdown-toggle me-3 mt-1" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {props.men.map((c) => {
                                        return(
                                            <li className="dropdown-item">
                                                <form onSubmit={(event) => onFormSubmit(event, 'MEN', c)}>
                                                    <button className={"nav-link btn-unstyled"} type={"submit"}>{c}</button>
                                                </form>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li className="nav-item dropdown nav-items d-flex">
                                <form className={"d-inline"} onSubmit={(event) => onFormSubmit(event, 'GIRLS', '/')}>
                                    <button className={"h-link nav-link btn-unstyled mt-1"} type={"submit"}>GIRLS</button>
                                </form>
                                <a className="d-inline nav-link dropdown-toggle me-3 mt-1" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {props.girls.map((c) => {
                                        return(
                                            <li className="dropdown-item">
                                                <form onSubmit={(event) => onFormSubmit(event, 'GIRLS', c)}>
                                                    <button className={"nav-link btn-unstyled"} type={"submit"}>{c}</button>
                                                </form>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            {/*<li className="nav-item dropdown nav-items d-flex">*/}
                            {/*    <form className={"d-inline"} onSubmit={(event) => onFormSubmit(event, 'BOYS', '/')}>*/}
                            {/*        <button className={"h-link nav-link btn-unstyled mt-1"} type={"submit"}>BOYS</button>*/}
                            {/*    </form>*/}
                            {/*    <a className="d-inline nav-link dropdown-toggle me-3 mt-1" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>*/}
                            {/*    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                            {/*        {props.boys.map((c) => {*/}
                            {/*            return(*/}
                            {/*                <li className="dropdown-item">*/}
                            {/*                    <form onSubmit={(event) => onFormSubmit(event, 'BOYS', c)}>*/}
                            {/*                        <button className={"nav-link btn-unstyled"} type={"submit"}>{c}</button>*/}
                            {/*                    </form>*/}
                            {/*                </li>*/}
                            {/*            )*/}
                            {/*        })}*/}
                            {/*    </ul>*/}
                            {/*</li>*/}

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