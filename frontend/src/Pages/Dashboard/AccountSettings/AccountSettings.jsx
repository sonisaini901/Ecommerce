import { Button } from "react-bootstrap"
import SEO from "../../../Layout/SEO"
import DashboardMenus from "../DashboardMenus"
import { BiEditAlt } from "react-icons/bi";
import { useSelector } from "react-redux";

const AccountSettings = () => {

    const { user, isAuthenticated } = useSelector(state => state.user);

    return(
        <>
            <SEO title="Account Settings - Forever Faster" />

            <div className="account_dashboard_section setting_page">
                <div className="dashboard_flex_section">
                    <DashboardMenus />
            
                    <div className="dashboard_content_block">
                        <h1 className="main_heading large">Account Settings</h1>
                        <div className="account_sttings_flex">
                            <div className="account_setting_box">
                                <div className="account_setting_header">
                                    <h2 className="main_heading">Personal Details</h2>
                                    <Button className="edit_profile_option">
                                        <BiEditAlt />
                                    </Button>
                                </div>
                                <div className="account_setting_content">
                                    {isAuthenticated && user &&
                                        <>
                                            {user.firstname && <p className="account_setting_text"><b>First Name:</b> {user.firstname}</p>}
                                            {user.lastname && <p className="account_setting_text"><b>Last Name:</b> {user.lastname}</p>}
                                        </>
                                    }
                                </div>
                            </div>

                            <div className="account_setting_box">
                                <div className="account_setting_header">
                                    <h2 className="main_heading">Email & Password</h2>
                                    <Button className="edit_profile_option">
                                        <BiEditAlt />
                                    </Button>
                                </div>
                                <div className="account_setting_content">
                                    {isAuthenticated && user &&
                                        <>
                                            {user.email && <p className="account_setting_text"><b>Email:</b> {user.email}</p>}
                                            <p className="account_setting_text password"><b>Password:</b> <span>password</span></p>
                                        </>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountSettings