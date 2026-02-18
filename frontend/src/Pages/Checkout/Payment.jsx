import { Button, Col, Container, Form, Row } from "react-bootstrap"
import SEO from "../../Layout/SEO"
import CheckoutMenus from "./CheckoutMenus"
import CheckoutSidebar from "./CheckoutSidebar"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAddressDetails } from "../../Store/Actions/AddressActions"
import { addPaymentData, clearOrdersErrors, newOrderData } from "../../Store/Actions/OrderActions"
import { emptyCart } from "../../Store/Actions/CartActions"
import { useSnackbar } from "notistack"
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from "axios"

const Payment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const stripe = useStripe();
    const elements = useElements();
    const paymentBtn = useRef(null);

    const { loading } = useSelector((state) => state.paymentKey);
    const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { addressInfo, loading: addressLoading } = useSelector((state) => state.address);
    const { order: currentOrder, success, error } = useSelector((state) => state.newOrder);

    const [shippingInfo, setShippingInfo] = useState('');

    const [method, setMethod] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingState, setShippingState] = useState('');
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingPincode, setShippingPincode] = useState('');

    const totalPrice = totalAmount && Number(totalAmount.replace(/,/g, ''));

    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: phoneNo,
        description: "Forever Faster",
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    }

    const cardElementOptions = {
        style: {
            base: {
                color: "#666",
                fontSize: "18px",
            },
            invalid: {
                color: "#fa755a",
                fontSize: "18px",
            }
        }
    }

    const paymentSubmit = async (e) => {
        e.preventDefault();

        paymentBtn.current.disabled = true;

        if(method === 'stripe'){
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const {data} = await axios.post(
                    '/api/v1/payment/process',
                    paymentData,
                    config,
                );

                  
                    if (!stripe || !elements) return;

                    const result = await stripe.confirmCardPayment(data.client_secret, {
                        payment_method: {
                            card: elements.getElement(CardNumberElement),
                            billing_details: {
                                name: user.firstname + " " + user.lastname,
                                email: user.email,
                                address: {
                                    line1: shippingAddress,
                                    city: shippingCity,
                                    country: shippingCountry,
                                    state: shippingState,
                                    postal_code: shippingPincode,
                                },
                            },
                        },
                    });

                    if (result.error) {
                        paymentBtn.current.disabled = false;
                        enqueueSnackbar(result.error.message, { variant: "error" });
                    } else {
                        if (result.paymentIntent.status === "succeeded") {

                            const payment = {
                                id: result.paymentIntent.id,
                                client_secret: result.paymentIntent.client_secret,
                                status: result.paymentIntent.status,
                                amount: result.paymentIntent.amount,
                                livemode: result.paymentIntent.livemode,
                            }

                            dispatch(addPaymentData(payment));

                            order.paymentInfo = {
                                id: result.paymentIntent.id,
                                status: result.paymentIntent.status,
                                method: method,
                            };

                            dispatch(newOrderData(order));

                        } else {
                            enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
                        }
                    }

            } catch (error) {
                paymentBtn.current.disabled = false;
                // setPayDisable(false);
                enqueueSnackbar(error.message, { variant: "error" });

            }

        } else if(method === 'razorpay') {

            try {
                const { data } = await axios.post(
                    `/api/v1/payment/razor-create-order`,
                    { amount: totalPrice }
                );

                const options = {
                    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                    amount: data.order.amount,
                    currency: "INR",
                    name: "Forever Faster",
                    description: "Product Transaction",
                    order_id: data.order.id,
                    handler: async function (response) {

                        const paymentId = response.razorpay_payment_id;

                        const payment = {
                            id: paymentId,
                            client_secret: paymentId,
                            status: 'succeeded',
                            amount: totalPrice,
                            livemode: 'false',
                        }

                        dispatch(addPaymentData(payment));

                        order.paymentInfo = {
                            id: paymentId,
                            status: 'succeeded',
                            method: method,
                        };

                        dispatch(newOrderData(order));
                        
                    },
                    prefill: { email: user.email, contact: phoneNo },
                    theme: { color: "#191919" },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

            } catch (err) {
                paymentBtn.current.disabled = false;
                console.log(err)
                enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
            }
        } else {
            order.paymentInfo = {
                status: "succeeded",
                method: method,
            };

            dispatch(newOrderData(order));
        }
    }

    useEffect(() => {
        if(addressLoading === undefined && user && user._id){
            dispatch(getAddressDetails(user._id));
        } 

        if (error) {
            dispatch(clearOrdersErrors());
            enqueueSnackbar(error, { variant: "error" });
        }

        if (success && currentOrder) {
            const orderId =
                currentOrder._id ||
                currentOrder?.order?._id;

            if (orderId) {
                dispatch(emptyCart());
                navigate(`/checkout/summary/${orderId}`);
            }
        }
    }, [user, addressLoading, dispatch, error, success, currentOrder, enqueueSnackbar, navigate]);

    useEffect(() => {
        if (cartItems?.length === 0 && !currentOrder) {
            navigate("/cart");
        }
    }, [cartItems, currentOrder, navigate]);

    useEffect(() => {
        if (Array.isArray(addressInfo) && addressInfo.length > 0) {
            const defaultAddress = addressInfo.find(a => a.defaults === true);
            setShippingInfo(defaultAddress?._id || addressInfo[0]._id);
            setPhoneNo(defaultAddress.phoneNo);
            setShippingAddress(defaultAddress?.address || addressInfo[0].address);
            setShippingCity(defaultAddress?.city || addressInfo[0].city);
            setShippingState(defaultAddress?.state || addressInfo[0].state);
            setShippingCountry(defaultAddress?.country || addressInfo[0].country);
            setShippingPincode(defaultAddress?.pincode || addressInfo[0].pincode);
        }
    }, [addressInfo]);

    return(
        <>
            <SEO title={"Payment - Forever Faster"} />

            {!loading && 
            <div className="checkout_page_section section-padding">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="main_heading large">Checkout</h1>
                            <CheckoutMenus id={"payment"} />

                            <div className="cart_table_flex less-top-padding">
                                <div className="cart_table_block">

                                    <Form onSubmit={paymentSubmit} className="login_register_form">

                                        <Link to={"/checkout"} className="checkout_section_headings_link">
                                            <h2 className="checkout_section_headings">1. Addresses <span>Edit</span></h2>
                                        </Link>

                                        <h2 className="checkout_section_headings">2. Payment Method</h2>

                                        <div className="checkout_addresses">
                                            <Form.Check
                                                name={"payment_method"}
                                                type={"radio"}
                                                value={"cash"}
                                                label={"Cash On Delivery"}
                                                id={"method_cash"}
                                                checked={method === "cash"}
                                                onChange={(e) => setMethod(e.target.value)}
                                                required
                                            />

                                            <Form.Check
                                                name={"payment_method"}
                                                type={"radio"}
                                                value={"stripe"}
                                                label={"Stripe"}
                                                id={"method_stripe"}
                                                checked={method === "stripe"}
                                                onChange={(e) => setMethod(e.target.value)}
                                                required
                                            />

                                            <Form.Check
                                                name={"payment_method"}
                                                type={"radio"}
                                                value={"razorpay"}
                                                label={"Razorpay"}
                                                id={"method_razorpay"}
                                                checked={method === "razorpay"}
                                                onChange={(e) => setMethod(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {method === 'stripe' && 
                                            <div className="stripe_card_form">
                                                <div className="form_row">
                                                    <CardNumberElement options={cardElementOptions} />
                                                </div>
                                                <div className="form_flex_rows">
                                                    <div className="form_row">
                                                        <CardExpiryElement options={cardElementOptions} />
                                                    </div>
                                                    <div className="form_row">
                                                        <CardCvcElement options={cardElementOptions} />
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        <Button ref={paymentBtn} type="submit" className="btn_background btn_checkout" disabled={method === ""}>
                                            Place Order
                                        </Button>
                                    </Form>
                                </div>

                                <CheckoutSidebar />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            }
        </>
    )
}

export default Payment