import { Camera, CameraLocation } from "@/models/camera";
const LiveBadge = dynamic(() => import("./LiveBadge"),
  { ssr: false });
import { cn } from "@/lib/utils";
import { useEffect } from "react";
const ChevronRight = dynamic(() => import("lucide-react").then((mod) => mod.ChevronRight),
  { ssr: false });
const Maximize = dynamic(() => import("lucide-react").then((mod) => mod.Maximize),
  { ssr: false });

const Minimize = dynamic(() => import("lucide-react").then((mod) => mod.Minimize),
  { ssr: false });
import dynamic from "next/dynamic";
import { RootActions, RootState, useStore } from "@/store";
import { getLocalStorageItem } from "@/lib/storage";


export default function CameraStreamCardMedium({ camera, camLocation }: { camera?: Camera; camLocation?: CameraLocation }) {

  const isFullscreen = useStore((state: RootState) => state.camera.isFullScreen);

  useEffect(() => {
    const handlePageHide = () => {

      const iframe = document.querySelector<HTMLIFrameElement>('iframe');
      if (iframe) iframe.src = 'about:blank';
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        if (camera?.webrtc_url) {
          const iframe = document.querySelector<HTMLIFrameElement>('iframe');
          if (iframe) iframe.src = camera.webrtc_url;
        }
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [camera?.webrtc_url]);
  const setIsFullScreenMode = useStore((state: RootActions) => state.setIsFullScreenMode);
  const savedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}');
  const savedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}');
  const url = savedLocalHub.id ? `http://${savedLocalHub.id}.local:8889/${camera?.camera_id}` : savedRemoteHub?.id ? `http://turn.kapidhwaj.ai:${savedRemoteHub?.live_port}/${camera?.camera_id}` : camera?.webrtc_url

  return (
    <div
      style={{
        backgroundImage: camera?.webrtc_url ? "none" : "url('/assets/images/image.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={cn(isFullscreen ? "absolute top-0 left-0 right-0 w-full rounded-2xl overflow-hidden aspect-video " :
        "aspect-[16/9] bg-white dark:bg-gray-800 rounded-xl md:rounded-3xl lg:rounded-4xl overflow-hidden flex items-center justify-center relative ring-background"
      )}
    >
      {camera?.webrtc_url && <iframe
        src={url}
        allowFullScreen

        className='w-full h-full'
      >
        Your browser does not support the video tag.
      </iframe>}
      {camera?.webrtc_url && <div className="absolute top-2 left-2 md:top-3 md:left-3">
        <LiveBadge />
      </div>}

      <div
        className="w-full px-2 md:px-4 pb-2 md:pb-4 absolute bottom-0"
      >
        <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-1 md:py-3 px-2 md:px-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-white ml-1 md:ml-2">
              {camLocation?.parantFolder !== "NA" && <span className="font-bold text-sm md:text-md">{camLocation?.parantFolder}</span>}
              <span className="text-xs md:text-sm flex gap-1 items-center  text-gray-300">
                {camLocation?.organization} <ChevronRight fill="currentColor" size={16} className=" text-gray-400" />  {camera?.name}
              </span>
            </div>
            <div className="h-8 w-8 md:h-14 md:w-14 text-white rounded-full bg-black flex items-center justify-center">
              <button onClick={() => { setIsFullScreenMode(!isFullscreen) }}>
                {isFullscreen ? <Minimize fill="currentColor" stroke={'2'} size={16} /> : <Maximize fill="currentColor" stroke={'2'} size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
