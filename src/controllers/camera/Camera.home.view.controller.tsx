"use client";

import { CameraHomeView } from "@/components/camera/Camera.home.view";
import { protectApi } from "@/lib/protectApi";
import { Camera } from "@/models/camera";
import React, { useEffect, useState } from "react";

export const CameraHomeViewController = ({

}: {
  }) => {
  const [cameras, setCameras] = useState<Camera[]>([]);

  useEffect(() => {
    const fetchCameras = async () => {

      console.log('camera')
      try {
        const res = await protectApi<{cameras:{camera:Camera}[]}>('/camera');
        const data = res.data.data;
        const cleanedCameras = data.cameras.map((cam: any) => cam.camera);
        console.log(cleanedCameras,"fav")
        setCameras(cleanedCameras);
      } catch (error) {
        console.error("Error fetching camera", error);

      }
      finally {

      }

    };

    fetchCameras();
  }, []);

  return <CameraHomeView cameras={cameras} />;
};
