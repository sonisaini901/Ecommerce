import "./MyOrders.css"
import SEO from "../../../Layout/SEO"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { clearOrdersErrors, myOrders } from "../../../Store/Actions/OrderActions";
import { formatDate } from '../../../Utils/functions';
import { Breadcrumb, Form } from 'react-bootstrap'

const dt = new Date();

const currentMonth = dt.getMonth();
const currentYear = dt.getFullYear();

const last10Years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const ordertime = [currentMonth, ...last10Years];

const MyOrders = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [orderTime, setOrderTime] = useState(0);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const { orders, loading, error } = useSelector((state) => state.myOrders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearOrdersErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (loading === false) {
            setFilteredOrders(orders);
        }
    }, [loading, orders]);

    useEffect(() => {

        if (+orderTime === 0) {
            setFilteredOrders(orders);
            return;
        }

        if (orderTime) {
            
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        }
        // eslint-disable-next-line
    }, [orderTime]);

    return(
        <>
            <SEO title="My Orders - Forever Faster" />

            <div className="account_dashboard_section orders_page">
                <div className="dashboard_flex_section">
                    <div className="dashboard_content_block">

                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="/account">My Account</Breadcrumb.Item>
                            <Breadcrumb.Item active>Order History</Breadcrumb.Item>
                        </Breadcrumb>
  
                        <h1 className="main_heading large">Order History</h1>

                        <div className="login_register_form less-top-padding">
                            <Form.Group controlId="filter_date" className="form_row">
                                <Form.Label>Select Date</Form.Label>
                                <Form.Select
                                    value={orderTime}
                                    label="Select Date"
                                    onChange={(e) => setOrderTime(e.target.value)}
                                    className="form-control"
                                >
                                    <option value={""}>Select Date</option>
                                    {ordertime.map((el, i) => (
                                        <option value={el} key={i}>{i === 0 ? "This Month" : el}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>

                        {orders && filteredOrders.length === 0 ?
                            <div className="empty_cart_block">
                                <h2 className="main_heading text-center">No Order Found!</h2>
                            </div>
                        :
                        <div className="cart_table_block orders_lists_flex">
                            {filteredOrders.map((orderData,index) => (
                                <div className="orders_lists_block" key={index}>
                                    <div className="order_lists_cols">
                                        <p className="order_content"><b>{orderData.orderStatus === "Shipped" ? "Shipped" : orderData.orderStatus === "Delivered" ? `Delivered on ${formatDate(orderData.deliveredAt)}` : `Ordered on ${formatDate(orderData.createdAt)}`}</b></p>
                                        <p className="order_content"><b>Order Total:</b> ₹{orderData.totalPrice}</p>
                                        {orderData?.paymentInfo.id && <p className="order_content"><b>Transaction Id:</b> {orderData?.paymentInfo.id}</p>} 
                                        <p className="order_content"><b>Payment Method:</b> {orderData.paymentInfo.method === "stripe" ? "Stripe" : orderData.paymentInfo.method === "razorpay" ? "Razorpay" : "Cash on delivery"}</p>
                                        <p className="order_content mt-3"><b>Order Items:</b></p>
                                        {orderData.orderItems.map((item, i) => (
                                            <div className="cart_table_item" key={i}>
                                                <div className="cart_table_item_img">
                                                    <Link to={item.product.url}>
                                                        <img src={item.product.images[0].url} alt={item.product.name} />
                                                    </Link>
                                                </div>
                                                <div className="cart_item_content">
                                                    <div className="cart_item_left_content">
                                                        <Link to={item.product.url}>
                                                            <h2 className="main_heading">{item.product.name}</h2>
                                                        </Link>
                                                        <p className="product_price">
                                                            <span>₹{item.product.cuttedPrice}</span>
                                                            {item.product.price && <span className="base">₹{item.product.price}</span>}
                                                        </p>
                                                        <p className="cart_product_quantity"><b>Quantity: </b>{item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order_lists_cols">
                                        <p className="order_content"><b>Shipping Address:</b></p>
                                        <p className="order_content">{orderData?.shippingInfo.firstname} {orderData?.shippingInfo.lastname}</p> 
                                        <p className="order_content">{orderData?.shippingInfo.address}, {orderData?.shippingInfo.address1 ? orderData?.shippingInfo.address1 + ", " : ""}</p>
                                        <p className="order_content">{orderData?.shippingInfo.city} {orderData?.shippingInfo.state}, {orderData?.shippingInfo.pincode}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyOrders