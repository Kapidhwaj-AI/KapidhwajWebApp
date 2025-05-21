"use client";

import LiveBadge from "./LiveBadge";
import { cn } from "@/lib/utils";
import { Camera } from "@/models/camera";
import { RootState } from "@/redux/store";
import { IconBorderCornerSquare, IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface CameraStreamCardProps {
  camera: Camera | null;
  folder: any;
  orgName: string;
}

export default function CameraStreamCard({
  camera,
  folder,
  orgName,
}: CameraStreamCardProps) {
  const cameraDetailView = useSelector(
    (state: RootState) => state?.camera?.cameraDetailView
  );
  const [streamError, setStreamError] = useState<string | null>(null);

  const hasStream = camera?.webrtc_url;

  useEffect(() => {
    if (hasStream) {
      // console.log('WebRTC URL:', camera?.webrtc_url);
      // console.log('RTSP URL:', camera?.rtsp_url);
    }
    setStreamError(null);
  }, [hasStream, camera?.webrtc_url, camera?.rtsp_url]);

  return (
    <div
      className={cn(
        "w-full aspect-video bg-white dark:bg-gray-800 rounded-4xl shadow-lg",
        "overflow-hidden flex items-center justify-center relative"
      )}
      style={{
        backgroundImage: hasStream ? "none" : "url('/assets/images/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {hasStream && (
        <video
          src="/api/stream"
          controls
          autoPlay
          muted
          playsInline
          style={{ width: "100%", maxWidth: "800px" }}
        >
          Your browser does not support the video tag.
        </video>
      )}
      {!streamError && hasStream && (
        <div className="absolute top-3 left-3 z-5">
          <LiveBadge />
        </div>
      )}
      <div
        className={cn(
          "w-full px-4 pb-4 absolute bottom-0",
          cameraDetailView === "overview" && "hidden"
        )}
      >
        <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-3 px-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-white ml-2">
              <span className="font-bold text-md">{camera?.name}</span>
              <span className="text-sm text-gray-300">
                {orgName} &gt; {folder?.name}
              </span>
            </div>
            <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center">
              <IconBorderCornerSquare
                className="rotate-90"
                color="white"
                stroke={4}
                size={15}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
