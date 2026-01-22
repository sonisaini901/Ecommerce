import "./Dashboard.css";
import SEO from "../../Layout/SEO"
import DashboardMenus from "./DashboardMenus"
import { useSelector } from "react-redux";

const Dashboard = () => {

    const { user, isAuthenticated } = useSelector(state => state.user);

    return(
        <>
            <SEO title="Dashboard - Forever Faster" />

            <div className="account_dashboard_section account_page">
                <div className="dashboard_flex_section">
                    <DashboardMenus />

                    <div className="dashboard_content_block">
                        <h1 className="main_heading large">Hello, {isAuthenticated && user && user.firstname}</h1>
                        <h3 className="subheading_text">Account Overview</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard