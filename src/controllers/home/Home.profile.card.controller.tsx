"use client";

import { HomeProfileCard } from "@/views/home/Home.profile.card";
import { protectApi } from "@/lib/protectApi";
import { getLocalStorageItem } from "@/lib/storage";
import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";

import { useEffect, useState } from "react";

export const HomeProfileCardController = ({ devices }: { devices: number }) => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const hub = JSON.parse(getLocalStorageItem('hub') ?? '{}')
  const isValidHub = hub && typeof hub === 'object' && 'id' in hub && 'isRemotely' in hub;
  const baseUrl = isValidHub ? hub.isRemotely ? `http://media.kapidhwaj.ai:${hub.static_port}/` : `http://${hub.id}.local:3000/`: GOOGLE_KPH_BUCKET_URL
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await protectApi<{ profile_image: string, name: string }>('/user', "GET", undefined, undefined, true)
        const data = res.data.data;
        setUserImage(`${data.profile_image ? baseUrl + data.profile_image : '/dummy-user.jpg'}`);
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
