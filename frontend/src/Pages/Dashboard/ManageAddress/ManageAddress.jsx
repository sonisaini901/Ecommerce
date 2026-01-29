import { useDispatch, useSelector } from "react-redux";
import SEO from "../../../Layout/SEO"
import DashboardMenus from "../DashboardMenus"
import { useEffect, useState } from "react";
import { getAddressDetails } from "../../../Store/Actions/AddressActions";
import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import AddUpdateAddress from "./AddUpdateAddress";
import { BiEditAlt } from "react-icons/bi";
import { GoTrash } from "react-icons/go";

const ManageAddress = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { addressInfo, loading } = useSelector((state) => state.address);

    const [addressShow, setAddressShow] = useState(false);

    useEffect(() => {
        if(loading === undefined){
            dispatch(getAddressDetails(user._id));
        } 
    }, [user, loading, dispatch])

    console.log(addressInfo)

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
                            <div className="account_add_block">
                                <FaPlus/>
                                <Button className="account_btns" onClick={() => setAddressShow(true)}>Add new address</Button>
                            </div>

                            <div className="account_address_grid">
                                {addressInfo && addressInfo.length >= 1 && addressInfo.map((item,i) => (
                                    <div className="account_setting_box" key={i}>
                                        <div className="account_setting_header">
                                            <h2 className="main_heading">{item.addressTitle && item.addressTitle}</h2>
                                            
                                            <div className="address_btns_block">
                                                <Button className="edit_profile_option" onClick={() => setAddressShow(true)}>
                                                    <BiEditAlt />
                                                </Button>
                                                <Button className="edit_profile_option" onClick={() => setAddressShow(true)}>
                                                    <GoTrash />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="account_setting_content">
                                            {item.firstname && item.lastname && <p className="account_setting_text">{item.firstname} {item.lastname}</p>}
                                            {item.address && <p className="account_setting_text">{item.address} {item.address1 && item.address1}</p>}
                                            {item.city && <p className="account_setting_text">{item.city}</p>}
                                            {item.state && item.pincode && <p className="account_setting_text">{item.state} {item.pincode}</p>}
                                            {item.country && <p className="account_setting_text">{item.country}</p>}
                                            {item.phoneNo && <p className="account_setting_text">{item.phoneNo}</p>}
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
                onClose={() => setAddressShow(false)}
            />
        </>
    )
}

export default ManageAddress