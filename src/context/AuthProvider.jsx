import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

import { useQuery } from "@tanstack/react-query";
import BASEURL from '../../Constants';
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const id = localStorage.getItem("user_id");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null)
    const [loading, setLoading] =useState(true);
  const [searchValue, setSearchValue] = useState('');
  // for upload song 
  const [uploadData, setUploadData] = useState({});
  const [uploadInfo, setUploadInfo] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [albumSong, setAlbumSong] = useState(null);
// <<<<<<<<< Profile info Data Recived >>>>>>>>>>
const { data: userData = [], isLoading } = useQuery({
  queryKey: ["userData"],
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
      console.log("Respons:", error?.response?.data?.message);
      throw error;
    }
  },
});
  // console.log(userData.data)





// Obgerber state change set
useEffect( () => {
 const id = localStorage.getItem("id")
 const name = localStorage.getItem("name")
 const token = localStorage.getItem("token")
 const userdata = {
  id,
  name,
  token
 }
 setUser(userdata)
  setLoading(false)
  
  
}, [loading])
// console.log(uploadInfo)

    // Auth provider all information share>>>>>>
  const authInfo = {
    albumSong, setAlbumSong,
    startDate,
     setStartDate,
    uploadInfo,
     setUploadInfo,
    uploadData,
    setUploadData,
    isAuthenticated,
    user,
    userData,
    loading,
    setLoading,
    searchValue,
    setSearchValue
  }
  
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider