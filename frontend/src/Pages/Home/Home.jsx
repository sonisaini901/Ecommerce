import { useDispatch, useSelector } from "react-redux"
import TopCategories from "../../Components/TopCategories/TopCategories"
import SEO from "../../Layout/SEO"
import Banner from "./Banner/Banner"
import ShoesShowcase from "./ShoesShowcase/ShoesShowcase"
import ShopLookSection from "./ShopLookSection/ShopLookSection"
import SlidesSection from "./SlidesSection/SlidesSection"
import SportsSection from "./SportsSection/SportsSection"
import TrendingProducts from "./TrendingProducts/TrendingProducts"
import { useSnackbar } from "notistack"
import { clearProductsErrors, getSliderProducts } from "../../Store/Actions/ProductActions"
import { useEffect } from "react"

const Home = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearProductsErrors());
        }
        dispatch(getSliderProducts());
    }, [dispatch, error, enqueueSnackbar]);

    return(
        <>
            <SEO title={"Home - Forever Faster"} />
            
            <Banner />
            <ShopLookSection />
            <ShoesShowcase />
            <SlidesSection />
            <TopCategories />
            <SportsSection />
            {!loading &&
                <TrendingProducts />
            }
        </>
    )
}

export default Home