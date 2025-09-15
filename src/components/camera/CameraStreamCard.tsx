const LiveBadge = dynamic(() => import("./LiveBadge"),);
import { cn } from "@/lib/utils";
import { Camera } from "@/models/camera";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { BASE_URL } from "@/lib/protectApi";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { RootState, useStore } from "@/store";
const DeleteDialog = dynamic(() => import("../dialogue/DeleteDialog").then((mod) => mod.DeleteDialog));
const IconBorderCornerSquare = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconBorderCornerSquare));
const IconTrash = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconTrash),);

interface CameraStreamCardProps {
  camera: Camera | null;
  isFav?: boolean;
  isDelete?: boolean;
  setIsDelete?: (val: boolean) => void
  handleDelete?: (id: number) => void
}

export default function CameraStreamCard({
  camera, isFav, isDelete, setIsDelete, handleDelete
}: CameraStreamCardProps) {
  const cameraDetailView = useStore(
    (state: RootState) => state?.camera?.cameraDetailView
  );
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

  const t = useTranslations('settings')
  return (
    <div
      className={cn(
        "w-full aspect-video bg-white dark:bg-gray-800 rounded-4xl shadow-lg",
        "overflow-hidden flex items-center justify-center relative"
      )}
      style={{
        backgroundImage: camera?.webrtc_url ? "none" : "url('/assets/images/image.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      camera?.webrtc_url ? (
        <iframe
          src={`${BASE_URL}:8889/${camera?.camera_id}/?net=offline`}
          allowFullScreen
          style={{ width: "100%", maxWidth: "800px", height: '100%' }}
        >
          Your browser does not support the video tag.
        </iframe>
      ) 
      {camera?.webrtc_url && (
        <div className="absolute top-3 left-3 z-5">
          <LiveBadge />
        </div>
      )}
      {cameraDetailView !== "focused" && isFav && setIsDelete && (
        <div className="absolute top-3 right-3 z-5 text-white">
          <button onClick={() => setIsDelete(true)} className="rounded-full p-1 bg-[#FF6868]"><IconTrash size={18} /></button>
        </div>
      )}
      <Link
        href={`/streams/${camera?.camera_id}`}
        className={cn(
          "w-full px-4 absolute bottom-2 z-20",
          cameraDetailView === "focused" && "hidden"
        )}
      >
        <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-1 md:py-2 px-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-white ml-2">
              <span className="font-bold text-md">{camera?.name}</span>
            </div>
            <div className="rounded-full bg-black p-4 flex items-center justify-center">
              <IconBorderCornerSquare
                className="rotate-90"
                color="white"
                stroke={'4'}
                size={12}
              />
            </div>
          </div>
        </div>
      </Link>
      {isDelete && handleDelete && setIsDelete && <DeleteDialog title={t('delete_camera_confirm')} data={camera?.camera_id ?? -1} handleDelete={handleDelete} onClose={() => setIsDelete(false)} />}
    </div>
  );
}
