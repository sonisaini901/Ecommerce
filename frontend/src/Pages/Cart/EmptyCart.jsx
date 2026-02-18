import { RiShoppingCartLine } from "react-icons/ri"

const EmptyCart = () => {
    return(
        <div className="empty_cart_block">
            <RiShoppingCartLine />
            <h2 className="main_heading text-center">Your Shopping Cart is Empty</h2>
        </div>
    )
}

export default EmptyCart