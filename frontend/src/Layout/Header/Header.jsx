import { Button, Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import HeaderTop from "./HeaderTop";
import { useEffect, useState } from "react";
import logo from "../../assests/images/Logo-white.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBars, FaRegHeart, FaRegUser } from "react-icons/fa6";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import HeaderSearch from "../../Components/HeaderSearch/HeaderSearch";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Store/Actions/UserActions";
import { useSnackbar } from "notistack";

const menuNav = [
    {
        title: "New",
        id: "new",
        dropdown: true,
        submenu: [
            {
                type: "list",
                label: "New",
                list: [
                    {
                        title: "Velocity Nitro 4 ⚡",
                        link: "/",
                    },
                    {
                        title: "Ballet Flats 🩰",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Scuderia Ferrari",
                        link: "/",
                    },
                    {
                        title: "Winterwear",
                        link: "/",
                    },
                    {
                        title: "Steppin",
                        link: "/",
                    },
                    {
                        title: "Launch Calendar",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "New Arrivals",
                list: [
                    {
                        title: "New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Men's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Women's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Kid's New Arrivals",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Sneaker Store",
                list: [
                    {
                        title: "Sneaker Store",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Palermo",
                        link: "/",
                    },
                    {
                        title: "Inhale",
                        link: "/",
                    },
                    {
                        title: "Inverse",
                        link: "/",
                    },
                    {
                        title: "Mostro",
                        link: "/",
                    },
                    {
                        title: "Rider",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Running Store",
                list: [
                    {
                        title: "Running Store",
                        link: "/",
                    },
                    {
                        title: "Run Clubs",
                        link: "/",
                    },
                    {
                        title: "Nitro",
                        link: "/",
                    },
                    {
                        title: "Softride",
                        link: "/",
                    },
                    {
                        title: "Activewear",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Training Store",
                list: [
                    {
                        title: "Training Store",
                        link: "/",
                    },
                    {
                        title: "Strength",
                        link: "/",
                    },
                    {
                        title: "Mobility",
                        link: "/",
                    },
                    {
                        title: "Endurance",
                        link: "/",
                    },
                    {
                        title: "Basics",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Jersey Store",
                list: [
                    {
                        title: "Jersey Store",
                        link: "/",
                    },
                    {
                        title: "Football Jerseys",
                        link: "/",
                    },
                    {
                        title: "Cricket Jerseys",
                        link: "/",
                    },
                    {
                        title: "Shop all Jerseys",
                        link: "/",
                    }
                ]
            }
        ]
    },
    {
        title: "Men",
        id: "men",
        dropdown: true,
        submenu: [
            {
                type: "list",
                label: "Men",
                list: [
                    {
                        title: "New & Trending",
                        link: "/",
                    },
                    {
                        title: "Winterwear",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Palermo",
                        link: "/",
                    },
                    {
                        title: "Nitro",
                        link: "/",
                    },
                    {
                        title: "RCB Athleisure",
                        link: "/",
                    },
                    {
                        title: "Steppin",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Shoes",
                list: [
                    {
                        title: "Shoes",
                        link: "/",
                    },
                    {
                        title: "Running",
                        link: "/",
                    },
                    {
                        title: "Sneakers",
                        link: "/",
                    },
                    {
                        title: "Walking",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Clothing",
                list: [
                    {
                        title: "Clothing",
                        link: "/",
                    },
                    {
                        title: "T-Shirts: Active & Casual",
                        link: "/",
                    },
                    {
                        title: "Polos",
                        link: "/",
                    },
                    {
                        title: "Sweatshirts & Hoodies",
                        link: "/",
                    },
                    {
                        title: "Track Pants & Joggers",
                        link: "/",
                    },
                    {
                        title: "Shorts",
                        link: "/",
                    },
                    {
                        title: "Team Jerseys",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Accessories",
                list: [
                    {
                        title: "Running Store",
                        link: "/",
                    },
                    {
                        title: "Caps & Beanies",
                        link: "/",
                    },
                    {
                        title: "Bags: Gym & Casual",
                        link: "/",
                    },
                    {
                        title: "Socks",
                        link: "/",
                    },
                    {
                        title: "Gloves",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Sports",
                list: [
                    {
                        title: "Sports",
                        link: "/",
                    },
                    {
                        title: "Running",
                        link: "/",
                    },
                    {
                        title: "Training & Gym",
                        link: "/",
                    },
                    {
                        title: "Football",
                        link: "/",
                    },
                    {
                        title: "Basketball",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Motorsport",
                list: [
                    {
                        title: "Motorsport",
                        link: "/",
                    },
                    {
                        title: "Scuderia Ferrari",
                        link: "/",
                    },
                    {
                        title: "BMW M Motorsport",
                        link: "/",
                    },
                    {
                        title: "Porsche Legacy",
                        link: "/",
                    }
                ]
            }
        ]
    },
    {
        title: "Women",
        id: "women",
        dropdown: true,
        submenu: [
            {
                type: "list",
                label: "Women",
                list: [
                    {
                        title: "New & Trending",
                        link: "/",
                    },
                    {
                        title: "Velocity Nitro 4",
                        link: "/",
                    },
                    {
                        title: "Ballet Flats 🩰",
                        link: "/",
                    },
                    {
                        title: "Style Guide",
                        link: "/",
                    },
                    {
                        title: "Winterwear",
                        link: "/",
                    },
                    {
                        title: "Steppin",
                        link: "/",
                    },
                    {
                        title: "Sale",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Shoes",
                list: [
                    {
                        title: "Shoes",
                        link: "/",
                    },
                    {
                        title: "Running",
                        link: "/",
                    },
                    {
                        title: "Sneakers",
                        link: "/",
                    },
                    {
                        title: "Walking",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Clothing",
                list: [
                    {
                        title: "Clothing",
                        link: "/",
                    },
                    {
                        title: "T-Shirts & Tops",
                        link: "/",
                    },
                    {
                        title: "Polos",
                        link: "/",
                    },
                    {
                        title: "Tights & Leggings",
                        link: "/",
                    },
                    {
                        title: "Sweatshirts & Hoodies",
                        link: "/",
                    },
                    {
                        title: "Pants",
                        link: "/",
                    },
                    {
                        title: "Homewear",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Accessories",
                list: [
                    {
                        title: "Accessories",
                        link: "/",
                    },
                    {
                        title: "Caps & Beanies",
                        link: "/",
                    },
                    {
                        title: "Bags : Gym & Casual",
                        link: "/",
                    },
                    {
                        title: "Water Bottles",
                        link: "/",
                    },
                    {
                        title: "Wallets",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Sports",
                list: [
                    {
                        title: "Sports",
                        link: "/",
                    },
                    {
                        title: "Yoga",
                        link: "/",
                    },
                    {
                        title: "Running",
                        link: "/",
                    },
                    {
                        title: "Training",
                        link: "/",
                    },
                    {
                        title: "Basketball",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Motorsport",
                list: [
                    {
                        title: "Motorsport",
                        link: "/",
                    },
                    {
                        title: "Scuderia Ferrari",
                        link: "/",
                    },
                    {
                        title: "BMW M Motorsport",
                        link: "/",
                    },
                    {
                        title: "Formula 1",
                        link: "/",
                    }
                ]
            }
        ]
    },
    {
        title: "Sports",
        id: "sports",
        dropdown: true,
        submenu: [
            {
                type: "heading",
                label: "Running",
                list: [
                    {
                        title: "Running",
                        link: "/",
                    },
                    {
                        title: "Running Store",
                        link: "/",
                    },
                    {
                        title: "Nitro Collection",
                        link: "/",
                    },
                    {
                        title: "Race Day",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Training",
                list: [
                    {
                        title: "Training",
                        link: "/",
                    },
                    {
                        title: "Training Store",
                        link: "/",
                    },
                    {
                        title: "Shoes",
                        link: "/",
                    },
                    {
                        title: "Gym Wear",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Cricket",
                list: [
                    {
                        title: "Cricket",
                        link: "/",
                    },
                    {
                        title: "Cricket Store",
                        link: "/",
                    },
                    {
                        title: "PUMA x RCB",
                        link: "/",
                    },
                    {
                        title: "PUMA x DELHI CAPITALS",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Football",
                list: [
                    {
                        title: "Football",
                        link: "/",
                    },
                    {
                        title: "Portugal",
                        link: "/",
                    },
                    {
                        title: "Football Store",
                        link: "/",
                    },
                    {
                        title: "Clothing",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Basketball",
                list: [
                    {
                        title: "Basketball",
                        link: "/",
                    },
                    {
                        title: "Shoes",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Badminton",
                list: [
                    {
                        title: "Badminton",
                        link: "/",
                    },
                    {
                        title: "Badminton Store",
                        link: "/",
                    }
                ]
            }
        ]
    },
    {
        title: "Motorsport",
        id: "motorsport",
        dropdown: true,
        submenu: [
            {
                type: "list",
                label: "New",
                list: [
                    {
                        title: "Velocity Nitro 4 ⚡",
                        link: "/",
                    },
                    {
                        title: "Ballet Flats 🩰",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Scuderia Ferrari",
                        link: "/",
                    },
                    {
                        title: "Winterwear",
                        link: "/",
                    },
                    {
                        title: "Steppin",
                        link: "/",
                    },
                    {
                        title: "Launch Calendar",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "New Arrivals",
                list: [
                    {
                        title: "New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Men's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Women's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Kid's New Arrivals",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Sneaker Store",
                list: [
                    {
                        title: "Sneaker Store",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Palermo",
                        link: "/",
                    },
                    {
                        title: "Inhale",
                        link: "/",
                    },
                    {
                        title: "Inverse",
                        link: "/",
                    },
                    {
                        title: "Mostro",
                        link: "/",
                    },
                    {
                        title: "Rider",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Running Store",
                list: [
                    {
                        title: "Running Store",
                        link: "/",
                    },
                    {
                        title: "Run Clubs",
                        link: "/",
                    },
                    {
                        title: "Nitro",
                        link: "/",
                    },
                    {
                        title: "Softride",
                        link: "/",
                    },
                    {
                        title: "Activewear",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Training Store",
                list: [
                    {
                        title: "Training Store",
                        link: "/",
                    },
                    {
                        title: "Strength",
                        link: "/",
                    },
                    {
                        title: "Mobility",
                        link: "/",
                    },
                    {
                        title: "Endurance",
                        link: "/",
                    },
                    {
                        title: "Basics",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Jersey Store",
                list: [
                    {
                        title: "Jersey Store",
                        link: "/",
                    },
                    {
                        title: "Football Jerseys",
                        link: "/",
                    },
                    {
                        title: "Cricket Jerseys",
                        link: "/",
                    },
                    {
                        title: "Shop all Jerseys",
                        link: "/",
                    }
                ]
            }
        ]
    },
    {
        title: "Lifestyle",
        id: "lifestyle",
        dropdown: true,
        submenu: [
            {
                type: "list",
                label: "New",
                list: [
                    {
                        title: "Velocity Nitro 4 ⚡",
                        link: "/",
                    },
                    {
                        title: "Ballet Flats 🩰",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Scuderia Ferrari",
                        link: "/",
                    },
                    {
                        title: "Winterwear",
                        link: "/",
                    },
                    {
                        title: "Steppin",
                        link: "/",
                    },
                    {
                        title: "Launch Calendar",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "New Arrivals",
                list: [
                    {
                        title: "New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Men's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Women's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Kid's New Arrivals",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Sneaker Store",
                list: [
                    {
                        title: "Sneaker Store",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Palermo",
                        link: "/",
                    },
                    {
                        title: "Inhale",
                        link: "/",
                    },
                    {
                        title: "Inverse",
                        link: "/",
                    },
                    {
                        title: "Mostro",
                        link: "/",
                    },
                    {
                        title: "Rider",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Running Store",
                list: [
                    {
                        title: "Running Store",
                        link: "/",
                    },
                    {
                        title: "Run Clubs",
                        link: "/",
                    },
                    {
                        title: "Nitro",
                        link: "/",
                    },
                    {
                        title: "Softride",
                        link: "/",
                    },
                    {
                        title: "Activewear",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Training Store",
                list: [
                    {
                        title: "Training Store",
                        link: "/",
                    },
                    {
                        title: "Strength",
                        link: "/",
                    },
                    {
                        title: "Mobility",
                        link: "/",
                    },
                    {
                        title: "Endurance",
                        link: "/",
                    },
                    {
                        title: "Basics",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Jersey Store",
                list: [
                    {
                        title: "Jersey Store",
                        link: "/",
                    },
                    {
                        title: "Football Jerseys",
                        link: "/",
                    },
                    {
                        title: "Cricket Jerseys",
                        link: "/",
                    },
                    {
                        title: "Shop all Jerseys",
                        link: "/",
                    }
                ]
            }
        ]
    },
    {
        title: "Kids",
        id: "kids",
        dropdown: true,
        submenu: [
            {
                type: "list",
                label: "New",
                list: [
                    {
                        title: "Velocity Nitro 4 ⚡",
                        link: "/",
                    },
                    {
                        title: "Ballet Flats 🩰",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Scuderia Ferrari",
                        link: "/",
                    },
                    {
                        title: "Winterwear",
                        link: "/",
                    },
                    {
                        title: "Steppin",
                        link: "/",
                    },
                    {
                        title: "Launch Calendar",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "New Arrivals",
                list: [
                    {
                        title: "New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Men's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Women's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Kid's New Arrivals",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Sneaker Store",
                list: [
                    {
                        title: "Sneaker Store",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Palermo",
                        link: "/",
                    },
                    {
                        title: "Inhale",
                        link: "/",
                    },
                    {
                        title: "Inverse",
                        link: "/",
                    },
                    {
                        title: "Mostro",
                        link: "/",
                    },
                    {
                        title: "Rider",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Running Store",
                list: [
                    {
                        title: "Running Store",
                        link: "/",
                    },
                    {
                        title: "Run Clubs",
                        link: "/",
                    },
                    {
                        title: "Nitro",
                        link: "/",
                    },
                    {
                        title: "Softride",
                        link: "/",
                    },
                    {
                        title: "Activewear",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Training Store",
                list: [
                    {
                        title: "Training Store",
                        link: "/",
                    },
                    {
                        title: "Strength",
                        link: "/",
                    },
                    {
                        title: "Mobility",
                        link: "/",
                    },
                    {
                        title: "Endurance",
                        link: "/",
                    },
                    {
                        title: "Basics",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Jersey Store",
                list: [
                    {
                        title: "Jersey Store",
                        link: "/",
                    },
                    {
                        title: "Football Jerseys",
                        link: "/",
                    },
                    {
                        title: "Cricket Jerseys",
                        link: "/",
                    },
                    {
                        title: "Shop all Jerseys",
                        link: "/",
                    }
                ]
            }
        ]
    },
    {
        title: "Sale",
        id: "sale",
        dropdown: true,
        submenu: [
            {
                type: "list",
                label: "New",
                list: [
                    {
                        title: "Velocity Nitro 4 ⚡",
                        link: "/",
                    },
                    {
                        title: "Ballet Flats 🩰",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Scuderia Ferrari",
                        link: "/",
                    },
                    {
                        title: "Winterwear",
                        link: "/",
                    },
                    {
                        title: "Steppin",
                        link: "/",
                    },
                    {
                        title: "Launch Calendar",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "New Arrivals",
                list: [
                    {
                        title: "New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Men's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Women's New Arrivals",
                        link: "/",
                    },
                    {
                        title: "Kid's New Arrivals",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Sneaker Store",
                list: [
                    {
                        title: "Sneaker Store",
                        link: "/",
                    },
                    {
                        title: "Speedcat",
                        link: "/",
                    },
                    {
                        title: "Palermo",
                        link: "/",
                    },
                    {
                        title: "Inhale",
                        link: "/",
                    },
                    {
                        title: "Inverse",
                        link: "/",
                    },
                    {
                        title: "Mostro",
                        link: "/",
                    },
                    {
                        title: "Rider",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Running Store",
                list: [
                    {
                        title: "Running Store",
                        link: "/",
                    },
                    {
                        title: "Run Clubs",
                        link: "/",
                    },
                    {
                        title: "Nitro",
                        link: "/",
                    },
                    {
                        title: "Softride",
                        link: "/",
                    },
                    {
                        title: "Activewear",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Training Store",
                list: [
                    {
                        title: "Training Store",
                        link: "/",
                    },
                    {
                        title: "Strength",
                        link: "/",
                    },
                    {
                        title: "Mobility",
                        link: "/",
                    },
                    {
                        title: "Endurance",
                        link: "/",
                    },
                    {
                        title: "Basics",
                        link: "/",
                    }
                ]
            },
            {
                type: "heading",
                label: "Jersey Store",
                list: [
                    {
                        title: "Jersey Store",
                        link: "/",
                    },
                    {
                        title: "Football Jerseys",
                        link: "/",
                    },
                    {
                        title: "Cricket Jerseys",
                        link: "/",
                    },
                    {
                        title: "Shop all Jerseys",
                        link: "/",
                    }
                ]
            }
        ]
    }
]

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { isAuthenticated } = useSelector((state) => state.user);

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [hoverActive, setHoverActive] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    const [level, setLevel] = useState(1);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const [showSearch, setShowSearch] = useState(false);

    const handleSearchShow = () => setShowSearch(true);
    const handleSearchClose = () => setShowSearch(false)

    const handleEnter = (name) => {
        setActiveDropdown(name);
        setHoverActive(name);
    };

    const handleLeave = () => {
        setActiveDropdown(null);
        setHoverActive(null);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
            setLevel(1);
            setActiveMenu(null);
            setActiveSubmenu(null);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Logout
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
    }

    const renderMobileMenu = () => {
        // LEVEL 1 – MAIN MENU
        if (level === 1) {
            return (
            <>
                <ul className="mobile-menu">
                    {menuNav.map(menu => (
                        <li key={menu.id} onClick={() => {
                            setActiveMenu(menu);
                            setLevel(2);
                        }}>
                            <span>{menu.title}</span>
                            <FaChevronRight />
                        </li>
                    ))}
                    <div className="mobile_btns">
                        {isAuthenticated ? 
                            <Button className="mobile_btn_nav black" onClick={() => handleLogout()}>Logout</Button>
                        :
                        <>
                            <Button className="mobile_btn_nav black" onClick={() => navigate("/login")}>Login</Button>
                            <Button className="mobile_btn_nav" onClick={() => navigate("/register")}>Join Us</Button>
                        </>
                        }
                    </div>
                </ul>
            </>
            );
        }

        // LEVEL 2 – SUBMENU GROUPS
        if (level === 2) {
            return (
            <>
                <div className="mobile-header">
                    <button onClick={() => setLevel(1)}><FaChevronLeft /></button>
                    <span>{activeMenu.title}</span>
                    <span style={{ width: "2rem" }}></span>
                </div>

                <ul className="mobile-menu submenu">
                    {activeMenu.submenu.map((sub, i) => (
                        <li 
                            key={i} 
                            onClick={() => {
                                setActiveSubmenu(sub);
                                setLevel(3);
                            }}
                        >
                            <span>{sub.label}</span>
                            <FaChevronRight />
                        </li>
                    ))}
                    <div className="mobile_btns">
                        {isAuthenticated ? 
                            <Button className="mobile_btn_nav black" onClick={() => handleLogout()}>Logout</Button>
                        :
                        <>
                            <Button className="mobile_btn_nav black" onClick={() => navigate("/login")}>Login</Button>
                            <Button className="mobile_btn_nav" onClick={() => navigate("/register")}>Join Us</Button>
                        </>
                        }
                    </div>
                </ul>
            </>
            );
        }

        // LEVEL 3 – SUBMENU ITEMS
        if (level === 3) {
            return (
            <>
                <div className="mobile-header">
                    <button onClick={() => setLevel(2)}><FaChevronLeft /></button>
                    <span>{activeSubmenu.label}</span>
                    <span style={{ width: "2rem" }}></span>
                </div>

                <ul className="mobile-menu submenu">
                    {activeSubmenu.list.map((item, i) => (
                        <li key={i}>
                            <a href={item.link}>{item.title}</a>
                        </li>
                    ))}
                    <div className="mobile_btns">
                        {isAuthenticated ? 
                            <Button className="mobile_btn_nav black" onClick={() => handleLogout()}>Logout</Button>
                        :
                        <>
                            <Button className="mobile_btn_nav black" onClick={() => navigate("/login")}>Login</Button>
                            <Button className="mobile_btn_nav" onClick={() => navigate("/register")}>Join Us</Button>
                        </>
                        }
                    </div>
                </ul>

            </>
            );
        }
    };

    return(
        <>
            <HeaderTop />

            <Navbar bg="dark" variant="dark" expand="lg" className="header_main">
                <Container>
                    <div className="header_left">
                        <Navbar.Toggle>
                            <FaBars className="bars" />
                            <IoMdClose className="close" />
                        </Navbar.Toggle>
                        <Button className="header_btn_icon" onClick={() => handleSearchShow()}>
                            <IoSearchOutline />
                        </Button>
                    </div>
                    
                    <Navbar.Brand href="/">
                        <img src={logo} alt="Logo" className="logo_header" />
                    </Navbar.Brand>
                    
                    <Navbar.Collapse>
                        {isMobile ? (
                            <div className="mobile-nav-wrapper">
                                {renderMobileMenu()}
                            </div>
                        ) : (
                            <Nav className="me-auto">
                                {menuNav.map((item,i) => (
                                    item.dropdown ?
                                        <NavDropdown
                                            title={item.title}
                                            id={`${item.id}-dropdown`}
                                            show={activeDropdown === item.id}
                                            onMouseEnter={() => handleEnter(item.id)}
                                            onMouseLeave={handleLeave}
                                            className={hoverActive === item.id ? "hovered" : ""}
                                            key={i}
                                        >
                                            <Container>
                                                {item.submenu.map((subitem,i) => (
                                                    <ul className={`submenu_lists ${subitem.type}`} label={subitem.label} key={i}>
                                                        {subitem.list.map((sublist,i) => (
                                                            <li key={i} className="submenu_lists_item">
                                                                <NavDropdown.Item href={sublist.link}>{sublist.title}</NavDropdown.Item>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ))}
                                            </Container>
                                        </NavDropdown>
                                    :
                                    <Nav.Link>{item.title}</Nav.Link>
                                ))}
                            </Nav>
                        )}
                        
                    </Navbar.Collapse>

                    <div className="header_right">
                        <Button className="header_search" onClick={() => handleSearchShow()}>
                            <IoSearchOutline />
                            <span>Search</span>
                        </Button>
                        <Button className="header_btn_icon wishlist">
                            <FaRegHeart />
                        </Button>
                        <Button className="header_btn_icon">
                            <RiShoppingCartLine />
                        </Button>
                        <Dropdown className="dropdown_users_block">
                            <Dropdown.Toggle className="header_btn_icon" id="dropdown_users">
                                <FaRegUser />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className="users_dropdown_lists">
                                    <Dropdown.Item href="/">My Account</Dropdown.Item>
                                    <Dropdown.Item href="/">Wishlist</Dropdown.Item>
                                    <Dropdown.Item href="/">Check Order/Initiate Return</Dropdown.Item>
                                </div>
                                <div className="mobile_btns">
                                    {isAuthenticated ? 
                                        <Button className="mobile_btn_nav black" onClick={() => handleLogout()}>Logout</Button>
                                    :
                                    <>
                                        <Button className="mobile_btn_nav black" onClick={() => navigate("/login")}>Login</Button>
                                        <Button className="mobile_btn_nav" onClick={() => navigate("/register")}>Join Us</Button>
                                    </>
                                    }
                                </div>
                            </Dropdown.Menu>
                            
                        </Dropdown>
                    </div>
                </Container>
            </Navbar>

            <HeaderSearch
                show={showSearch}
                onClose={() => handleSearchClose()}
            />
        </>
    )
}

export default Header