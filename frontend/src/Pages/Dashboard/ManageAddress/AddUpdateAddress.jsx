import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { IoMdClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux";
import { clearAddressErrors, createShipping, getAddressDetails, getAddressDetailsById, updateShipping } from "../../../Store/Actions/AddressActions";
import { NEW_ADDRESS_RESET, UPDATE_ADDRESS_RESET } from "../../../Store/Types/AddressTypes";
import States from "../../../Store/Utils/States";

const AddUpdateAddress = ({show, onClose, addressId}) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { addressDetails, loading } = useSelector((state) => state.addressDetail);
    const { success, error } = useSelector((state) => state.newShipping);
    const { isUpdated, error: updateError } = useSelector((state) => state.shipping);

    const [addressTitle, setAddressTitle] = useState('');
    const [address, setAddress] = useState('');
    const [address1, setAddress1] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [defaults, setDefaults] = useState(false);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }
        if(addressId){
            dispatch(updateShipping(addressId, { address, city, country, state, pincode, phoneNo, address1, addressTitle, firstname, lastname, defaults }));
        } else {
            dispatch(createShipping({ address, city, country, state, pincode, phoneNo, address1, addressTitle, firstname, lastname, defaults }));
        }
    }

    const closeModal = () => {
        onClose()
    }

    useEffect(() => {
        if(error){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearAddressErrors());
        }
        if (success) {
            dispatch({ type: NEW_ADDRESS_RESET });
            enqueueSnackbar("Address Added Successfully", { variant: "success" });
            dispatch(getAddressDetails(user._id));
            closeModal();
        }

        if(updateError){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearAddressErrors());
        }
        if (isUpdated) {
            dispatch({ type: UPDATE_ADDRESS_RESET });
            enqueueSnackbar("Address Updated Successfully", { variant: "success" });
            dispatch(getAddressDetails(user._id));
        }

        if(loading === undefined && addressId){
            dispatch(getAddressDetailsById(addressId));
        } 
        if(addressDetails){
            setAddressTitle(addressDetails.addressTitle);
            setAddress(addressDetails.address);
            setCity(addressDetails.city);
            setCountry(addressDetails.country);
            setState(addressDetails.state);
            setPincode(addressDetails.pincode);
            setPhoneNo(addressDetails.phoneNo);
            setAddress1(addressDetails.address1);
            setFirstname(addressDetails.firstname);
            setLastname(addressDetails.lastname);
        }
       
    }, [dispatch, user, addressId, enqueueSnackbar, error, success, addressDetails, loading, updateError, isUpdated]);


    return(
        <Modal
            size="lg"
            show={show}
            onHide={() => onClose()}
            scrollable={true}
            className="profile_edit_modal"
            centered
        >
            <Modal.Body>
                <div className="account_setting_header">
                    <h2 className="main_heading">{addressId ? "Edit Address" : "Add Address"}</h2>
                    <Button className="edit_profile_option" onClick={closeModal}>
                        <IoMdClose />
                    </Button>
                </div>

                <Form onSubmit={shippingSubmit} className="login_register_form">
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

                    <h3 className="subheading_text my-1">Shipping Address</h3>

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

                    <h3 className="subheading_text my-1">Contact Information</h3>

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

                    <Form.Group className="form_row">
                        <Form.Check
                            type="checkbox"
                            id="default_address"
                            name="default_address"
                            label="Set as default"
                            checked={defaults}
                            onChange={(e) => setDefaults(!defaults)}
                            className="checkbox"
                        />
                    </Form.Group>

                    <Button type="submit" className="btn_background" disabled={loading}>
                        {loading ? "Processing" : "Save Changes"}
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddUpdateAddress