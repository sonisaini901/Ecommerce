import SEO from "../../Layout/SEO"
import CheckoutMenus from "./CheckoutMenus"
import { Button, Col, Container, Row, Accordion } from "react-bootstrap"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"
import { getOrderDetails, clearOrdersErrors } from "../../Store/Actions/OrderActions"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { FaCheckCircle } from "react-icons/fa";

const CheckoutSuccess = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    console.log(order)

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearOrdersErrors());
        }
       
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);

    return(
        <>
            <SEO title={"Order Summary - Forever Faster"} />

            {!loading && 
            <div className="checkout_page_section section-padding">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="main_heading large">Checkout</h1>
                            <CheckoutMenus id={"summary"} />

                            <div className="cart_table_flex less-top-padding">
                                <div className="cart_table_block">
                                    <p className="checkout_sections_subheading">Thank You For Your Order. Your Order Status is {order?.orderStatus}.</p>

                                    <div className="login_register_form">
                                        <h2 className="checkout_section_headings">1. Addresses</h2>

                                        <div className="checkout_addresses">
                                            <div className="form-check">{order?.shippingInfo.firstname} {order?.shippingInfo.lastname}, {order?.shippingInfo.address}, {order?.shippingInfo.address1 ? order?.shippingInfo.address1 + ", " : ""}{order?.shippingInfo.city} {order?.shippingInfo.state}, {order?.shippingInfo.pincode}</div>  
                                        </div>

                                        <h2 className="checkout_section_headings">2. Payment Method</h2>
                                        <div className="checkout_addresses">
                                            <div className="form-check"><b>Transaction Id:</b> {order?.paymentInfo.id}</div>  
                                            <div className="form-check"><b>Payment Method:</b> {order.paymentInfo.method === "stripe" ? "Stripe" : order.paymentInfo.method === "razorpay" ? "Razorpay" : "Cash on delivery"}</div>
                                        </div>

                                        <Button className="btn_background btn_checkout" onClick={() => navigate("/account/orders")}>
                                            View all orders
                                        </Button>
                                    </div>

                                </div>

                                <div className="cart_table_total">
                                    <Accordion defaultActiveKey={['details']} alwaysOpen className="checkout_orders_details">
                                        <Accordion.Item eventKey="details">
                                            <Accordion.Header>Order Details ({order?.orderItems?.length})</Accordion.Header>
                                            <Accordion.Body>
                                                <div className="cart_table_block">
                                                    {order?.orderItems.map((item,i) => (
                                                        <div className="cart_table_item" key={i}>
                                                            <div className="cart_table_item_img">
                                                                <Link to={item.product.url}>
                                                                    <img src={item.product.images[0].url} alt={item.product.name} />
                                                                </Link>
                                                                {item.product.stock > 0 && <span className="product_stock"><FaCheckCircle /> In Stock</span>}
                                                            </div>
                                                            <div className="cart_item_content">
                                                                <div className="cart_item_left_content">
                                                                    <Link to={item.product.url}>
                                                                        <h2 className="main_heading">{item.product.name}</h2>
                                                                    </Link>
                                                                    <p><b>Quantity:</b> {item.quantity}</p>
                                                                </div>
                                                                <div className="cart_item_right_content">
                                                                    <p className="product_price">
                                                                        <span>₹{item.product.cuttedPrice}</span>
                                                                        {item.product.price && <span className="base">₹{item.product.price}</span>}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            }
        </>
    )
}

export default CheckoutSuccess