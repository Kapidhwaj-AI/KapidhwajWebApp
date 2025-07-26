"use client";

import { Camera, CameraLocation } from "@/models/camera";
import LiveBadge from "./LiveBadge";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux/store";
import {
  IconChevronRight,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFullScreenMode } from "@/redux/slices/cameraSlice";
import { getLocalStorageItem } from "@/lib/storage";


export default function CameraStreamCardMedium({ camera, camLocation }: { camera?: Camera; camLocation?: CameraLocation }) {
  const isFullscreen = useSelector((state:RootState)=> state.camera.isFullScreen)
 
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div
      className={cn( isFullscreen?"absolute top-0 left-0 right-0 w-full h-full overflow-hidden":
        "h-48 sm:h-64 md:min-h-70 md:max-h-70 lg:min-h-80 lg:max-h-80 2xl:min-h-110 2xl:max-h-110 bg-white dark:bg-gray-800 rounded-xl md:rounded-3xl lg:rounded-4xl",
        "overflow-hidden flex items-center justify-center relative ring-background"
      )}
    >
      <iframe
        src={camera?.webrtc_url}
        allowFullScreen
        className="w-[100%] h-[100%] rounded-4xl"
      >
        Your browser does not support the video tag.
      </iframe>
      <div className="absolute top-2 left-2 md:top-3 md:left-3">
        <LiveBadge />
      </div>
     
      <div
        className={cn(
          "w-full px-2 md:px-4 pb-2 md:pb-4 absolute bottom-0"

        )}
      >
        <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-1 md:py-3 px-2 md:px-4 shadow-lg">
          <div className="flex justify-between items-center">
            {/* Left text section */}
            <div className="flex flex-col text-white ml-1 md:ml-2">
              {camLocation?.parantFolder !== "NA" && <span className="font-bold text-sm md:text-md">{camLocation?.parantFolder}</span>}
              <span className="text-xs md:text-sm flex gap-1 items-center  text-gray-300">
                {camLocation?.organization} <IconChevronRight size={16} className=" text-gray-400" />  {camera?.name}

              </span>
            </div>

            {/* Right icon circle */}
            <div className="h-8 w-8 md:h-14 md:w-14 text-white rounded-full bg-black flex items-center justify-center">
              <button onClick={() => {dispatch(setIsFullScreenMode(!isFullscreen))}}>
                {isFullscreen ? <IconMinimize stroke={2} size={16} /> :<IconMaximize stroke={2} size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
