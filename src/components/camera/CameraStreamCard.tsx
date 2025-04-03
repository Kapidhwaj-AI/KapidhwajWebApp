"use client";
import { IconBorderCornerSquare, IconEye } from "@tabler/icons-react";
import LiveBadge from "./LiveBadge";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function CameraStreamCard() {
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
            {/* Live Badge - Top Left */}
            < div className="absolute top-3 left-3" >
                <LiveBadge />
            </div >
            <div className={cn("w-full px-4 pb-4 absolute bottom-0",
                cameraDetailView === 'overview' && 'hidden',
            )}>
                <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-3 px-4 shadow-lg">
                    {/* Your content here */}
                    <div className="flex justify-between items-center">
                        {/* Left text section */}
                        <div className="flex flex-col text-white ml-2">
                            <span className="font-bold text-md">Main Office</span>
                            <span className="text-sm text-gray-300">HQ &gt; Frontside Camera</span>
                        </div>

                        {/* Right icon circle */}
                        <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center">
                            <IconBorderCornerSquare className="rotate-90" color="white" stroke={4} size={15} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}