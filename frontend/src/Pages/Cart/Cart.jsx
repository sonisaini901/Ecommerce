import { Button, Col, Container, Row } from "react-bootstrap";
import SEO from "../../Layout/SEO";
import "./Cart.css";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTruckPickup } from "react-icons/fa";
import { setTotalAmount } from "../../Store/Actions/CartActions";
import { GiReturnArrow } from "react-icons/gi";
import { useEffect } from "react";
import TrustedPayments from "../../Components/TrustedPayments/TrustedPayments";
import CartTable from "./CartTable";

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cart);
    const { totalAmount } = useSelector((state) => state.cart);

    const totalQuantity = cartItems && cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    useEffect(() => {
        if(cartItems){
            let newPrice = cartItems.reduce((sum, item) => sum + (item.data.cuttedPrice * item.quantity), 0).toLocaleString();
            dispatch(setTotalAmount(newPrice))
        }
    }, [dispatch, cartItems])

    return(
        <>
            <SEO title={"Cart - Forever Faster"} />

            <div className="shoping_cart_section section-padding">
                <Container>
                    <Row>
                        <Col>
                            {cartItems && cartItems.length > 0 ?
                                <>
                                    <h1 className="main_heading large">My Shopping Cart ({totalQuantity})</h1>
                                    <div className="cart_table_flex less-top-padding">
                                        <CartTable />

                                        <div className="cart_table_total">
                                            <div className="cart_messages_block">
                                                <div className="cart_messages green">
                                                    <FaTruckPickup />
                                                    <span>You've earned free shipping</span>
                                                </div>
                                                <div className="cart_messages">
                                                    <GiReturnArrow />
                                                    <span>Free returns on all qualifying orders.</span>
                                                </div>
                                            </div>

                                            <ul className="cart_price_summary">
                                                <li className="cart_price_summary_item">
                                                    <h4>Subtotal</h4>
                                                    <span>₹{cartItems.reduce((sum, item) => sum + (item.data.cuttedPrice * item.quantity), 0).toLocaleString()}</span>
                                                </li>
                                                <li className="cart_price_summary_item">
                                                    <h4>Shipping Costs</h4>
                                                    <span>Free</span>
                                                </li>
                                                <li className="cart_price_summary_item grand_total">
                                                    <h4>Grand total <span>Prices include GST</span></h4>
                                                    <span>₹{totalAmount}</span>
                                                </li>
                                            </ul>

                                            <Button onClick={() => navigate("/checkout")} className="btn_background btn_checkout">Checkout</Button>

                                            <p className="cart_privacy">By continuing, I confirm that I have read and accept the <a href="/">Terms and Conditions</a> and the <a href="/">Privacy Policy</a>.</p>
                                        </div>
                                    </div>
                                </>
                            :
                                <EmptyCart />
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Trusted payments section */}
            <TrustedPayments />
        </>
    )
}

export default Cart