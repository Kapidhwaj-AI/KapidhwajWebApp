
import { protectApi } from "@/lib/protectApi";
import { getLocalStorageItem } from "@/lib/storage";
import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";
import { useEffect, useState } from "react";
import { HomeProfileCard } from "@/views/home/Home.profile.card";
import { RootState, useStore } from "@/store";

export const HomeProfileCardController = ({ devices }: { devices: number }) => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const [isValidHub, setIsValidHub] = useState(false)
  const savedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}');
  const savedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}');
  const localHub = useStore((state: RootState) => state.hub.localHub)
  const remoteHub = useStore((state: RootState) => state.hub.remoteHub)
  useEffect(() => {
    if (((remoteHub !== null || localHub !== null) && (remoteHub?.id || localHub?.id)) || (savedLocalHub?.id || savedRemoteHub?.id)) {
      setIsValidHub(true)
    }
  }, [localHub, remoteHub])
  useEffect(() => {
    const staticPort = remoteHub?.static_port || savedRemoteHub?.static_port
    const id = localHub?.id || savedLocalHub.id
    const baseUrl = isValidHub ? remoteHub?.id ? `http://turn.kapidhwaj.ai:${staticPort}/` : `http://${id}.local:3000/`: GOOGLE_KPH_BUCKET_URL
    const fetchUserDetails = async () => {
      try {
        const res = await protectApi<{ profile_image: string, name: string }>('/user', "GET", undefined, undefined, true)
        const data = res.data.data;
        setUserImage(`${data.profile_image ? baseUrl + data.profile_image : '/dummy-user.webp'}`);
        setName(data.name);

      } catch (error) {
        console.error("Error while fetching user", error)
      } finally {

      }

    };

    fetchUserDetails();
  }, [isValidHub]);

  return (
    <HomeProfileCard imagePath={userImage} name={name} devices={devices} />
  );
};
