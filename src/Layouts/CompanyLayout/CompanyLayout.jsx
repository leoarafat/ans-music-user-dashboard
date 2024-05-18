// import { Outlet } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
// import Navber from "../../Pages/Navber/Navber";
// import SideNavBar from "../../Pages/NewNavber/SideNavBar";
import { useState } from "react";
import Navber from "../../Pages/Navber/Navber";
import SideNavBar from "../../Pages/NewNavber/SideNavBar";

const CompanyLayout = () => {
    const [activeMenu, setActiveMenu] = useState('Information');
    const bookingData = [
        {
            title: 'Information',
            route: "/"
        },
        {
            title: 'Banner',
            route: "/banner",
        },
        {
            title: 'Facilies',
            route: "/facility",
        },
        {
            title: 'Policy',
            route: "/policy",
        },
    ];
    const handleMenuClick = (name) => {
        setActiveMenu(name);
    };
    return (
        <div className="dashboard_bg ">
            <Navber></Navber>
            <div className="flex justify-between  gap-2 w-11/12 mx-auto pt-16">
                <div className="dash_b_left_bg">
                    {/* <LeftManu></LeftManu> */}
                    <SideNavBar></SideNavBar>
                </div>
                <div className="dash_b_right_bg" >
                   <div className="grid grid-cols-6 bg-white px-5 py-2 rounded-md">
                   <div className="col-span-4">
                        <h2 className="text-gray-600 text-xl font-bold">Manage Property</h2>
                    </div>
                    <div className="flex items-center justify-between gap-1 col-span-2 shadow-lg">
                        {
                            bookingData.map((category, i) => {
                                return (
                                    <div className="w-full" key={i}>
                                        <Link to={`/company${category.route}`}><h2 onClick={() => handleMenuClick(category.title)} className={`h-8 w-full p-2 text-[15px] text-gray-600  flex items-center justify-center font-semibold  ${activeMenu === category.title ? "category_items_active" : ""}`}> {category.title}</h2></Link>
                                        {/* <h2 onClick={() => handleMenuClick(category.title)} className={`h-12 flex items-center font-bold px-2 category_items ${activeMenu === category.title ? "category_items_active" : ""}`}> {category.title}</h2> */}

                                    </div>
                                )
                            })
                        }
                    </div>
                   </div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
export default CompanyLayout;