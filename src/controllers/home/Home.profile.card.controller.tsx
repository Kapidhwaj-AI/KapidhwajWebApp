"use client";

import { HomeProfileCard } from "@/views/home/Home.profile.card";
import { protectApi } from "@/lib/protectApi";
import { getLocalStorageItem } from "@/lib/storage";
import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";

import { useEffect, useState } from "react";

export const HomeProfileCardController = ({ devices }: { devices: number }) => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
  const localHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
  const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
  console.log("isValid", isValidHub, localHub, remoteHub)
  const baseUrl = isValidHub ? remoteHub ? `http://media.kapidhwaj.ai:${remoteHub.static_port}/` : `http://${localHub.id}.local:3000/`: GOOGLE_KPH_BUCKET_URL
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
