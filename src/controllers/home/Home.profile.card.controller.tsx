"use client";

import { HomeProfileCard } from "@/components/home/Home.profile.card";
import { protectApi } from "@/lib/protectApi";
import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";

import { useEffect, useState } from "react";

export const HomeProfileCardController = ({
}: {

  }) => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const [devices, setDevices] = useState(0);
  useEffect(() => {
    const fetchUserDetails = async () => {

      console.log('user')
      try {
        const res = await protectApi<{profile_image:string, name:string}>('/user')
        const data = res.data.data;
        console.log(data, res, "res")
        setUserImage(`${GOOGLE_KPH_BUCKET_URL}${data.profile_image}`);
        setName(data.name);

      } catch (error) {
        console.error("Error while fetching user", error)
      } finally {

      }

    };

    fetchUserDetails();
  }, []);

  return (
    <HomeProfileCard imagePath={userImage} name={name} devices={devices} />
  );
};
