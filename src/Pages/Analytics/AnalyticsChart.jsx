import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const AnalyticsChart = () => {
  const [series] = useState([44, 55, 41, 17, 15, 50, 85]);
  const [options] = useState({
    chart: {
      type: "donut",
    },

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },

    labels: [
      "Spotify",
      "Tiktalk",
      "Facebook SRP",
      "Boomplay",
      "Snap",
      "Youtube",
      "Saavn",
    ],
  });

  useEffect(() => {
    // Dynamically import ApexCharts
    import("apexcharts")
      .then(({ default: ApexCharts }) => {
        // Render the chart with updated options
        const apexChart = new ApexCharts(
          document.getElementById("chart"),
          options
        );
        apexChart.render();

        // Clean up when the component unmounts
        return () => apexChart.destroy();
      })
      .catch((error) => {
        // Handle error if ApexCharts couldn't be imported
        console.error("Error importing ApexCharts:", error);
      });
  }, [options]);
  return (
    <div className="analytics-main">
      <h2 className="text-lg font-bold">Total Improvement</h2>
      <div>
        <Chart
          width={600}
          height={550}
          options={options}
          series={series}
          type="donut"
          className="analytics-inner"
        />
      </div>
    </div>
  );
};

export default AnalyticsChart;
