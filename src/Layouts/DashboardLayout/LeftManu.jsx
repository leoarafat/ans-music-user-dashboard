// import Link from "next/link";

import { Link } from "react-router-dom";

const LeftManu = () => {
    const sideManu = [
        {
            manu: "Profile",
            route: "/profile",
            item: [""]
        },
        {
            manu: "Order",

            route: "/order", item: [""]
        },
        {
            manu: "Booking",
            route: "/booking",
            item: ["Hotel", "Room", "Car"]
        },
        {
            manu: "categories",
            route: "/categories",
            item: ["Hotel", "Room", "Car"]
        },
        {
            manu: "Page Setup",
            route: "/page-setup",
            item: ["Hotel", "Room", "Car"]
        },
    ]
    return (
        <div className="shadow-md h-screen">
            <ul className="left_manu_ul">
                {
                    sideManu.map((item, index) => <li key={index}> <Link to={item.route}>{item.manu}</Link></li>)
                }

            </ul>
        </div>
    )
}
export default LeftManu;

