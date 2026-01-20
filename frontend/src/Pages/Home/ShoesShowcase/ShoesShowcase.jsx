import { Col, Container, Row } from "react-bootstrap";
import "./ShoesShowcase.css";
import velocity from "../../../assests/images/home/showcase/Velocity-NITRO-4.webp";
import deviate from "../../../assests/images/home/showcase/Deviate-Shoes.webp";
import megmax from "../../../assests/images/home/showcase/MagMax-Shoes.webp";

const ShoesShowcase = () => {
    return (
        <div className="showcase_shoes_section no-top-padding section-padding">
            <Container>
                <Row>
                    <Col>
                        <h2 className="main_heading large text-center">Unleash Your Energy</h2>
                        <h3 className="subheading_text text-center">Experience The Nitro™️ Difference</h3>
                        <div className="showcase_wrapper">
                            <div className="showcase_card left">
                                <span className="btn_bordered_white">Velocity 4</span>
                                <img src={velocity} alt="Velocity 4" className="showcae_img" />
                            </div>
                        
                            <div className="showcase_card middle">
                                <span className="btn_bordered_white">Deviate 3</span>
                                <img src={deviate} alt="Deviate 4" className="showcae_img" />
                            </div>
                        
                            <div className="showcase_card right">
                                <span className="btn_bordered_white">Magmax 2</span>
                                <img src={megmax} alt="Magmax 2" className="showcae_img" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
}

export default ShoesShowcase