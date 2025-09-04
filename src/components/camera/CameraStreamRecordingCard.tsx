"use client";
import {  IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { RecordedClip } from "@/models/clip";
import { useRef, useState } from "react";
import { BASE_URL } from "@/lib/protectApi";
// import { getLocalStorageItem } from "@/lib/storage";

export default function CameraStreamRecordingCard({ recording }: { recording: RecordedClip }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const handleTogglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            video.play();
            setIsPlaying(true);
        }
    };
    return (
        <div
            className={cn(
                'w-full aspect-video bg-white dark:bg-gray-800 rounded shadow-md lg:shadow-lg',
                'overflow-hidden flex items-center justify-center relative group',
                'transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <video
                ref={videoRef}
                controls
                src={BASE_URL + ':3000/' + recording.recorded_path}
                className="w-full h-full object-cover rounded"
            />

            {(!isPlaying || isHovered) && (
                <button
                    onClick={handleTogglePlay}
                    className={cn(
                        'absolute h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full',
                        'backdrop-blur-sm flex items-center justify-center z-10',
                        'bg-black/20 hover:bg-black/30 transition-all duration-300',
                        'transform hover:scale-110'
                    )}
                >
                    {isPlaying ? (
                        <IconPlayerPause
                            stroke={2}
                            className="text-white/80 hover:text-white"
                            size={24}
                        />
                    ) : (
                        <IconPlayerPlay
                            stroke={2}
                            className="text-white/80 hover:text-white"
                            size={24}
                        />
                    )}
                </button>
            )}
    

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