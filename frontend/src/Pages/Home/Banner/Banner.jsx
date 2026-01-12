import "./Banner.css";
import { Button, Container } from "react-bootstrap";
import bannerDesktop from "../../../assests/images/home/banner-desktop.webp";
import bannerMobile from "../../../assests/images/home/banner-mobile.webp";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="home_banner_main">
            <Container>
                <div className="home_banner_div">
                    <Link to={"/"} className="home_banner_link">
                        <img src={bannerDesktop} alt="Banner" className="home_banner_desktop" />
                        <img src={bannerMobile} alt="Banner" className="home_banner_mobile" />
                    </Link>
                    <div className="home_banner_content">
                        <h1>Flat 40% OFF</h1>
                        <p className="home_banner_text">+ Extra 5% Off On Online Payments</p>
                        <div className="banner_btn_block">
                            <Button className="banner_btn">For Him</Button>
                            <Button className="banner_btn">For Her</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Banner