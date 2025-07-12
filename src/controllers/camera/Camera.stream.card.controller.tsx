import { CameraStreamCard } from "@/components/camera/Camera.stream.card";
import { protectApi } from "@/lib/protectApi";
import { Camera, CameraLocation } from "@/models/camera";
import { useEffect, useState } from "react";


export const CameraStreamCardController = ({
  camera,
}: {
  camera: Camera;
}) => {
  const [cameraLocation, setCameraLocation] = useState<CameraLocation>()
  useEffect(() => {
    const fetchCameraLocation = async () => {
      try {
        const res = await protectApi(`/camera/cam-details?cameraId=${camera.camera_id}`)
        const data = res.data.data

        setCameraLocation(data)
      } catch (err) {
        console.error("Error while fetching camera location", err)
      }
    }
    if (camera.camera_id) {

      fetchCameraLocation()
    }
  }, [camera?.camera_id])
  return (
    <CameraStreamCard camera={camera} location={cameraLocation} />
  );
};
