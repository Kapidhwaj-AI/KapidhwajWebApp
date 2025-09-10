"use client";

import { Camera, CameraLocation } from "@/models/camera";
const LiveBadge = dynamic(() => import("./LiveBadge"),
  { ssr: false });
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsFullScreenMode } from "@/redux/slices/cameraSlice";
import { getLocalStorageItem } from "@/lib/storage";
import { useEffect, useState } from "react";
const ChevronRight = dynamic(() => import("lucide-react").then((mod) => mod.ChevronRight),
  { ssr: false });
const Maximize = dynamic(() => import("lucide-react").then((mod) => mod.Maximize),
  { ssr: false });

const Minimize = dynamic(() => import("lucide-react").then((mod) => mod.Minimize),
  { ssr: false });
import dynamic from "next/dynamic";


export default function CameraStreamCardMedium({ camera, camLocation }: { camera?: Camera; camLocation?: CameraLocation }) {
  const isFullscreen = useSelector((state: RootState) => state.camera.isFullScreen)
  const savedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}');
  const savedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}');
  const localHub = useSelector((state: RootState) => state.hub.localHub)
  const remoteHub = useSelector((state: RootState) => state.hub.remoteHub)
  const [isValid, setIsValid] = useState(false)
  useEffect(() => {
    if (((remoteHub !== null || localHub !== null) && (remoteHub?.id || localHub?.id)) || (savedLocalHub.id || savedRemoteHub.id)) {
      setIsValid(true)
    }
  }, [localHub, remoteHub])
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div
      style={{
        backgroundImage: camera?.webrtc_url ? "none" : "url('/assets/images/image.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={cn(isFullscreen ? "absolute top-0 left-0 right-0 w-full h-full overflow-hidden" :
        "h-full bg-white dark:bg-gray-800 rounded-xl md:rounded-3xl lg:rounded-4xl",
        "overflow-hidden flex items-center justify-center relative ring-background"
      )}
    >
      {camera?.webrtc_url && <iframe
        src={camera?.webrtc_url}
        allowFullScreen

        style={{ width: '105%', height: '105%' }}
      >
        Your browser does not support the video tag.
      </iframe>}
      {camera?.webrtc_url && <div className="absolute top-2 left-2 md:top-3 md:left-3">
        <LiveBadge />
      </div>}

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
                {camLocation?.organization} <ChevronRight fill="currentColor" size={16} className=" text-gray-400" />  {camera?.name}

              </span>
            </div>

            {/* Right icon circle */}
            <div className="h-8 w-8 md:h-14 md:w-14 text-white rounded-full bg-black flex items-center justify-center">
              <button onClick={() => { dispatch(setIsFullScreenMode(!isFullscreen)) }}>
                {isFullscreen ? <Minimize fill="currentColor" stroke={'2'} size={16} /> : <Maximize fill="currentColor" stroke={'2'} size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
