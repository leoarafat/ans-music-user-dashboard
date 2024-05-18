import { useState } from "react";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { LuBookOpenCheck } from "react-icons/lu";
import { IoLogoYoutube } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoAnalyticsOutline } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GiLoveSong } from "react-icons/gi";
import { FaMusic } from "react-icons/fa";
const SideNavBar = () => {
  const navigation = useNavigate();
  
  const verifiedString = localStorage.getItem("isVerified");
  const isVerified = JSON.parse(verifiedString)
  const dashboard = <RiDashboardFill />;
  const myUpload = <GiLoveSong />;
  const user = <FaUsers />;
  const setting = <IoSettingsSharp />;
  const account = <MdManageAccounts />;
  const legal = <LuBookOpenCheck />;
  const youtube = <IoLogoYoutube />;
  const help = <IoIosHelpCircleOutline />;
  const analyse = <IoAnalyticsOutline />;
  const finansial = <SiSimpleanalytics />;
  const onboarding = <FaMusic />;

  const [menus] = useState([
    {
      name: "Dashboard",
      path: "/",
      icon: dashboard,
    },
    {
      name: "My Uploads",
      path: "/my-upload",
      icon: myUpload,
    },
    {
      name: "Manage",
      path: "/manage",
      icon: user,
    },
    {
      name: "Financial ",
      path: "/financial",
      icon: analyse,
    },
    {
      name: "Analytics ",
      path: "/analytics",
      icon: finansial,
    },
    {
      name: "Youtube Request ",
      path: "/youtube-request",
      icon: youtube,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: account,
    },
    {
      name: "Legal",
      path: "/legal",
      icon: legal,
    },
    {
      name: "Help",
      path: "/help",
      icon: help,
    },
    {
      name: "Setting",
      path: "/settings",
      icon: setting,
    },
  ]);
  const [withoutVerifyMenus] = useState([
    {
      name: "onboarding",
      path: "/profile-verification",
      icon: onboarding,
    },
  ]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isVerified");
    navigation("/");
    // console.log("Out");
  };
  return (
    <>
      <div className="navbar-section-main pb-8">
        <div className=" flex flex-col gap-2 md:gap-4 mt-3 ">
          <div className="nav-main-menu ">
            <NavLink
              to="/upload"
              className={
                "dashboard-item bg-[#0B5119] hover:bg-[#0b5113] text-sm shadow-lg   text-white font-bold w-full text-center rounded-full transition my-3 md:mt-5"
              }
            >
              <p className={"flex items-center justify-center p-1 gap-4"}>
                <span className="manu_icon text-2xl">
                  <IoCloudUploadOutline />
                </span>
                <span className="manu_title">START UPLOADING</span>
              </p>
            </NavLink>
          </div>
          {
            isVerified ?
            <>
              {menus.map((menu, index) => (
            <div key={index} className="nav-main-menu">
              <NavLink to={menu.path} className={"dashboard-item "}>
                <p className={"flex items-center gap-3"}>
                  <span className="manu_icon"> {menu.icon}</span>
                  <span className="manu_title">{menu.name}</span>
                </p>
              </NavLink>
            </div>
          ))}
            </>
            :
            <>
            {withoutVerifyMenus.map((menu, index) => (
          <div key={index} className="nav-main-menu">
            <NavLink to={menu.path} className={"dashboard-item "}>
              <p className={"flex items-center gap-3"}>
                <span className="manu_icon"> {menu.icon}</span>
                <span className="manu_title">{menu.name}</span>
              </p>
            </NavLink>
          </div>
        ))}
          </>
          }
        
          <div className="nav-main-menu">
            <button
              onClick={() => handleLogOut()}
              className={"dashboard-item "}
            >
              <p className={"flex items-center gap-3"}>
                <span className="manu_icon text-xl">
                  <TbLogout2 />
                </span>
                <span className="manu_title">Logout</span>
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
