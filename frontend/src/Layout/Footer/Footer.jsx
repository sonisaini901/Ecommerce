import { Link } from "react-router-dom";
import "./Footer.css";
import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest, FaInstagram, FaYoutube, FaFacebook, FaChevronDown } from "react-icons/fa";
import paymentIcons from "../../assests/images/payment-method.webp";
import indiaFlag from "../../assests/images/india.png";

const supportMenu = [
    {
        link: "/",
        title: "Contact us"
    },
    {
        link: "/",
        title: "FAQs"
    },
    {
        link: "/",
        title: "Promotions & Sale"
    },
    {
        link: "/",
        title: "My Account"
    },
    {
        link: "/",
        title: "Track Order"
    },
    {
        link: "/",
        title: "Exchange & Return Policy"
    },
    {
        link: "/",
        title: "Shoe Care"
    },
    {
        link: "/",
        title: "Privacy Policy"
    },
    {
        link: "/",
        title: "Tech Glossary"
    },
    {
        link: "/",
        title: "Terms & Conditions"
    },
    {
        link: "/",
        title: "Initiate Return / Exchange"
    },
    {
        link: "/",
        title: "Shoes"
    },
    {
        link: "/",
        title: "Sneakers"
    },
    {
        link: "/",
        title: "Running Shoes"
    },
    {
        link: "/",
        title: "Nitro"
    },
    {
        link: "/",
        title: "Sitemap"
    },
    {
        link: "/",
        title: "Cookie Settings"
    }
]

const aboutMenu = [
    {
        link: "/",
        title: "Company"
    },
    {
        link: "/",
        title: "What is HYROX?"
    },
    {
        link: "/",
        title: "PUMA GO WILD"
    },
    {
        link: "/",
        title: "Corporate News"
    },
    {
        link: "/",
        title: "Press Center"
    },
    {
        link: "/",
        title: "Investors"
    },
    {
        link: "/",
        title: "Sustainability"
    },
    {
        link: "/",
        title: "Careers"
    },
    {
        link: "/",
        title: "Store Locator"
    },
    {
        link: "/",
        title: "PUMA Articles"
    }
]

const socialIcons = [
    {
        icon: <FaYoutube />,
        link: "https://www.youtube.com/",
        title: "YouTube",
    },
    {
        icon: <FaXTwitter />,
        link: "https://x.com/",
        title: "Twitter",
    },
    {
        icon: <FaPinterest />,
        link: "https://www.pinterest.com/",
        title: "Pinterest",
    },
    {
        icon: <FaInstagram />,
        link: "https://instagram.com/",
        title: "Instagram",
    },
    {
        icon: <FaFacebook />,
        link: "https://www.facebook.com/",
        title: "Facebook",
    }
]

const Footer = () => {
    return(
        <footer className="footer_main background">
            <Container>
                <Row>
                    <Col>
                        <div className="footer_cols_wrap desktop">
                            <div className="flex-2 footer-cols">
                                <div className="footer-headings">Support</div>
                                <ul className="grid grid-cols-2">
                                    {supportMenu.map((item,i) => (
                                        <li className="footer_menu_item" key={i}>
                                            <Link to={item.link}>{item.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 footer-cols">
                                <div className="footer-headings">About</div>
                                <ul className="grid grid-cols-1">
                                    {aboutMenu.map((item,i) => (
                                        <li className="footer_menu_item" key={i}>
                                            <Link to={item.link}>{item.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 footer-ends">
                                <div className="footer-headings">Stay Up To Date</div>
                                <ul className="footer_social_icons">
                                    {socialIcons.map((item,i) => (
                                        <li key={i} className="footer_social_item">
                                            <Link target="_blank" to={item.link}>
                                                {item.icon}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="footer_cols_wrap mobile">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <span>Support</span>
                                        <FaChevronDown />
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="grid grid-cols-2">
                                            {supportMenu.map((item,i) => (
                                                <li className="footer_menu_item" key={i}>
                                                    <Link to={item.link}>{item.title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <span>About</span>
                                        <FaChevronDown />
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="grid grid-cols-1">
                                            {aboutMenu.map((item,i) => (
                                                <li className="footer_menu_item" key={i}>
                                                    <Link to={item.link}>{item.title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        <span>Stay Up To Date</span>
                                        <FaChevronDown />
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="footer_social_icons">
                                            {socialIcons.map((item,i) => (
                                                <li key={i} className="footer_social_item">
                                                    <Link target="_blank" to={item.link}>
                                                        {item.icon}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                        <div className="footer_cols_bottom">
                            <div className="footer_india_div">
                                <Button className="footer_india_btn">
                                    <img src={indiaFlag} alt="India" className="footer_india_flag" />
                                    <span>India</span>
                                </Button>
                            </div>
                            <div className="footer_border_top"></div>
                            <div className="footer_payment_div">
                                <img src={paymentIcons} alt="Payment Icons" className="payment_icons" />
                            </div>
                            <div className="footer_copyright">
                                <p className="copyright">&copy; PUMA India Ltd, {new Date().getFullYear()}. All Rights Reserved.</p>
                                <p className="copyright_link">Imprint and Legal Data</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer