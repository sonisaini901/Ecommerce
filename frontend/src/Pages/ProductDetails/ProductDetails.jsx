import { useDispatch, useSelector } from "react-redux";
import SEO from "../../Layout/SEO";
import "./ProductDetails.css";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearProductsErrors, getProductDetails } from "../../Store/Actions/ProductActions";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar, FaTruckPickup } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { addWishlistItem, clearWishlistErrors, deleteWishlist, getWIshlistItems } from "../../Store/Actions/WishlistActions";
import { ADD_WISHLIST_RESET, GET_WISHLIST_RESET, REMOVE_WISHLIST_RESET } from "../../Store/Types/WishlistTypes";
import { addItemsToCart } from "../../Store/Actions/CartActions";
import { GiReturnArrow } from "react-icons/gi";
import Slider from "react-slick";

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

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isSmallSer = windowWidth < 992;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { wishlists, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlists);
    const { isDeleted, error: deleteError } = useSelector((state) => state.wishlistItem);
    const { success: isAdded, error: addError } = useSelector((state) => state.newWIshlist);

    const productURL = params.url;
    const [productId, setProductId] = useState();

    const itemInWishlist = productId && wishlists && wishlists.some((i) => i.product._id === productId);
    const itemInCart = productId && cartItems && cartItems.find((i) => i.product === productId);

    const addToCartHandler = (e, id, stock) => {
        e.preventDefault();

        const quantity = itemInCart && itemInCart.quantity ? itemInCart.quantity + 1 : 1;

        if (quantity >= stock) {
            enqueueSnackbar("Maximum Order Quantity", { variant: "warning" });
            return;
        };
        dispatch(addItemsToCart(id, quantity));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const addToWishlistHandler = () => {
        if(user && user._id){
            if(itemInWishlist){
                const item = wishlists.filter((i) => i.product._id === productId);
                dispatch(deleteWishlist(item[0]._id));
                enqueueSnackbar("Remove From Wishlist", { variant: "success" });
            } else {
                const data = {
                    product: productId,
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
        if(loading === undefined && productURL){
          dispatch(getProductDetails(productURL));  
        }

        if(product && product._id) {
            setProductId(product._id);
        }
    }, [dispatch, loading, productURL, product])

    useEffect(() => {
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

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearProductsErrors());
            navigate("/");
        }

        if(user && user._id && wishlistLoading === undefined){
            dispatch(getWIshlistItems(user._id));
        }

        if(wishlistError){
            dispatch({ type: GET_WISHLIST_RESET });
        }

    }, [dispatch, enqueueSnackbar, navigate, addError, isDeleted, isAdded, user, wishlistLoading, deleteError, wishlistError, error])

    return (
        <>  
            {loading === false && product &&
            <>
                <SEO title={`${product.name} - Forever Faster`} />

                <div className="product_details_section section-padding">
                    <Container>
                        <Row>
                            <Col>
                                <div className="product_details_flex">
                                    <div className="product_details_gallery">
                                        {isSmallSer ? 
                                            <div className="product_gallery_slider">
                                                <Slider {...settings}>
                                                    {product.images.map((item,i) => (
                                                        <img src={item.url} alt={product.name} className="product_img" key={i} />
                                                    ))}
                                                </Slider>
                                            </div>
                                        :
                                            <div className={`product_gallery_grid ${product.images.length === 1 && "single" }`}>
                                                {product.images.map((item,i) => (
                                                    <img src={item.url} alt={product.name} className="product_img" key={i} />
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="product_details_content">
                                        <p className="product_badge">
                                            <FaStar />
                                            Selling Fast
                                        </p>
                                        <h1 className="main_heading">{product.name}</h1>
                                        <div className="product_price_block">
                                            <p className="product_price">
                                                <span>₹{product.cuttedPrice}</span>
                                                {product.price && <span className="base">₹{product.price}</span>}
                                            </p>
                                            <p className="price_gst">Prices include GST</p>
                                        </div>
                                        <hr />
                                        <p className="cart_discount">Extra 15% off at checkout</p>
                                        <hr />
                                        <div className="cart_wishlist_block">
                                            <Button className="btn_wishlist_details" onClick={() => addToWishlistHandler()}>
                                                {itemInWishlist ?
                                                    <FaHeart />
                                                :
                                                    <FaRegHeart />
                                                }
                                            </Button>

                                            <Button onClick={(e) => addToCartHandler(e, product._id, product.stock)} className="btn_background" disabled={product.stock < 1 ? true : false}>{product.stock < 1 ? "Out Of Stock" : "Add To Cart"}</Button>
                                        </div>

                                        <div className="cart_messages_block">
                                            <div className="cart_messages green">
                                                <FaTruckPickup />
                                                <span>This item qualifies for free shipping!</span>
                                            </div>
                                            <div className="cart_messages">
                                                <GiReturnArrow />
                                                <span>Free returns on all qualifying orders.</span>
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="cart_messages_block">
                                            <p className="product_heading">Description</p>
                                            <p className="product_contents">{product.description}</p>
                                        </div>

                                        <hr />

                                        <div className="cart_messages_block">
                                            <p className="product_heading">Shipping and Returns</p>
                                            <p className="product_contents">Free return on all qualifying orders within 10 days of your order delivery date. Visit our <a href="/">Return Policy</a> for more information.</p>
                                            <p className="product_contents">For any queries, please contact Customer Service on email at <a href="mailto:info@foreverfaster.com">info@foreverfaster.com</a>, or send us a "Hi" on Whatsapp at 6364929121.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="product_descriptions_block">
                                    {product.story &&
                                        <div className="cart_messages_block">
                                            <p className="product_heading">Product Story</p>
                                            <p className="product_contents">{product.story}</p>
                                        </div>
                                    }
                                    <div className="product_grid_block">
                                        {product.details && product.details.length >= 1 &&
                                            <div className="cart_messages_block">
                                                <p className="product_heading">Details</p>
                                                <ul className="product_lists">
                                                    {product.details.map((item,i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        }
                                        {product.material && product.material.length >= 1 &&
                                            <div className="cart_messages_block">
                                                <p className="product_heading">Material Information</p>
                                                <ul className="product_lists">
                                                    {product.material.map((item,i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        }

                                        {product.manufacturer &&
                                            <div className="cart_messages_block">
                                                <p className="product_heading">Manufacturer's Address</p>
                                                <p className="product_contents">{product.manufacturer}</p>
                                            </div>
                                        }
                                        {product.originCountry &&
                                            <div className="cart_messages_block">
                                                <p className="product_heading">Country of Origin</p>
                                                <p className="product_contents">{product.originCountry}</p>
                                            </div>
                                        }
                                        {product.importer &&
                                            <div className="cart_messages_block">
                                                <p className="product_heading">Inporter Name And Address</p>
                                                <p className="product_contents">{product.importer}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
            }
            
        </>
    )
}

export default  ProductDetails