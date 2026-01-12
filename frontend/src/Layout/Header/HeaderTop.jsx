import { Carousel, Container } from "react-bootstrap"

const HeaderTop = () => {
    return(
        <div className="header_top_bar">
            <Container>
                <Carousel fade>
                    <Carousel.Item>
                        <p className="header_top_text">Solve Your Queries Faster Than Ever! Send Us A 'HI' On Whatsapp At 6364929121 <a href="/">Click here</a></p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <p className="header_top_text">⚡️1-DAY Express Delivery In Bangalore!</p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <p className="header_top_text">Your Order's MRP May Vary Due To GST 2.0. Thank You For Understanding.</p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <p className="header_top_text">Free Returns and Exchanges.</p>
                    </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    )
}

export default HeaderTop