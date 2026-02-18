import "./TrustedPayments.css";
import { Col, Container, Row } from "react-bootstrap";
import { FiTruck } from "react-icons/fi";
import { MdLockOutline, MdOutlineMessage } from "react-icons/md";
import paymentIcons from "../../assests/images/payment-method.webp";

const paymentsLists = [
    {
        icon: <MdLockOutline />,
        title: "Secure payments",
        subtitle: "ssl encryption on all transactions"
    },
    {
        icon: <FiTruck />,
        title: "Free & fast returns",
        subtitle: "Free return on all qualifying orders"
    },
    {
        icon: <MdOutlineMessage />,
        title: "Secure payments",
        subtitle: "ssl encryption on all transactions"
    }
]

const TrustedPayments = () => {
    return(
        <div className="trusted_payments_block section-padding">
            <Container>
                <Row>
                    <Col>
                        <div className="trusted_payments_grid">
                            {paymentsLists.map((item,i) => (
                                <div className="trusted_pauments_item" key={i}>
                                    {item.icon}
                                    <p className="trusted_payments_title">{item.title}</p>
                                    <p className="trusted_payments_subtitle">{item.subtitle}</p>
                                </div>
                            ))}
                        </div>

                        <div className="tusted_payments_method less-top-padding">
                            <p className="payments_method_heading">Our trusted payment partners</p>
                            <img src={paymentIcons} alt="Payments" className="payment_icons" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TrustedPayments