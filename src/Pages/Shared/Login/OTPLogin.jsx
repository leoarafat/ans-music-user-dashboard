import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/login/login.png";
import BASEURL from "../../../../Constants";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVarify = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(20); // Initial countdown timer value
  const [resendDisabled, setResendDisabled] = useState(true);
  const [inputValues, setInputValues] = useState(['', '', '', '']);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setResendDisabled(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    const code = newInputValues.join('');
    setVerificationCode(code);
  };

  const LoginWithOtp = async (event) => {
    event.preventDefault();
    const data ={
      activation_code: verificationCode,
      activation_token: token
    }
    try {
      const response = await axios.post(`${BASEURL}/user/activate-user`, data);
      toast.success(`${response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response.data)
      const token = response?.data?.data?.accessToken;
      const userId = response?.data?.data?.user?._id;
      const isVerified = response?.data?.data?.user?.isVerified;

      if (response.data.success == true) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", userId);
        localStorage.setItem("isVerified", isVerified);
        // localStorage.removeItem("email");
        navigate("/");
      }
      return response.data;
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
  };

  const handleResend = () => {
    // Reset timer and any other necessary state
    setTimer(20);
    setResendDisabled(true);
    // Send verification code again
    console.log("Resending verification code...");
  };
console.log(verificationCode);
  return (
    <div className="md:h-screen flex justify-center items-center">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-md shadow-lg">
          <div className="img w-full">
            <img src={img} className=" w-full md:rounded-l-md" alt="img" />
          </div>
          <div className=" p-5 md:p-10 lg:p-20">
            <div>
              <h3 className="text-2xl md:my-3 font-bold capitalize">
                Sign In to your Account
              </h3>
              <span className="text-[#64748B] text-sm">
                Enter Verification Code
              </span>
              <p className="text-sm font-semibold my-2 md:my-5">
                The SMS with a verification code was sent to the specified{" "}
                <span className="font-bold">{email}</span>. If this number is
                not yours and you misspelled it, click edit.
              </p>
            </div>

            <form onSubmit={LoginWithOtp}>
              <div className="input_box grid grid-cols-4 gap-8 my-3">
                {inputValues.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    placeholder="0"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    required
                    className="input text-center font-bold text-xl w-full  input-bordered"
                  />
                ))}
              </div>
              <span id="time_count" className="text-[#64748B] text-sm pt-4">
                {timer > 0 ? `Send again in ${timer} seconds` : null}
              </span>
              {
              resendDisabled &&
               timer === 0 && (
                <span
                  onClick={handleResend}
                  className="text-green-600 font-semibold my-2 text-sm"
                  // className="btn border-none bg-gradient-to-r from-[#199332] to-[#5CB324] hover:bg-gradient-to-r text-lg hover:from-[#5CB324] hover:to-[#199332] transition text-white"
                >
                  Resend
                </span>
              )}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn border-none bg-gradient-to-r from-[#199332] to-[#5CB324] hover:bg-gradient-to-r text-lg hover:from-[#5CB324] hover:to-[#199332] transition text-white"
                  value={"Sign In"}
                />
              </div>
            </form>
            <div>
              <div className="text-center p-1 mt-4 text-sm">
                <span>Dont have an Account?</span>{" "}
                <span>
                  <Link to="/sign-up" className="text-[#199332] font-semibold">
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVarify;
