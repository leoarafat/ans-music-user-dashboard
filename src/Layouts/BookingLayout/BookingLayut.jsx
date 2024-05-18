// import { Outlet } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import Navber from "../../Pages/Navber/Navber";
import SideNavBar from "../../Pages/NewNavber/SideNavBar";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
const BookingLayout = () => {
    const [activeMenu, setActiveMenu] = useState('Recent');
    const {searchValue, setSearchValue} = useContext(AuthContext)
    const bookingData = [
        {
            title: 'Recent',
            route: ""
        },
        {
            title: 'Un-Paid',
            route: "/un-paid"
        },
        {
            title: 'Pending',
            route: "/pending"
        },
        // {
        //     title: 'Paid',
        //     route: "/paid"
        // },
        {
            title: 'Confirm',
            route: "/confirm"
        },
        {
            title: 'Check In',
            route: "/check-in"
        },
        {
            title: 'Complete',
            route: "/complete"
        },
        {
            title: 'Cancel',
            route: "/cancel"
        },
        // {
        //     title: 'All',
        //     route: "/all"
        // },
    ];

    const handleMenuClick = (name) => {
        setActiveMenu(name);
    };



// console.log(searchValue)
    return (
        <div className="dashboard_bg ">
             <Helmet>
      <title>Admin-Bookings</title>
      </Helmet>
            <Navber></Navber>
            <div className="flex justify-between  gap-2 w-11/12 mx-auto pt-16">
                <div className="dash_b_left_bg">
                    {/* <LeftManu></LeftManu> */}
                    <SideNavBar></SideNavBar>
                </div>
                <div className="dash_b_right_bg" > 
                    <div className="flex items-center justify-between bg-white px-5 py-2 rounded-md">
                        <div className="flex items-center gap-4 md:gap-9">
                            <h2 className="text-gray-600 text-xl font-bold">Bookings</h2>
                            <div className="relative h-[24px]">
                                <input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Search booking data" className="input p-3 shadow input-xs w-full pr-16" />
                            </div>
                        </div>
                        <div className="flex items-center justify-end  shadow-lg px-2">
                            {
                                bookingData.map((category, i) => {
                                    return (
                                        <div className="inline-block" key={i}>
                                            <Link to={`/booking${category.route}`}><h2 onClick={() => handleMenuClick(category.title)} className={`h-8 w-full px-2 text-[15px] text-gray-600 inline-block font-semibold  ${activeMenu === category.title ? "category_items_active" : ""}`}> {category.title}</h2></Link>
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
export default BookingLayout;