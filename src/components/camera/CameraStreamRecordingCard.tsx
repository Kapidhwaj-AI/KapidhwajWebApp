"use client";
import { IconBorderCornerSquare, IconEye, IconMovie, IconPlayerPlay } from "@tabler/icons-react";
import LiveBadge from "./LiveBadge";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function CameraStreamRecordingCard() {
    const cameraDetailView = useSelector((state: RootState) => state.camera.cameraDetailView)

    return (
        < div className={cn("w-full aspect-video bg-white dark:bg-gray-800 rounded-4xl shadow-lg",
            "overflow-hidden flex items-center justify-center relative")}
            style={{
                backgroundImage: "url('/assets/images/image.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }
            }>
            <div className="absolute h-16 w-16 rounded-full backdrop-blur-sm flex items-center justify-center">
                <IconPlayerPlay stroke={2} className="text-gray-600 dark:text-gray-300" size={24} />
            </div>

        </div >
    )
}