import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Navber from "../../Pages/Navber/Navber";
import SideNavBar from "../../Pages/NewNavber/SideNavBar";
import { FiFilter } from 'react-icons/fi';
import { MdContentPasteSearch } from 'react-icons/md';


const ManagePropertyLayout = () => {
    const [activeMenu, setActiveMenu] = useState('Hotel List');
    const [startDate, setStartDate] = useState(new Date());
    const bookingData = [
        {
            title: 'Hotel List',
            route: ""
        },
        {
            title: 'Add Hotel',
            route: "/create-property"
        },
        {
            title: 'Add Location',
            route: "/hotel-location"
        },
        {
            title: 'Hotel Facilites',
            route: "/hotel-facilites"
        },
        {
            title: 'Room Facilites',
            route: "/room-facilites"
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
                <div className="dash_b_right_bg " >
                    <div className=" flex justify-between items-center bg-white px-5 mb-1 py-2 shadow-md rounded-md">
                        <h2 className="text-gray-600 text-xl font-bold ">Manage Property</h2>
                        <div className="flex items-center justify-end gap-1 w-9/12 shadow-lg">
                            {
                                bookingData.map((category, i) => {
                                    return (
                                        <div className="" key={i}>
                                            <Link to={`/manage-property${category.route}`}><h2 onClick={() => handleMenuClick(category.title)} className={`h-8 w-full p-2 text-[15px] text-gray-600  flex items-center justify-center font-semibold  ${activeMenu === category.title ? "category_items_active" : "category_items_not_active"}`}> {category.title}</h2></Link>
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
export default ManagePropertyLayout;