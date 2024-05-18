import React from "react";
import Filter from "./Filter";
import AnalyticsChart from "./AnalyticsChart";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CirclesWithBar } from "react-loader-spinner";
import BASEURL from "../../../Constants";

const Analytice = () => {
  const id = localStorage.getItem("user_id");

  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: analyticsData = [], isLoading } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/user/correction-single-track/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        return response.data;
      } catch (error) {
        // setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    );
  }
  console.log(analyticsData);
  return (
    <div>
      <Filter></Filter>
      <AnalyticsChart></AnalyticsChart>
    </div>
  );
};

export default Analytice;
