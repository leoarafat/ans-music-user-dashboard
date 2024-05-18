import React from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../../Constants";

const News = () => {
  const id = localStorage.getItem("user_id");
  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const {
    data: lastNews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lastNews"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASEURL}/user/news`, {
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
  // console.log(lastNews);
  const newsData = [
    {
      title: "Music",
      des: "ing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful con ing and graphic design, Lorem ipsum is a ",
      date: "15-03-2024",
    },
    {
      title: "Music",
      des: "ing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful con ing and graphic design, Lorem ipsum is a ",
      date: "15-03-2024",
    },
  ];
  return (
    <div className="bg-white p-5 my-5 rounded">
      <div className="flex items-center over-view-title">
        <span className="me-3">
          <IoNewspaperOutline />
        </span>
        <h1>News</h1>
      </div>
      {lastNews?.data?.length > 0 ? (
        <>
          {lastNews?.data?.map((item, index) => {
            // Parse the createdAt date string
            const createdAtDate = new Date(item?.createdAt);

            // Format the date in the desired format
            const formattedDate = `${createdAtDate.toLocaleString("en-US", {
              month: "short",
            })} ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`;
            return (
              <div className="bg-[#F7F7FF] p-3 my-3 rounded" key={index}>
                <div className="flex items-center justify-between">
                  <h2 className="news-title">{item.title}</h2>
                  <p className="news-date">{formattedDate}</p>
                </div>
                <p className="news-des">{item?.description}</p>

                <div>
                  <p className="regards">Regards</p>
                  <p className="ans-music">Ans Music Limited</p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p className="my-4 text-center">No news available</p>
      )}
    </div>
  );
};

export default News;
