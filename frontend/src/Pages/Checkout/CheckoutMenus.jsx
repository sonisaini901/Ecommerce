import { Link } from "react-router-dom"

const menus = [
    {
        title: "Cart",
        id: "cart",
        link: "/cart"
    },
    {
        title: "Shipping",
        id: "checkout",
        link: "/checkout"
    },
    {
        title: "Payment",
        id: "payment",
        link: "/checkout/payment"
    },
    {
        title: "Summary",
        id: "summary",
        link: "/checkout/summary"
    }
]

const CheckoutMenus = ({id}) => {

    const activeIndex = menus.findIndex(item => item.id === id);

    return(
        <div className="checkout_menus_lists">
            {menus.map((item, i) => {
                const isActive = i < activeIndex;
                const current = i === activeIndex;

                return (
                    <Link
                        key={item.id}
                        to={item.link}
                        className={`checkout_menu_link ${current ? "current active" : isActive ? "active" : ""}`}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </div>
    )
}

export default CheckoutMenus