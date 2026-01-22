import { FaCircleChevronLeft, FaRegHeart, FaRegUser } from "react-icons/fa6"
import { RiBox3Line } from "react-icons/ri"
import { LuNotebookText } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";
import { Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../Store/Actions/UserActions";

const DashboardMenus = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const navLinks = [
        {
            title: "Account Overview",
            link: "/account",
            icon: <FaRegUser />,
        },
        {
            title: "My Orders",
            link: "/account/orders",
            icon: <RiBox3Line />,
        },
        {
            title: "Wishlist",
            link: "/account/wishlist",
            icon: <FaRegHeart />,
        },
        {
            title: "Addresses",
            link: "/account/addresses",
            icon: <LuNotebookText />,
        },
        {
            title: "Account Settings",
            link: "/account/settings",
            icon: <VscSettings />,
        }
    ]

    // Logout
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
    }

    return(
        <div className="dashboard_menus">
            <Nav className="dashboard_menus_links">
                {navLinks.map((item,i) => (
                    <NavLink 
                        to={item.link} 
                        key={i} 
                        end={item.link === "/account"}
                        className={({ isActive }) =>
                            `dashboard_menu_item ${isActive ? "active" : ""}`
                        }
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </NavLink>
                ))}
                <Link
                    className={"dashboard_menu_item"}
                    onClick={() => handleLogout()}
                >
                    <FiLogOut />
                    <span>Logout</span>
                </Link>
            </Nav>

            <Link to={"/account"} className="dashboard_menu_item back_account">
                <FaCircleChevronLeft />
                <span>Back to My Account</span>
            </Link>
        </div>
    )
}

export default DashboardMenus