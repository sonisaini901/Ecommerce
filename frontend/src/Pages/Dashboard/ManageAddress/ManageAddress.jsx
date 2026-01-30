import { useDispatch, useSelector } from "react-redux";
import SEO from "../../../Layout/SEO"
import DashboardMenus from "../DashboardMenus"
import { useEffect, useState } from "react";
import { clearAddressErrors, deleteAddress, getAddressDetails, updateShipping } from "../../../Store/Actions/AddressActions";
import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import AddUpdateAddress from "./AddUpdateAddress";
import { BiEditAlt } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { DELETE_ADDRESS_RESET, UPDATE_ADDRESS_RESET } from "../../../Store/Types/AddressTypes";
import { useSnackbar } from "notistack";

const ManageAddress = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { addressInfo, loading } = useSelector((state) => state.address);
    const { isDeleted, deleteError, isUpdated, error: updateError } = useSelector(state => state.shipping);

    const [addressShow, setAddressShow] = useState(false);
    const [addressId, setAddressId] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openDeleteModal = (id) => {
        setAddressId(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setAddressId(null);
    };

    const confirmDelete = () => {
        dispatch(deleteAddress(addressId));
    };

    const editAddressClick = (id) => {
        setAddressId(id);
        setAddressShow(true);
    }

    const handleModalClose = () => {
        setAddressId(null);
        setAddressShow(false);
    }

    const setDefaultAddress = (id) => {
        dispatch(updateShipping(id, { defaults: true }));
    }

    useEffect(() => {
        if(loading === undefined){
            dispatch(getAddressDetails(user._id));
        } 
    }, [user, loading, dispatch])

    useEffect(() => {
        if (isDeleted) {
            enqueueSnackbar("Address deleted successfully", { variant: "success" });
            dispatch({ type: DELETE_ADDRESS_RESET });
            dispatch(getAddressDetails(user._id));
            closeDeleteModal();
        }

        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearAddressErrors());
        }

        if(updateError){
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearAddressErrors());
        }
        
        if (isUpdated) {
            dispatch({ type: UPDATE_ADDRESS_RESET });
            enqueueSnackbar("Address Updated Successfully", { variant: "success" });
            dispatch(getAddressDetails(user._id));
        }

    }, [isDeleted, deleteError, dispatch, enqueueSnackbar, user._id, updateError, isUpdated]);

    return(
        <>
            <SEO title="Addresses - Forever Faster" />

            <div className="account_dashboard_section addresses_page">
                <div className="dashboard_flex_section">
                    <DashboardMenus />
            
                    <div className="dashboard_content_block">
                        <h1 className="main_heading large">Addresses</h1>
                        {addressInfo && addressInfo.length === 0 &&
                            <h3 className="subheading_text mt-3">You have no addresses yet</h3>
                        }

                        <div className="account_sttings_flex">
                            <div className="account_add_block" onClick={() => setAddressShow(true)}>
                                <FaPlus/>
                                <Button className="account_btns" >Add new address</Button>
                            </div>

                            <div className="account_address_grid">
                                {addressInfo && addressInfo.length >= 1 && addressInfo.map((item,i) => (
                                    <div className="account_setting_box" key={i}>
                                        <div className="account_setting_header">
                                            <h2 className="main_heading">{item.addressTitle && item.addressTitle}</h2>
                                            
                                            <div className="address_btns_block">
                                                <Button className="edit_profile_option" onClick={() => editAddressClick(item._id)}>
                                                    <BiEditAlt />
                                                </Button>
                                                <Button className="edit_profile_option" onClick={() => openDeleteModal(item._id)}>
                                                    <GoTrash />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="account_setting_content">
                                            {item.defaults === true && <p className="address_default">Default Address</p>}
                                            {item.firstname && item.lastname && <p className="account_setting_text">{item.firstname} {item.lastname}</p>}
                                            {item.address && <p className="account_setting_text">{item.address} {item.address1 && item.address1}</p>}
                                            {item.city && <p className="account_setting_text">{item.city}</p>}
                                            {item.state && item.pincode && <p className="account_setting_text">{item.state} {item.pincode}</p>}
                                            {item.country && <p className="account_setting_text">{item.country}</p>}
                                            {item.phoneNo && <p className="account_setting_text">{item.phoneNo}</p>}

                                            {item.defaults === false && <Button className="account_btns mt-4" onClick={() => setDefaultAddress(item._id)}>Set as default address</Button>}
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddUpdateAddress
                show={addressShow}
                onClose={() => handleModalClose()}
                addressId={addressId}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
        </>
    )
}

export default ManageAddress