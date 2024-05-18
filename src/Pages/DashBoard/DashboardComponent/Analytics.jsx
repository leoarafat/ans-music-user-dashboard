import React, { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BASEURL from "../../../../Constants";


const Analytics = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const [selectedRange, setSelectedRange] = useState("weekly");

  const [data, setData] = useState({
    weekly: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Total Improvements | Last 7 days",
          data: [60, 45, 55, 40, 45, 20, 15],
          borderColor: "#0A8D35",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    monthly: {
      labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
      datasets: [
        {
          label: "Total Improvements | Last Month",
          data: Array.from({ length: 31 }, () =>
            Math.floor(Math.random() * 100)
          ),
          borderColor: "#0A8D35",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    yearly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Total Improvements | This Year",
          data: Array.from({ length: 12 }, () =>
            Math.floor(Math.random() * 100)
          ),
          borderColor: "#0A8D35",
          tension: 0.4,
          fill: true,
        },
      ],
    },
  });

  useEffect(() => {
    // Update data based on selected range
    if (data[selectedRange]) {
      const colors = ["#008D34", "#ffffff"]; // Define your gradient colors here
      const gradient = document
        .createElement("canvas")
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);

      const newData = { ...data };
      newData[selectedRange].datasets[0].backgroundColor = gradient;
      setData(newData);
    }
  }, [selectedRange]);
  const id = localStorage.getItem("user_id");
  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: analytics = [], isLoading, refetch } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASEURL}/user/analytics/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        return response.data;
      } catch (error) {
        // setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
  console.log(analytics?.data);
  return (
    <div className="bg-white p-5 mt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="me-3">
            <FaRegCopy />
          </span>
          <h2>Analytics Visual</h2>
        </div>
        <div>
          <select
            className="option-color"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div className="chart-bg">
        <p className="text-end font-semibold">Total: 0.35</p>
        <Line data={data[selectedRange]} />
      </div>
    </div>
  );
};

export default Analytics;
