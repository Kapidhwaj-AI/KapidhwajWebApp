"use client";

import { CameraHomeView } from "@/components/camera/Camera.home.view";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const CameraHomeViewController = () => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const fetchCameras = async () => {
      const res = await axios({ method: "GET", url: "/api/camera" });
      const data = res.data;

      setCameras(data.data.cameras);
    };

    fetchCameras();
  }, []);

  return <CameraHomeView cameras={cameras} />;
};
