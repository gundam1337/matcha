import { useState, useEffect } from 'react';
import axios from 'axios';

const useGETUserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profile", {
          withCredentials: true,
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        });
        setProfileData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfileData();
  }, []);

  return { profileData, error };
};

export default useGETUserProfile;
