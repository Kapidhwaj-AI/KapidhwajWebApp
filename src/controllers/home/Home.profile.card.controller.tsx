
import { BASE_URL, protectApi } from "@/lib/protectApi";
import { getLocalStorageItem } from "@/lib/storage";
// import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";

import { useEffect, useState } from "react";
import { HomeProfileCard } from "@/views/home/Home.profile.card";
import { RootState, useStore } from "@/store";

export const HomeProfileCardController = ({ devices }: { devices: number }) => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await protectApi<{ profile_image: string, name: string }>('/user', "GET", undefined, undefined, true)
        const data = res?.data.data;
        setUserImage(`${data?.profile_image ? BASE_URL + ':3000' + data.profile_image : '/dummy-user.jpg'}`);
        setName(data?.name ?? 'Your Name');

      } catch (error) {
        console.error("Error while fetching user", error)
      } finally {

      }

    };

    fetchUserDetails();
  },[]);

  return (
    <HomeProfileCard imagePath={userImage} name={name} devices={devices} />
  );
};
