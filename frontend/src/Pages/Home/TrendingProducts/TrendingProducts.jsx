import { Button, Col, Container, Row } from "react-bootstrap";
import "./TrendingProducts.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../../Store/Actions/CartActions";
import { useSnackbar } from "notistack";
import { addWishlistItem, clearWishlistErrors, deleteWishlist, getWIshlistItems } from "../../../Store/Actions/WishlistActions";
import { ADD_WISHLIST_RESET, GET_WISHLIST_RESET, REMOVE_WISHLIST_RESET } from "../../../Store/Types/WishlistTypes";
import { FaHeart } from "react-icons/fa6";

function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        >
            <FaChevronRight />
        </div>
    );
}

function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        >
            <FaChevronLeft />
        </div>
    );
}

const TrendingProducts = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.products);
    const { wishlists, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlists);
    const { isDeleted, error: deleteError } = useSelector((state) => state.wishlistItem);
    const { success: isAdded, error: addError } = useSelector((state) => state.newWIshlist);

    const addToCartHandler = (e, id, quantity, stock) => {
        e.preventDefault();
        if (quantity >= stock) {
            enqueueSnackbar("Maximum Order Quantity", { variant: "warning" });
            return;
        };
        console.log(id)
        dispatch(addItemsToCart(id, quantity));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isLessSer = windowWidth < 480;
    const isSmallSer = windowWidth < 768;
    const isMobileSer = windowWidth < 1099;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        slidesToShow: isLessSer ? 1 : isSmallSer ? 2 : isMobileSer ? 3 : 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true,
        autoplay: true,
        centerMode: true,
        centerPadding: isSmallSer ? "30px" : "50px",
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    const addToWishlistHandler = (e, itemExist, id) => {
        e.preventDefault();
        if(user && user._id){
            if(itemExist){
                const item = wishlists.filter((i) => i.product._id === id);
                dispatch(deleteWishlist(item[0]._id));
                enqueueSnackbar("Remove From Wishlist", { variant: "success" });
            } else {
                const data = {
                    product: id,
                    user: user._id,
                };
                dispatch(addWishlistItem(data));
                enqueueSnackbar("Added To Wishlist", { variant: "success" });
            }
        } else {
            enqueueSnackbar("Please Login to add item in wishlist", { variant: "warning" });
        }
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
        if (addError) {
            enqueueSnackbar(addError, { variant: "error" });
            dispatch(clearWishlistErrors());
        }
        if (isDeleted) {
            dispatch({ type: REMOVE_WISHLIST_RESET });
            dispatch(getWIshlistItems(user._id));
        }
        if (isAdded) {
            
            dispatch({ type: ADD_WISHLIST_RESET });
            dispatch(getWIshlistItems(user._id));
        }
    }, [dispatch, wishlistLoading, user, deleteError, isDeleted, isAdded, addError, enqueueSnackbar, wishlistError])

    return(
        <div className="trending_products_section section-padding no-top-padding">
            <Container>
                <Row>
                    <Col>
                        <h2 className="main_heading">Trending Now</h2>
                        <div className="trending_products_slides less-top-padding">
                            <Slider {...settings}>
                                {products && products.length >= 1 && products.map((item, i) => {
                                const itemInCart = cartItems.find((i) => i.product === item._id);
                                const quantity = itemInCart && itemInCart.quantity ? itemInCart.quantity + 1 : 1;
                                const itemWishlist = wishlists && wishlists.some((i) => i.product._id === item._id);
                                return(
                                    <div className="slide products_slides" key={i}>
                                        <Link to={item.url} className="products_slider_item">
                                            <div className="product_slider_image">
                                                <img src={item.images && item.images[0].url} alt={item.name} className="product_slider_img" />

                                                <span className="product_discount">{item.discount}</span>

                                                <span onClick={(e) => addToWishlistHandler(e, itemWishlist, item._id)} className={`product_wishlist ${itemWishlist ? 'exist' : ""}`}><FaHeart /></span>

                                                <Button onClick={(e) => addToCartHandler(e, item._id, quantity, item.stock)} className="btn_background">Add to cart</Button>
                                            </div>
                                            <div className="product_slider_content">
                                                <h3 className="product_slider_title">{item.name}</h3>
                                                <p className="product_price">
                                                    <span>₹{item.cuttedPrice}</span>
                                                    {item.price && <span className="base">₹{item.price}</span>}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                )})}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TrendingProducts