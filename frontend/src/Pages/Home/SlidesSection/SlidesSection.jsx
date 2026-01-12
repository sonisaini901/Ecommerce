import "./SlidesSection.css";
import slide1 from "../../../assests/images/home/slide1.webp";
import slide2 from "../../../assests/images/home/slide2.webp";
import slide3 from "../../../assests/images/home/slide3.webp";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const slidesLists = [
    {
        image: slide1,
        title: "Speedcat",
        subtext: "Effortlessly Luxe",
        link: "/",
        color: "black",
    },
    {
        image: slide2,
        title: "Winterwear",
        subtext: "Season's must haves",
        link: "/",
        color: "white",
    },
    {
        image: slide3,
        title: "Magmax Nitro 2",
        subtext: "Let's Bounce",
        link: "/",
        color: "black",
    }
]

const SlidesSection = () => {
    return(
        <div className="slides_section">
            {slidesLists.map((item,i) => (
                <Link 
                    className="slides_section_item section-padding" 
                    key={i} 
                    style={{backgroundImage: `url(${item.image})`}}
                >
                    <Container>
                        <div className={`slides_section_content ${item.color}`}>
                            <h2 className="slides_section_heading">{item.title}</h2>
                            <h3 className="slides_Section_text">{item.subtext}</h3>
                            <Button className="slides_item_btn">Shop Now</Button>
                        </div>
                    </Container>
                </Link>
            ))}
        </div>
    )
}

export default SlidesSection