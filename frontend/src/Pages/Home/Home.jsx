import TopCategories from "../../Components/TopCategories/TopCategories"
import SEO from "../../Layout/SEO"
import Banner from "./Banner/Banner"
import ShoesShowcase from "./ShoesShowcase/ShoesShowcase"
import ShopLookSection from "./ShopLookSection/ShopLookSection"
import SlidesSection from "./SlidesSection/SlidesSection"
import SportsSection from "./SportsSection/SportsSection"
import TrendingProducts from "./TrendingProducts/TrendingProducts"

const Home = () => {
    return(
        <>
            <SEO title={"Home - Forever Faster"} />
            
            <Banner />
            <ShopLookSection />
            <ShoesShowcase />
            <SlidesSection />
            <TopCategories />
            <SportsSection />
            <TrendingProducts />
        </>
    )
}

export default Home