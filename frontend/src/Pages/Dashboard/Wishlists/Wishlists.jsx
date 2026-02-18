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

const Wishlists = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    
    const { user } = useSelector((state) => state.user);
    const { wishlists, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlists);
    const { isDeleted, error: deleteError } = useSelector((state) => state.wishlistItem);

    const removeWishlistItem = (id) => {
        dispatch(deleteWishlist(id));
        enqueueSnackbar("Remove From Wishlist", { variant: "success" });
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
                                {wishlists.map((item,i) => (
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
                                                <p className="product_price">
                                                    <span>₹{item.product.cuttedPrice}</span>
                                                    {item.product.price && <span className="base">₹{item.product.price}</span>}
                                                </p>
                                            </div>
                                            <div className="cart_item_right_content">
                                                        
                                                <Button className="edit_profile_option" onClick={() => removeWishlistItem(item._id)}>
                                                    <GoTrash />
                                                </Button>
                                            </div>
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

export default Wishlists