import { useEffect } from "react";
import SEO from "../../../Layout/SEO"
import DashboardMenus from "../DashboardMenus"
import { useDispatch, useSelector } from "react-redux";
import { GET_WISHLIST_RESET, REMOVE_WISHLIST_RESET } from "../../../Store/Types/WishlistTypes";
import { clearWishlistErrors, deleteWishlist, getWIshlistItems } from "../../../Store/Actions/WishlistActions";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { GoTrash } from "react-icons/go";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { addItemsToCart } from "../../../Store/Actions/CartActions";

const Wishlists = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { wishlists, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlists);
    const { isDeleted, error: deleteError } = useSelector((state) => state.wishlistItem);

    const removeWishlistItem = (id) => {
        dispatch(deleteWishlist(id));
        enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    }

    const addToCartHandler = (e, id, quantity, stock) => {
        e.preventDefault();
        if (quantity >= stock) {
            enqueueSnackbar("Maximum Order Quantity", { variant: "warning" });
            return;
        };
        dispatch(addItemsToCart(id, quantity));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    useEffect(() => {
        if(user && user._id && wishlistLoading === undefined){
            dispatch(getWIshlistItems(user._id));
        }
        
        if(wishlistError){
            dispatch({ type: GET_WISHLIST_RESET });
        }

        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearWishlistErrors());
        }

        if (isDeleted) {
            dispatch({ type: REMOVE_WISHLIST_RESET });
            dispatch(getWIshlistItems(user._id));
        }
    }, [dispatch, enqueueSnackbar, user, wishlistLoading, wishlistError, deleteError, isDeleted])

    return(
        <>
            <SEO title="Wishlist - Forever Faster" />

            <div className="account_dashboard_section wishlist_page">
                <div className="dashboard_flex_section">
                    <DashboardMenus />

                    <div className="dashboard_content_block">
                        <h1 className="main_heading large">Wishlist ({wishlists.length})</h1>
                        {wishlists.length === 0 ? 
                            <div className="empty_cart_block">
                                <RiShoppingCartLine />
                                <h2 className="main_heading text-center">No Product Found!</h2>
                            </div>
                        :
                            <div className="cart_table_block less-top-padding">
                                {wishlists.map((item,i) => {
                                    const itemInCart = cartItems.find((i) => i.product === item.product._id);
                                    const quantity = itemInCart && itemInCart.quantity ? itemInCart.quantity + 1 : 1;
                                    return (
                                        <div className="cart_table_item" key={i}>
                                            <div className="cart_table_item_img">
                                                <Link to={`/product/${item.product.url}`}>
                                                    <img src={item.product.images[0].url} alt={item.product.name} />
                                                </Link>
                                                {item.product.stock > 0 && <span className="product_stock"><FaCheckCircle /> In Stock</span>}
                                            </div>
                                            <div className="cart_item_content">
                                                <div className="cart_item_left_content">
                                                    <Link to={`/product/${item.product.url}`}>
                                                        <h2 className="main_heading">{item.product.name}</h2>
                                                    </Link>
                                                    <p className="product_price">
                                                        <span>₹{item.product.cuttedPrice}</span>
                                                        {item.product.price && <span className="base">₹{item.product.price}</span>}
                                                    </p>
                                                    <Button onClick={(e) => addToCartHandler(e, item.product._id, quantity, item.product.stock)} className="btn_background">Add to cart</Button>
                                                </div>
                                                <div className="cart_item_right_content">
                                                            
                                                    <Button className="edit_profile_option" onClick={() => removeWishlistItem(item._id)}>
                                                        <GoTrash />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlists