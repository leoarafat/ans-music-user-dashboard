// import { Outlet } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import Navber from "../../Pages/Navber/Navber";
import SideNavBar from "../../Pages/NewNavber/SideNavBar";
import { useState } from "react";
const UserLayout = () => {
    const [activeMenu, setActiveMenu] = useState('Pending');
    const bookingData = [
        {
            title: 'Pending',
            route: "/pending"
        },
        {
            title: 'Complete',
            route: "/complete"
        },
        {
            title: 'Cancel',
            route: "/cancel"
        },
        {
            title: 'All',
            route: "/all"
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
                    {/* <div className='shadow-md rounded-md mt-2 bg-white'>
                        <div className="flex justify-between items-center border_bottom p-5">
                            <h3 className='font-semibold text-xl'>Tony Robbins (<span className='text-blue-500'>tony@gmail.com</span>)</h3>
                            <h3 className='flex items-center gap-2 text-sm font-semibold'><span>CUSTOMER</span> <span><FaUserAlt></FaUserAlt></span></h3>
                        </div>
                        <div className="p-5 flex gap-2 items-center">
                            <span className='text-green-500 text-xl'><FaUserAlt></FaUserAlt></span>
                            <div className="flex flex-col">
                                <h5>Customer was created</h5>
                                <span className='text-sm'>Jan 12, 11:13 PM</span>
                            </div>
                        </div>
                    </div> */}
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
export default UserLayout;