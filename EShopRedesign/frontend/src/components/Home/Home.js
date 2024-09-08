import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import HomeFooter from "./HomeFooter";

const Home = (props) => {
    return (
        <div>
            <div className="hero-section">
                <div className="hero-text">
                    <h1>New Collection</h1>
                    <p>Summer Essentials</p>
                </div>
            </div>

            <div className={"photo-grid"}>
                <div className="row d-flex justify-content-between in-row-3">
                    <div className="col-4 text-left">
                        <img src="https://i.pinimg.com/736x/51/a8/d2/51a8d2b5a4642a77661f8d41b5de6f94.jpg" alt="..." />
                    </div>
                    <div className="col-4 text-center">
                        <img src="https://i.pinimg.com/736x/bd/bd/b7/bdbdb77ae202c4bdd36ec53036f7eec6.jpg" alt="..." />
                    </div>
                    <div className="col-4 text-end">
                        <img src="https://i.pinimg.com/736x/b6/2a/b5/b62ab59d0e154f60d9ce847a4a2ed5df.jpg" alt="..." />
                    </div>
                </div>
            </div>

            <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://blog.delivered.co.kr/wp-content/uploads/2024/05/Tube-tops.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://cdn.mos.cms.futurecdn.net/MNMWrf6KDKBGcZZbbkH3HW-1200-80.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.koimoi.com/wp-content/new-galleries/2023/08/blackpinks-jennie-puts-her-calvin-klein-sxy-sports-bra-on-display-serving-hotness-in-an-all-denim-look-blinks-react-001.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.allkpop.com/upload/2024/01/content/091823/1704842620-untitled-1.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="photo-grid">
                <div className="row in-row-2">
                    <div className="col-6">
                        <img src="https://i0.wp.com/thelaterals.com/wp-content/uploads/2020/08/000003740008.jpg" className="img-fluid" alt="..." />
                    </div>
                    <div className="col-6">
                        <img src="https://www.elle.vn/wp-content/uploads/2024/08/10/602332/sabrina-carpenter-1024x576.jpg" className="img-fluid" alt="..." />
                    </div>
                </div>
                {/*<div className="row d-flex justify-content-between in-row-3">*/}
                {/*    <div className="col-4 text-left">*/}
                {/*        <img src="https://i.pinimg.com/736x/26/a8/cf/26a8cf9a60cea62b82d2c1d344fdb4b1.jpg" alt="..." />*/}
                {/*    </div>*/}
                {/*    <div className="col-4 text-center">*/}
                {/*        <img src="https://i.pinimg.com/736x/07/13/0f/07130f208c85da32b9a398853ba3388d.jpg" alt="..." />*/}
                {/*    </div>*/}
                {/*    <div className="col-4 text-end">*/}
                {/*        <img src="https://i.pinimg.com/736x/6f/d8/25/6fd825d7c3cc8eb6f38177fd20826f22.jpg" alt="..." />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="row">
                    <div className="col-12 in-row-1">
                        <img src="https://stylecaster.com/wp-content/uploads/2020/08/zara-vacation.jpg?w=600&h=337&crop=1" className="d-block w-100" alt="..." />
                    </div>
                </div>
            </div>
            <HomeFooter/>
        </div>
    );
}

export default Home;
