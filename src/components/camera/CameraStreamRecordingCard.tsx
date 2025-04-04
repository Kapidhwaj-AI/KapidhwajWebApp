"use client";
import { IconBorderCornerSquare, IconEye, IconMovie, IconPlayerPlay } from "@tabler/icons-react";
import LiveBadge from "./LiveBadge";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function CameraStreamRecordingCard() {
    const cameraDetailView = useSelector((state: RootState) => state.camera.cameraDetailView);

    return (
        <div
            className={cn(
                "w-full aspect-video bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl lg:rounded-3xl xl:rounded-4xl shadow-md lg:shadow-lg",
                "overflow-hidden flex items-center justify-center relative group",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
            )}
            style={{
                backgroundImage: "url('/assets/images/image.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Play Button (scales with screen size) */}
            <div className={cn(
                "absolute h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full",
                "backdrop-blur-sm flex items-center justify-center",
                "bg-black/20 group-hover:bg-black/30 transition-all duration-300",
                "transform group-hover:scale-110"
            )}>
                <IconPlayerPlay
                    stroke={2}
                    className="text-white/80 group-hover:text-white"
                    size={20}
                    style={{
                        width: "clamp(1rem, 2vw, 1.5rem)",
                        height: "clamp(1rem, 2vw, 1.5rem)"
                    }}
                />
            </div>

            {/* Bottom Controls Bar */}
            {/* <div className={cn(
                "absolute bottom-0 left-0 right-0",
                "bg-gradient-to-t from-black/80 to-transparent",
                "p-2 md:p-3 lg:p-4 flex items-center justify-between",
                "transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            )}>
                 <div className="flex items-center gap-2">
                    <LiveBadge />
                    <span className="text-white text-xs md:text-sm font-medium">
                        Front Camera
                    </span>
                </div> 

                <div className="flex items-center gap-2 md:gap-3">
                    <button className="p-1 md:p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
                        <IconEye className="text-white" size={16} />
                    </button>
                    <button className="p-1 md:p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
                        <IconMovie className="text-white" size={16} />
                    </button>
                </div>
            </div> */}
        </div>
    );
}