import "./InsperationSection.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import sneakers from "../../assests/images/insperation/sneakers.webp";
import motorsport from "../../assests/images/insperation/motorsport.webp";
import travelStyle from "../../assests/images/insperation/travel_style.webp";
import runningStore from "../../assests/images/insperation/running_store.webp";

const inspirationLists = [
    {
        link: "/",
        title: "Sneakers",
        subtitle: "Kick It Up a Notch",
        image: sneakers,
    },
    {
        link: "/",
        title: "Motorsport Store",
        subtitle: "Forever.Faster.",
        image: motorsport,
    },
    {
        link: "/",
        title: "Travel In Style",
        subtitle: "Gear Up For Your Next Adventure",
        image: travelStyle,
    },
    {
        link: "/",
        title: "Running Store",
        subtitle: "Make Every Run Effortless",
        image: runningStore,
    }
]

const InsperationSection = () => {
    return (
        <div className="insperation_section section-padding no-top-padding">
            <Container>
                <Row>
                    <Col>
                        <h2 className="main_heading large text-center">Here's Some Inspiration For You</h2>
                        <div className="inspering_lists">
                            {inspirationLists.map((item,i) => (
                                <div className="insperation_lists_item" key={i}>
                                    <Link to={item.link}>
                                        <div className="insperation_image">
                                            <img src={item.image} alt={item.title} className="insperation_img" />
                                        </div>
                                        <div className="insperation_contents">
                                            <h3 className="insperation_title">{item.title}</h3>
                                            <p className="insperation_text">{item.subtitle}</p>
                                            <Button className="btn_bordered_white">Shop Now</Button>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default InsperationSection