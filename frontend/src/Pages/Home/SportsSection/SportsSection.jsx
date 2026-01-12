import "./SportsSection.css";
import { Col, Container, Row } from "react-bootstrap";
import running from "../../../assests/images/home/sports/running.webp";
import football from "../../../assests/images/home/sports/football.webp";
import training from "../../../assests/images/home/sports/training.webp";
import studio from "../../../assests/images/home/sports/studio.webp";
import basketball from "../../../assests/images/home/sports/basketball.webp";
import { Link } from "react-router-dom";

const sportsLists = [
    {
        image: running,
        title: "Running",
        link: "/",
    },
    {
        image: football,
        title: "Football",
        link: "/",
    },
    {
        image: training,
        title: "Training",
        link: "/",
    },
    {
        image: studio,
        title: "Studio",
        link: "/",
    },
    {
        image: basketball,
        title: "Basketball",
        link: "/",
    }
]

const SportsSection = () => {
    return(
        <div className="sports_section_home section-padding">
            <Container>
                <Row>
                    <Col>
                        <h2 className="main_heading">Gear up for sports</h2>
                        <div className="sports_grid_home less-top-padding">
                            {sportsLists.map((item,i) => (
                                <div className="sports_grid_item" key={i}>
                                    <Link to={item.link}>
                                        <img src={item.image} alt={item.title} className="sports_grid_img" />
                                        <h3 className="sports_grid_text">{item.title}</h3>
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

export default SportsSection