import { CameraStreamCardController } from "@/controllers/camera/Camera.stream.card.controller";
import React from "react";

export const CameraHomeView = ({ cameras }: { cameras: { id: number }[] }) => {
  return (
    <div className="flex-1 overflow-y-auto  scrollbar-hide">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-min">
        {cameras.map((camera) => (
          <CameraStreamCardController key={camera.id} cameraId={camera.id} />
        ))}
      </div>
    </div>
  );
};
