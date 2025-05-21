"use client";

import { HomeProfileCard } from "@/components/home/Home.profile.card";
import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";
import axios from "axios";
import { useEffect, useState } from "react";

export const HomeProfileCardController = () => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const [devices, setDevices] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await axios({ method: "GET", url: "/api/user" });
      const data = res.data.data;

      setUserImage(`${GOOGLE_KPH_BUCKET_URL}${data.profile_image}`);
      setName(data.name);
    };

    fetchUserDetails();
  }, []);

  return (
    <HomeProfileCard imagePath={userImage} name={name} devices={devices} />
  );
};
