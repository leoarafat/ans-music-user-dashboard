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


const TransactionLayout = () => {
    const [activeMenu, setActiveMenu] = useState('All');
    const [startDate, setStartDate] = useState(new Date());
    const bookingData = [
        {
            title: 'All',
            route: "/all"
        },
        {
            title: 'Received',
            route: "/received"
        },
        {
            title: 'Transfer',
            route: "/transfer"
        },
        {
            title: 'Payment',
            route: "/payment"
        },
        {
            title: 'Withdraw',
            route: "/withdraw"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 bg-white px-5 py-2 shadow-md rounded-md">
                        <div className="flex items-center gap-2 relative">
                            <h2 className="text-gray-600 text-xl font-bold">Transaction</h2>
                            <span className="shadow text-xs font-bold">
                                <DatePicker
                                    showIcon
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                />
                            </span>
                            <div className="flex items-center gap-4 absolute top-0 left-64">
                                <span className="flex text-xl items-center justify-center"><MdContentPasteSearch /></span>
                                <span className="h-9 flex text-xl items-center justify-center "><FiFilter /></span>
                            </div>
                            <div className="relative h-[24px]">
                                <input type="text" placeholder="Search" className="input p-1 shadow input-xs w-full " />
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="flex items-center justify-between gap-1 lg:w-3/4 shadow-lg">
                                {
                                    bookingData.map((category, i) => {
                                        return (
                                            <div className="w-full" key={i}>
                                                <Link to={`/transaction${category.route}`}><h2 onClick={() => handleMenuClick(category.title)} className={`h-8 w-full p-2 text-[15px] text-gray-600  flex items-center justify-center font-semibold  ${activeMenu === category.title ? "category_items_active" : ""}`}> {category.title}</h2></Link>
                                                {/* <h2 onClick={() => handleMenuClick(category.title)} className={`h-12 flex items-center font-bold px-2 category_items ${activeMenu === category.title ? "category_items_active" : ""}`}> {category.title}</h2> */}

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
export default TransactionLayout;