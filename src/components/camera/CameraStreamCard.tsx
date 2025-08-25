"use client";

import LiveBadge from "./LiveBadge";
import { cn } from "@/lib/utils";
import { Camera } from "@/models/camera";
import { RootState } from "@/redux/store";
import { IconBorderCornerSquare, IconTrash } from "@tabler/icons-react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteDialog } from "../dialogue/DeleteDialog";
import { useTranslations } from "next-intl";

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
  const cameraDetailView = useSelector(
    (state: RootState) => state?.camera?.cameraDetailView
  );
  const [streamError, setStreamError] = useState<string | null>(null);
  const hasStream = camera?.webrtc_url;

  useEffect(() => {
    const fetchWebrtc = async () => {
      try {
        const res = await fetch(camera?.webrtc_url ?? '')
        if (res.ok) {
          setStreamError(null)
        }
      }
      catch (err) {
        console.error(err)
        setStreamError(err.message ?? 'Some errro')
      }
    }
    fetchWebrtc()
  }, [hasStream]);

  const t = useTranslations()
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
        <iframe
          src={camera.webrtc_url}
          allowFullScreen
          style={{ width: "100%", maxWidth: "800px", height: '100%' }}
        >
          Your browser does not support the video tag.
        </iframe>
      )}
      {streamError === null && hasStream && (
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
                stroke={4}
                size={12}
              />
            </div>
          </div>
        </div>
      </Link>

      {isDelete && handleDelete && setIsDelete && <DeleteDialog title={t('settings.delete_camera_confirm')} data={camera?.camera_id ?? -1} handleDelete={handleDelete} onClose={() => setIsDelete(false)} />}
    </div>
  );
}
