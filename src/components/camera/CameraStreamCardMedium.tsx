"use client";

import LiveBadge from "./LiveBadge";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import {
  IconBorderCornerSquare,
  IconEye,
  IconMaximize,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";

export default function CameraStreamCardMedium() {
  const cameraDetailView = useSelector(
    (state: RootState) => state.camera.cameraDetailView
  );

  return (
    <div
      className={cn(
        "h-48 sm:h-64 md:min-h-70 md:max-h-70 lg:min-h-80 lg:max-h-80 2xl:min-h-110 2xl:max-h-110 bg-white dark:bg-gray-800 rounded-xl md:rounded-3xl lg:rounded-4xl",
        "overflow-hidden flex items-center justify-center relative ring-background"
      )}
      style={{
        backgroundImage: "url('/assets/images/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Live Badge - Top Left */}
      <div className="absolute top-2 left-2 md:top-3 md:left-3">
        <LiveBadge />
      </div>

      <div
        className={cn(
          "w-full px-2 md:px-4 pb-2 md:pb-4 absolute bottom-0",
          cameraDetailView === "overview" && "hidden"
        )}
      >
        <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-1 md:py-3 px-2 md:px-4 shadow-lg">
          <div className="flex justify-between items-center">
            {/* Left text section */}
            <div className="flex flex-col text-white ml-1 md:ml-2">
              <span className="font-bold text-sm md:text-md">Main Office</span>
              <span className="text-xs md:text-sm text-gray-300">
                HQ &gt; Frontside
              </span>
            </div>

            {/* Right icon circle */}
            <div className="h-8 w-8 md:h-14 md:w-14 text-white rounded-full bg-black flex items-center justify-center">
              <button>
                <IconMaximize stroke={2} size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
