import "./TopCategories.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import categoriesBg from "../../assests/images/home/categories_bg.webp";

const categoriesLists = [
    {
        title: "Velocity Nitro 4 ⚡",
        link: "/",
    },
    {
        title: "Ballet Flats 🩰",
        link: "/",
    },
    {
        title: "Speedcat",
        link: "/",
    },
    {
        title: "Scuderia Ferrari",
        link: "/",
    },
    {
        title: "Winterwear",
        link: "/",
    },
    {
        title: "Steppin",
        link: "/",
    },
    {
        title: "Launch Calendar",
        link: "/",
    },
    {
        title: "Palermo",
        link: "/",
    },
    {
        title: "Nitro",
        link: "/",
    },
    {
        title: "Accessories",
        link: "/",
    },
    {
        title: "Clothing",
        link: "/",
    }
]

const mensCategories = [
    {
        title: "New & Trending",
        link: "/",
    },
    {
        title: "Clothing",
        link: "/",
    },
    {
        title: "T-Shirts: Active & Casual",
        link: "/",
    },
    {
        title: "Polos",
        link: "/",
    },
    {
        title: "Running Store",
        link: "/",
    },
    {
        title: "Caps & Beanies",
        link: "/",
    },
    {
        title: "Motorsport",
        link: "/",
    },
    {
        title: "Scuderia Ferrari",
        link: "/",
    },
    {
        title: "BMW M Motorsport",
        link: "/",
    },
]

const womenCategories = [
    {
        title: "Clothing",
        link: "/",
    },
    {
        title: "T-Shirts & Tops",
        link: "/",
    },
    {
        title: "Polos",
        link: "/",
    },
    {
        title: "Tights & Leggings",
        link: "/",
    },
    {
        title: "Sweatshirts & Hoodies",
        link: "/",
    },
    {
        title: "Sports",
        link: "/",
    },
    {
        title: "Yoga",
        link: "/",
    },
    {
        title: "Running",
        link: "/",
    },
    {
        title: "Training",
        link: "/",
    },
    {
        title: "Training Store",
        link: "/",
    },
    {
        title: "Shoes",
        link: "/",
    },
    {
        title: "Gym Wear",
        link: "/",
    }
]

const TopCategories = ({classes}) => {
    return(
        <div className={`top_categories_block ${classes}`}>
            <div className="section-padding">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="main_heading large text-center">Discover The Latest</h2>
                            <h3 className="subheading_text text-center">Season's Best Just Landed</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="categories_bg_block section-padding">
                <img src={categoriesBg} alt="Top Categories" className="categories_bg_img" />
                <div className="categories_block marquee-container left-right">
                    <div className="marquee">
                        {[0, 1].map((_, i) => (
                            <div className="marquee-track" key={i}>
                                {categoriesLists.map((item,i) => (
                                    <Link to={item.link} className="btn_bordered_white categories_list_item" key={i}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="categories_block marquee-container">
                    <div className="marquee">
                        {[0, 1].map((_, i) => (
                            <div className="marquee-track" key={i}>
                                {mensCategories.map((item,i) => (
                                    <Link to={item.link} className="btn_bordered_white categories_list_item" key={i}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="categories_block marquee-container left-right">
                    <div className="marquee">
                        {[0, 1].map((_, i) => (
                            <div className="marquee-track" key={i}>
                                {womenCategories.map((item,i) => (
                                    <Link to={item.link} className="btn_bordered_white categories_list_item" key={i}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopCategories