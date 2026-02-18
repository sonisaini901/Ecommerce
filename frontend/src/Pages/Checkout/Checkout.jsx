import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SEO from "../../Layout/SEO";
import "./Checkout.css";
import CheckoutMenus from "./CheckoutMenus";
import CheckoutSidebar from "./CheckoutSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAddressErrors, createShipping, getAddressDetails, updateShipping } from "../../Store/Actions/AddressActions";
import { useNavigate } from "react-router-dom";
import { NEW_ADDRESS_RESET, UPDATE_ADDRESS_RESET } from "../../Store/Types/AddressTypes";
import { useSnackbar } from "notistack";
import States from "../../Utils/States";
import { loadPaymentKey } from "../../Store/Actions/UserActions";

const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector(state => state.cart);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { addressInfo, loading } = useSelector((state) => state.address);
    const { success, error } = useSelector((state) => state.newShipping);
    const { isUpdated, error: updateError } = useSelector((state) => state.shipping);

    const [selectedAddress, setSelectedAddress] = useState("");
    const [addAddress, setAddAddress] = useState(false);

    const [addressTitle, setAddressTitle] = useState('');
    const [address, setAddress] = useState('');
    const [address1, setAddress1] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    useEffect(() => {
        if(cartItems && cartItems.length <=0 ) {
            navigate("/cart");
        }
    }, [navigate, cartItems])

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }

        if(addAddress) {
            dispatch(createShipping({ address, city, country, state, pincode, phoneNo, address1, addressTitle, firstname, lastname, defaults : true }));
        } else {
            dispatch(updateShipping(selectedAddress, { phoneNo, defaults : true }));
        }
        
    }

    const handleSelectAddress = (id) => {
        setSelectedAddress(id);
        setAddAddress(false);
    }

    const handleAddAddress = () => {
        setAddAddress(!addAddress);
        setSelectedAddress(null);
    }

    useEffect(() => {
        if(loading === undefined && user && user._id){
            dispatch(loadPaymentKey());
            dispatch(getAddressDetails(user._id));
        } 
    }, [user, loading, dispatch])

    useEffect(() => {
        if (Array.isArray(addressInfo) && addressInfo.length > 0) {
            const defaultAddress = addressInfo.find(a => a.defaults === true);
            setSelectedAddress(defaultAddress?._id || addressInfo[0]._id);
            setPhoneNo(defaultAddress.phoneNo);
        }
    }, [addressInfo]);

    useEffect(() => {
        if(error){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearAddressErrors());
        }
        
        if (success) {
            dispatch({ type: NEW_ADDRESS_RESET });
            dispatch(getAddressDetails(user._id));
            setAddAddress(false)
            navigate("/checkout/payment");
        }

        if(updateError){
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearAddressErrors());
        }

        if (isUpdated) {
            dispatch({ type: UPDATE_ADDRESS_RESET });
            dispatch(getAddressDetails(user._id));
            navigate("/checkout/payment");
        }

    }, [dispatch, enqueueSnackbar, error, success, user, navigate, updateError, isUpdated])

    return(
        <>
            <SEO title={"Checkout - Forever Faster"} />

            <div className="checkout_page_section section-padding">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="main_heading large">Checkout</h1>
                            <CheckoutMenus id={"checkout"} />

                            <div className="cart_table_flex less-top-padding">
                                <div className="cart_table_block">
                                    {isAuthenticated === false ?
                                    <>
                                        <p className="checkout_sections_subheading">For faster checkout experience</p>

                                        <Button onClick={() => navigate("/login/?redirect=checkout")} className="btn_background btn_checkout">Sign In</Button>

                                        <p className="cart_privacy">By continuing, I confirm that I have read and accept the <a href="/">Terms and Conditions</a> and the <a href="/">Privacy Policy</a>.</p>
                                    </>
                                    :
                                    <>
                                        <h2 className="checkout_section_headings">1. Addresses</h2>
                                        <p className="checkout_sections_subheading less-top-padding">Enter a Shipping Address</p>

                                        <Form onSubmit={shippingSubmit} className="login_register_form">

                                            <div className="checkout_addresses">
                                                {addressInfo && addressInfo.length >= 1 && 
                                                    addressInfo.map((item,i) => (
                                                        <Form.Check
                                                            key={i}
                                                            name={"address"}
                                                            value={item._id}
                                                            type={"radio"}
                                                            label={`${item.firstname} ${item.lastname}, ${item.address}, ${item.address1 ? item.address1 + ", " : ""}${item.city} ${item.state}, ${item.pincode}`}
                                                            id={`address-${item._id}`}
                                                            checked={item._id === selectedAddress}
                                                            onChange={() => handleSelectAddress(item._id)}
                                                        />
                                                    ))
                                                }

                                                <Form.Check
                                                    name={"address"}
                                                    type={"radio"}
                                                    value={"new_address"}
                                                    label={"Enter New Address"}
                                                    id={"address_new"}
                                                    checked={addAddress}
                                                    onChange={() => handleAddAddress()}
                                                />
                                            </div>

                                            {addAddress &&
                                            <>
                                                <Form.Group controlId="addressTitle" className="form_row">
                                                    <Form.Label>Address Title</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Address Title" 
                                                        value={addressTitle}
                                                        name="addressTitle"
                                                        onChange={(e) => setAddressTitle(e.target.value)}
                                                    />
                                                </Form.Group>
                                            
                                                <Form.Group controlId="country" className="form_row">
                                                    <Form.Label>Country <span>*</span></Form.Label>
                                                    <Form.Select
                                                        value={country}
                                                        required
                                                        label="Country"
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        className="form-control"
                                                    >
                                                        <option value={""}>Select Country</option>
                                                        <option value={'IN'}>India</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            
                                                <div className="form_flex_rows">
                                                    <Form.Group controlId="firstname" className="form_row">
                                                        <Form.Label>First Name <span>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="First Name" 
                                                            value={firstname}
                                                            required
                                                            name="firstname"
                                                            onChange={(e) => setFirstname(e.target.value)}
                                                        />
                                                    </Form.Group>
                                            
                                                    <Form.Group controlId="lastname" className="form_row">
                                                        <Form.Label>Last Name <span>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Last Name" 
                                                            value={lastname}
                                                            required
                                                            name="lastname"
                                                            onChange={(e) => setLastname(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            
                                                <Form.Group controlId="address" className="form_row">
                                                    <Form.Label>Address Line 1 <span>*</span></Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Address Line 1" 
                                                        value={address}
                                                        name="address"
                                                        required
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </Form.Group>
                                            
                                                <Form.Group controlId="address1" className="form_row">
                                                    <Form.Label>Address Line 2</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Address Line 2" 
                                                        value={address1}
                                                        name="address1"
                                                        onChange={(e) => setAddress1(e.target.value)}
                                                    />
                                                </Form.Group>
                                            
                                                <div className="form_flex_rows">
                                                    <Form.Group controlId="city" className="form_row">
                                                        <Form.Label>City <span>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="City" 
                                                            value={city}
                                                            required
                                                            name="city"
                                                            onChange={(e) => setCity(e.target.value)}
                                                        />
                                                    </Form.Group>
                                            
                                                    <Form.Group controlId="pincode" className="form_row">
                                                        <Form.Label>Pin Code <span>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Pin Code" 
                                                            value={pincode}
                                                            required
                                                            name="pincode"
                                                            onChange={(e) => setPincode(e.target.value)}
                                                            maxLength={6}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            
                                                <Form.Group controlId="state" className="form_row">
                                                    <Form.Label>State <span>*</span></Form.Label>
                                                    <Form.Select
                                                        value={state}
                                                        required
                                                        label="State"
                                                        onChange={(e) => setState(e.target.value)}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select State</option>
                                                        {States.map((item) => (
                                                            <option key={item.code} value={item.code}>{item.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </>            
                                            }

                                            <h3 className="subheading_text my-1">Enter Contact Info</h3>
                                            
                                            <Form.Group controlId="phoneNo" className="form_row">
                                                <Form.Label>Phone Number <span>*</span></Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Phone Number" 
                                                    value={phoneNo}
                                                    name="phoneNo"
                                                    required
                                                    onChange={(e) => setPhoneNo(e.target.value)}
                                                />
                                            </Form.Group>

                                            <div className="shipping_block">
                                                <p className="checkout_sections_subheading">Select a Shipping Method</p>

                                                <Form.Check type={"radio"} id={"shipping_method"}>
                                                    <Form.Check.Input 
                                                        type={"radio"} 
                                                        value={"standard"}
                                                        defaultChecked={true}
                                                    />
                                                    <Form.Check.Label>
                                                        <span>Standard</span>
                                                        <span className="amount">₹0</span>
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            </div>

                                            <Button type="submit" className="btn_background btn_checkout" disabled={loading}>
                                                {loading ? "Processing" : "Continue to payment"}
                                            </Button>
                                        </Form>
                                    </>
                                    }
                                </div>

                                <CheckoutSidebar />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Checkout