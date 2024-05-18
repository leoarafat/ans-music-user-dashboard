import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import BASEURL from "../../../Constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import adminProfileImg from "../../../src/assets/profile/admin-profile-img.jpg";

const Navber = () => {
  const [authenticated, setAuthenticated] = useState("");
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: profileData = [], isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASEURL}/user/profile/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        return response.data;
      } catch (error) {
        setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
  //   console.log(profileData)

  const handleSignOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("verified");
    navigate("/");
  };
  //   Check Authentication
  if (authenticated === "Unauthenticated.") {
    localStorage.clear();
    navigate("/");
    console.log("LogOut");
    // toast.success("Unauthenticated. Please login again!")
    setAuthenticated("");
  }
  // console.log(profileData.data.image)
  return (
    <div className="shadow-sm fixed top-0 left-0 right-0 py-2 navber_main_bg">
      <div className="flex items-center justify-between text-center w-11/12 mx-auto navber_main_bg">
        <div className="">
          <Link to="/">
            <img src={logo} className=" w-52" alt="" />
          </Link>
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-sm shadow"
          />
        </div>
        <div className="flex justify-end gap-2">
          {/* This section for Notification  */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            </label>
            <div
              tabIndex={0}
              className=" flex items-start justify-start dropdown-content mt-1 z-[1]  shadow-md bg-white rounded-md w-72"
            >
              <div className="main-containt w-full">
                <h2 className="text-sx p-2 font-semibold rounded-t-md text-start text-gray-700 w-full bg-[#EDF2F9]">
                  Notification
                </h2>
                <div className="notifications h-[200px]">
                  <p className="text-sm pt-8 font-semibold text-center text-gray-500">
                    No notification
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* This section for Profile manu  */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {isLoading ? (
                  <img src={adminProfileImg} />
                ) : (
                  <>
                    {" "}
                    {profileData?.data?.image ? (
                      <img src={profileData?.data?.image} />
                    ) : (
                      <img src={adminProfileImg} />
                    )}
                  </>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="">
                  <FaUserShield />
                  Profile
                  {/* {
                                        profileData?.data[0]?.name &&
                                    <span className="text-xs bg-green-50 px-2 rounded-lg">{profileData?.data[0]?.name}</span>
                                    } */}
                </Link>
              </li>
              <li>
                <Link to="/manage" className="">
                  <FaUserShield />
                  Manage
                  {/* {
                                        profileData?.data[0]?.name &&
                                    <span className="text-xs bg-green-50 px-2 rounded-lg">{profileData?.data[0]?.name}</span>
                                    } */}
                </Link>
              </li>
              {/* <li><Link>Settings</Link></li> */}
              {token ? (
                <li onClick={handleSignOut}>
                  <button
                    type="button"
                    className=" btn-xs flex items-center  transition text-center  pl-4 my-2 bg-blue-400 text-white hover:bg-red-500 rounded-full"
                  >
                    <span>
                      <HiOutlineLogout />
                    </span>
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navber;
