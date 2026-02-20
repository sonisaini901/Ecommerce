import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../Store/Actions/CartActions";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { GoTrash } from "react-icons/go";
import { useSnackbar } from "notistack";
import placeholder from "../../assests/images/placeholder.png";

const CartTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector(state => state.cart);

    const removeCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
        enqueueSnackbar("Product Removed From Cart", { variant: "success" });
    }

    console.log(cartItems)

    return(
        <div className="cart_table_block">
            {cartItems && cartItems.length >= 0 && cartItems.map((item,i) => (
                <div className="cart_table_item" key={i}>
                    <div className="cart_table_item_img">
                        <Link to={item.data.url}>
                            <img src={item.data.images && item.data.images[0].url ? item.data.images[0].url : placeholder} alt={item.data.name} />
                        </Link>
                        {item.data.stock > 0 && <span className="product_stock"><FaCheckCircle /> In Stock</span>}
                    </div>
                    <div className="cart_item_content">
                        <div className="cart_item_left_content">
                            <Link to={item.data.url}>
                                <h2 className="main_heading">{item.data.name}</h2>
                            </Link>
                            <select
                                className="cart_quantity_select"
                                value={item.quantity}
                                onChange={(e) =>
                                    dispatch(addItemsToCart(item.product, Number(e.target.value)))
                                }
                            >
                                {[...Array(item.data.stock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="cart_item_right_content">
                            <p className="product_price">
                                <span>₹{item.data.cuttedPrice}</span>
                                {item.data.price && <span className="base">₹{item.data.price}</span>}
                            </p>
                            <Button className="edit_profile_option" onClick={() => removeCartItem(item.product)}>
                                <GoTrash />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartTable