import { IoSearchOutline } from "react-icons/io5";
import "./PageNotFound.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { useState } from "react";
import { Link } from "react-router-dom";
import TrendingProducts from "../Home/TrendingProducts/TrendingProducts";
import InsperationSection from "../../Components/InsperationSection/InsperationSection";
import NeedHelpSection from "../../Components/NeedHelpSection/NeedHelpSection";

const trendingCategories = [
    {
        link: "/",
        title: "Running",
    },
    {
        link: "/",
        title: "Men's T-Shirts",
    },
    {
        link: "/",
        title: "Clothing",
    },
    {
        link: "/",
        title: "Motorsport",
    },
    {
        link: "/",
        title: "Women Accessories",
    }
]

const PageNotFound = () => {

    const [search, setSearch] = useState("");
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <>
            <div className="page_not_found_top section-padding">
                <Container>
                    <Row>
                        <Col>
                            <div className="page_not_found_main">
                                <div className="page_not_found_block">
                                    <h1 className="main_heading large">We're Sorry, We Didn't Find What You Are Looking For</h1>
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
                                </div>
                                <div className="page_not_found_block">
                                    <h2 className="main_heading large">Trending Categories</h2>
                                    <div className="trending_categories_lists">
                                        {trendingCategories.map((item,i) => (
                                            <Link to={item.link} key={i} className="categories_link">
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <TrendingProducts />

            <InsperationSection />

            <NeedHelpSection />

        </>
    )
}

export default PageNotFound