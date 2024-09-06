import { useState } from "react";
import EShopService from "../../../repository/EShopRepository";
import '../Auth.css';
import '../Auth.scss';
import {useNavigate} from 'react-router-dom'


const Login = (props) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        EShopService.login(formData.username, formData.password).then(resp => {
            localStorage.setItem("JWT", resp.data);
            props.refreshUsername();
            navigate("/");
        }).catch(error => {
            const errorMessage = error.response?.data?.message || "Invalid credentials";
            setError(errorMessage);
        });
    };


    const [isBlinking, setIsBlinking] = useState(false);
    const handlePasswordFocus = () => {
        setIsBlinking(true);
    };
    const handlePasswordBlur = () => {
        setIsBlinking(false);
    };


    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="auth row justify-content-center pt-5 mb-0 min-vh-100">
            <div className="col-3 position-relative mt-5">
                <form onSubmit={onFormSubmit} className="login-form p-5">
                    <h2 className={"auth-title"}>Login</h2>
                    <div className={`cat-container my-5 ${isBlinking ? 'blinking' : ''}`}>
                        <div className="cat">
                            <div className="ear ear--left"></div>
                            <div className="ear ear--right"></div>
                            <div className="face">
                                <div className="eye eye--left">
                                    <div className="eye-pupil"></div>
                                </div>
                                <div className="eye eye--right">
                                    <div className="eye-pupil"></div>
                                </div>
                                <div className="muzzle"></div>
                            </div>
                        </div>
                    </div>

                    <div id={"space"}></div>

                    {error && <div className={"alert alert-danger"} role="alert">{error}</div>}

                    <div className="form-group mb-4">
                        <label htmlFor="name" className="text-white">Username</label>
                        <input type="text"
                               className="form-control form-control-dark"
                               name="username"
                               required
                               placeholder="Enter username"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-4 position-relative">
                        <label htmlFor="password" className="text-white">Password</label>
                        <input type={showPassword ? "text" : "password"}
                               className="form-control form-control-dark"
                               name="password"
                               placeholder="Enter password"
                               required
                               onChange={handleChange}
                               onFocus={handlePasswordFocus}
                               onBlur={handlePasswordBlur}
                        />
                        <span className={`password-eye fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} id="togglePassword" onClick={togglePasswordVisibility}></span>
                    </div>
                    <button id="submit" type="submit" className="btn btn-dark w-100 my-4">Submit</button>
                </form>

                <div className={"mt-4 pb-5"}>
                    Don't have an account yet?
                    <a href={"register"} className="btn btn-dark w-100 mb-5">Register Now</a>
                </div>
            </div>
        </div>
    );
}

export default Login;