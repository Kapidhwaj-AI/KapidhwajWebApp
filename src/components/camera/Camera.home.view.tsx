import { CameraStreamCardController } from "@/controllers/camera/Camera.stream.card.controller";
import { Camera } from "@/models/camera";
import React from "react";

export const CameraHomeView = ({ cameras }: { cameras: Camera[] }) => {
  return (
    <div className="flex-1 overflow-y-auto  scrollbar-hide">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-min">
        {cameras.map((camera, index) => (
          <CameraStreamCardController key={camera.camera_id} camera={camera} />
        ))}
      </div>
    </div>
  );
};
