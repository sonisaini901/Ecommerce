import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import "./HeaderSearch.css";
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import shoes from "../../assests/images/home/shoes.webp";

const searchLists = [
    {
        title: "Shoes",
        link: "/",
    },
    {
        title: "Sneakers",
        link: "/",
    },
    {
        title: "Jacket",
        link: "/",
    },
    {
        title: "Cap",
        link: "/",
    },
    {
        title: "Bag",
        link: "/",
    }
]

const products = [
    {
        image: shoes,
        title: "Softride Frequence Street Running Shoes",
        price: "₹3,150",
        baseprice: "₹6,999",
        link: "/",
    },
    {
        image: shoes,
        title: "Softride Frequence Street Running Shoes",
        price: "₹3,150",
        baseprice: "₹6,999",
        link: "/",
    },
    {
        image: shoes,
        title: "Softride Frequence Street Running Shoes",
        price: "₹3,150",
        baseprice: "₹6,999",
        link: "/",
    },
    {
        image: shoes,
        title: "Softride Frequence Street Running Shoes",
        price: "₹3,150",
        baseprice: "₹6,999",
        link: "/",
    }
]

const HeaderSearch = ({show, onClose}) => {

    const [search, setSearch] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <Modal 
            show={show} 
            fullscreen={true} 
            onHide={() => onClose()}
            scrollable={true}
            className="search_modal_header"
        >
            <Modal.Header>
                <Container>
                    <Form className="search_form_block" onSubmit={handleSearchSubmit} method="post">
                        <InputGroup>
                            <Form.Control
                                type="test"
                                name="search"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                            <Button id="search_submit">
                                <IoSearchOutline />
                            </Button>
                        </InputGroup>
                    </Form>
                    <Button onClick={onClose} className="close_search_btn">
                        <IoMdClose />
                    </Button>
                </Container>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <div className="search_result_flex">
                        <div className="flex-1">
                            <h2 className="search_result_heading">Trending searches</h2>
                            <ul className="search_result_lists">
                                {searchLists.map((item,i) => (
                                    <li key={i}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-2">
                            <h2 className="search_result_heading">Suggested Products</h2>
                            <ul className="suggested_products">
                                {products.map((item,i) => (
                                    <li key={i} className="suggested_products_item">
                                        <Link to={item.link}>
                                            <img src={item.image} alt={item.title} className="suggested_product_image" />
                                            <div className="suggested_product_content">
                                                <p className="suggested_product_title">{item.title}</p>
                                                <p className="product_price">
                                                    <span>{item.price}</span>
                                                    {item.baseprice && <span className="base">{item.baseprice}</span>}
                                                </p>
                                            </div>
                                        </Link> 
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default HeaderSearch