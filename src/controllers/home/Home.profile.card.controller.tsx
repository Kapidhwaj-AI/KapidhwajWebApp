"use client";

import { HomeProfileCard } from "@/components/views/home/Home.profile.card";
import { protectApi } from "@/lib/protectApi";
import { getLocalStorageItem } from "@/lib/storage";
import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";

import { useEffect, useState } from "react";

export const HomeProfileCardController = ({ devices }: { devices: number }) => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const hub = JSON.parse(getLocalStorageItem('hub') ?? '{}')
  const baseUrl = hub ? `http://media.kapidhwaj.ai:${hub.static_port}/` : 'http://media.kapidhwaj.ai:3000/'
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await protectApi<{ profile_image: string, name: string }>('/user')
        const data = res.data.data;
        setUserImage(`${baseUrl}${data.profile_image}`);
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
