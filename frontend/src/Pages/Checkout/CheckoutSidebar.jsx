import { Accordion } from "react-bootstrap"
import CartTable from "../Cart/CartTable"
import { useDispatch, useSelector } from "react-redux";
import { GiReturnArrow } from "react-icons/gi";
import { useEffect } from "react";
import { setTotalAmount } from "../../Store/Actions/CartActions";

const CheckoutSidebar = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const { totalAmount } = useSelector((state) => state.cart);

    useEffect(() => {
        if(cartItems){
            let newPrice = cartItems.reduce((sum, item) => sum + (item.data.cuttedPrice * item.quantity), 0).toLocaleString();
            dispatch(setTotalAmount(newPrice))
        }
    }, [dispatch, cartItems])

    return(
        <div className="cart_table_total">
            <Accordion defaultActiveKey={['details']} alwaysOpen className="checkout_orders_details">
                <Accordion.Item eventKey="details">
                    <Accordion.Header>Order Details ({cartItems && cartItems.length})</Accordion.Header>
                    <Accordion.Body>
                        <CartTable />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className="cart_messages_block less-top-padding">
                <div className="cart_messages">
                    <GiReturnArrow />
                    <span>Free returns on all qualifying orders.</span>
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
            </div>                        
        </div>
    )
}

export default CheckoutSidebar