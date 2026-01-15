import "./NeedHelpSection.css";
import { Col, Container, Row } from "react-bootstrap";

const NeedHelpSection = () => {
    return(
        <div className="need_help_section section-padding no-top-padding">
            <Container>
                <Row>
                    <Col>
                        <div className="need_help_flex">
                            <h2 className="main_heading">Need some help?</h2>
                            <p className="need_help_text">Email: <a href="mailto:customercareindia@puma.com">customercareindia@puma.com</a></p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NeedHelpSection