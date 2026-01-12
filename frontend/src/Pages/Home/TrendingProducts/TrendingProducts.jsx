import { Col, Container, Row } from "react-bootstrap";
import "./TrendingProducts.css";
import Slider from "react-slick";
import riderImg from "../../../assests/images/home/products/Blktop-Rider-Suede-Sneakers.webp";
import courtImg from "../../../assests/images/home/products/Court-Shatter-Low-Sneakers.webp";
import fusionproImg from "../../../assests/images/home/products/FusionPro-Lightweight-Cushioned-Men's-Running-Shoes.webp";
import BMWMMSImg from "../../../assests/images/home/products/BMW-MMS-Neo-Cat-Motorsport-Sneakers.webp";
import softriderImg from "../../../assests/images/home/products/Softride-Frequence-Street-Running-Shoes.webp";
import galaxisImg from "../../../assests/images/home/products/Galaxis-Pro-Men's-Performance-Boost-Running-Shoes.webp";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        >
            <FaChevronRight />
        </div>
    );
}

function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        >
            <FaChevronLeft />
        </div>
    );
}

const products = [
    {
        id: "1",
        title: "Blktop Rider Suede Sneakers",
        link: "blktop_rider_suede_sneakers",
        discount: "-50%",
        price: 4499,
        original: 8999,
        image: riderImg,
    },
    {
        id: "2",
        title: "Softride Frequence Street Running Shoes",
        link: "softride_frequence_street_running_shoes",
        discount: "-54%",
        price: 3150,
        original: 6999,
        image: softriderImg,
    },
    {
        id: "3",
        title: "Galaxis Pro Men's Performance Boost Running Shoes",
        link: "galaxis_pro_mens_performance_boost_running_shoes",
        discount: "-50%",
        price: 3499,
        original: 6999,
        image: galaxisImg,
    },
    {
        id: "4",
        title: "BMW MMS Neo Cat Motorsport Sneakers",
        link: "BMW_MMS_neo_cat_motorsport_sneakers",
        discount: "-54%",
        price: 3375,
        original: 7499,
        image: BMWMMSImg,
    },
    {
        id: "5",
        title: "FusionPro Lightweight Cushioned Men's Running Shoes",
        link: "fusionpro_lightweight_cushioned_mens_running_shoes",
        discount: "-54%",
        price: 3600,
        original: 7999,
        image: fusionproImg,
    },
    {
        id: "6",
        title: "Court Shatter Low Sneakers",
        link: "court_shatter_low_sneakers",
        discount: "-50%",
        price: 2999,
        original: 5999,
        image: courtImg,
    }
]

const TrendingProducts = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isLessSer = windowWidth < 480;
    const isSmallSer = windowWidth < 768;
    const isMobileSer = windowWidth < 1099;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        slidesToShow: isLessSer ? 1 : isSmallSer ? 2 : isMobileSer ? 3 : 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true,
        autoplay: true,
        centerMode: true,
        centerPadding: isSmallSer ? "30px" : "50px",
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return(
        <div className="trending_products_section section-padding no-top-padding">
            <Container>
                <Row>
                    <Col>
                        <h2 className="main_heading">Trending Now</h2>
                        <div className="trending_products_slides less-top-padding">
                            <Slider {...settings}>
                                {products.map((item, i) => (
                                    <div className="slide products_slides" key={i}>
                                        <Link to={item.link} className="products_slider_item">
                                            <div className="product_slider_image">
                                                <img src={item.image} alt={item.title} className="product_slider_img" />
                                                <span className="product_discount">{item.discount}</span>
                                            </div>
                                            <div className="product_slider_content">
                                                <h3 className="product_slider_title">{item.title}</h3>
                                                <p className="product_price">
                                                    <span>₹{item.price}</span>
                                                    {item.original && <span className="base">₹{item.original}</span>}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TrendingProducts