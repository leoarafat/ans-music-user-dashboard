// import LeftManu from "@/Components/Dashboard/LeftManu";
// import Navber from "@/Components/Navber";
// import Link from "next/link";
import { Outlet } from "react-router-dom";
import Navber from "../../Pages/Navber/Navber";
import LeftManu from "./LeftManu";
import SideNavBar from "../../Pages/NewNavber/SideNavBar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard_bg ">
            <Navber></Navber>
            <div className="flex justify-between  gap-2 w-11/12 mx-auto pt-16">
                <div className="dash_b_left_bg">
                    {/* <LeftManu></LeftManu> */}
                    <SideNavBar></SideNavBar>
                </div>
                <div className="dash_b_right_bg" >
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
export default DashboardLayout;