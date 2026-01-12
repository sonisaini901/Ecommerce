import "./ShopLookSection.css";
import { Col, Row, Container, Button } from "react-bootstrap";
import look1 from "../../../assests/images/home/look/Lookbook1.webp";
import look2 from "../../../assests/images/home/look/Lookbook2.webp";
import look3 from "../../../assests/images/home/look/Lookbook3.webp";
import look4 from "../../../assests/images/home/look/Lookbook4.webp";
import { Link } from "react-router-dom";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaLink, FaRegEnvelope } from "react-icons/fa";
import { useState } from "react";
import { useSnackbar } from "notistack";

const looksLists = [
    {
        image: look1,
        title: "LookBook",
        link: "/",
    },
    {
        image: look2,
        title: "LookBook",
        link: "/",
    },
    {
        image: look3,
        title: "LookBook",
        link: "/",
    },
    {
        image: look4,
        title: "LookBook",
        link: "/",
    }
]

const ShopLookSection = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [activeShareIndex, setActiveShareIndex] = useState(null);

    const toggleShare = (index) => {
        setActiveShareIndex(activeShareIndex === index ? null : index);
    };

    const handleCopyLink = (link) => {
        navigator.clipboard.writeText(window.location.origin + link)
        .then(() => {
            enqueueSnackbar("Link copied to clipboard!", {
                variant: "success",
            });
        })
        .catch((err) => {
            console.error("Failed to copy: ", err);
        });
    };

    return(
        <div className="shoop_look_section section-padding">
            <Container>
                <Row>
                    <Col>
                        <h2 className="main_heading">Shop The Look</h2>
                        <div className="less-top-padding shop_look_grid">
                            {looksLists.map((item,i) => (
                                <div className="shop_look_item" key={i}>
                                    <Link to={item.link}>
                                        <img src={item.image} alt={item.title} className="shop_look_image" />
                                        <div className="shop_loop_btn">
                                            <Button className="btn_bordered_white btn_shop_look">Shop the look</Button>
                                        </div>
                                        <div className="share_shop_look">
                                            <Button className="share_btn_look" onClick={() => toggleShare(i)}>
                                                <IoShareSocialOutline />
                                            </Button>
                                            {activeShareIndex === i &&
                                            <>
                                                <Button 
                                                    className="share_btn_look"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <FaRegEnvelope />
                                                </Button>

                                                <Button 
                                                    className="share_btn_look"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleCopyLink(item.link);
                                                    }}
                                                >
                                                    <FaLink />
                                                </Button>
                                            </>
                                            }
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ShopLookSection