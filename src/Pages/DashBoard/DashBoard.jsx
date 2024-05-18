import BASEURL from "../../../Constants"
import logo from "../../assets/logo/logo-main.png"
import Analytics from "./DashboardComponent/Analytics"
import ApprovedTracks from "./DashboardComponent/ApprovedTracks"
import CorrectionRequested from "./DashboardComponent/CorrectionRequested"
import Drafts from "./DashboardComponent/Drafts"
import MyBlance from "./DashboardComponent/MyBlance"
import News from "./DashboardComponent/News"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DashBoard = () => {
  const id = localStorage.getItem("user_id");
    // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
    const { data: correctionSingleTrack = [], isLoading, refetch } = useQuery({
      queryKey: ["correctionSingleTrack"],
      queryFn: async () => {
        try {
          const response = await axios.get(`${BASEURL}/user/correction-single-track/${id}`, {
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
      // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: correctionAlbum = [],  } = useQuery({
    queryKey: ["correctionAlbum"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASEURL}/user/correction-album/${id}`, {
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
  console.log("correctionAlbum:", correctionAlbum);
    // console.log("correctionSingleTrack:", correctionSingleTrack);
  return (
    <div className=' grid grid-cols-12 gap-5'>
     <div className="col-span-8">
            <Analytics></Analytics>
            <ApprovedTracks></ApprovedTracks>
            <News></News>
          </div>
          <div className="col-span-4">
            <CorrectionRequested  song={correctionSingleTrack?.data}></CorrectionRequested>
            <Drafts song={correctionAlbum?.data}></Drafts>
            <MyBlance></MyBlance>
          </div>
    </div>
  )
}

export default DashBoard