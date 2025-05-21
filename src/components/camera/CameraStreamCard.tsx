"use client";
import { IconBorderCornerSquare, IconEye } from "@tabler/icons-react";
import LiveBadge from "./LiveBadge";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Camera } from "@/models/camera";
import { useEffect, useState } from "react";


//adding isFavouritesPage variable to show delete button only if rendered in favourites page

interface CameraStreamCardProps {
    camera: Camera;
    folder: any;
    orgName: string;
    isFavouritesPage?: boolean;
}

export default function CameraStreamCard({ camera, folder, orgName, isFavouritesPage = false }: CameraStreamCardProps) {
    const cameraDetailView = useSelector((state: RootState) => state?.camera?.cameraDetailView);
    const [streamError, setStreamError] = useState<string | null>(null);

    const hasStream = camera?.webrtc_url;

    useEffect(() => {
        if (hasStream) {
            // console.log('WebRTC URL:', camera?.webrtc_url);
            // console.log('RTSP URL:', camera?.rtsp_url);
        }
        setStreamError(null);
    }, [hasStream, camera?.webrtc_url, camera?.rtsp_url]);

    return (
        <div className={cn("w-full aspect-video bg-white dark:bg-gray-800 rounded-4xl shadow-lg",
            "overflow-hidden flex items-center justify-center relative")}
            style={{
                backgroundImage: hasStream ? "none" : "url('/assets/images/image.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            {hasStream && (
                <video
                    src="/api/stream"
                    controls
                    autoPlay
                    muted
                    playsInline
                    style={{ width: '100%', maxWidth: '800px' }}
                >
                    Your browser does not support the video tag.
                </video>
            )}
            {/* {!streamError && hasStream && (
                <div className="absolute top-3 left-3 z-5">
                    <LiveBadge />
                </div>
            )} */}
            <div className="absolute top-4 left-4 z-5">
                <LiveBadge />
            </div>
            {
                isFavouritesPage && (
                    <button className="absolute top-4 right-4 bg-red-600 rounded-full">
                        <svg width="35" height="35" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="19" cy="19" r="19" fill="#FF6868" />
                            <g clipPath="url(#clip0_62_1478)">
                                <path d="M11 14H27" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17 18V24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 18V24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 14L13 26C13 26.5304 13.2107 27.0391 13.5858 27.4142C13.9609 27.7893 14.4696 28 15 28H23C23.5304 28 24.0391 27.7893 24.4142 27.4142C24.7893 27.0391 25 26.5304 25 26L26 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 14V11C16 10.7348 16.1054 10.4804 16.2929 10.2929C16.4804 10.1054 16.7348 10 17 10H21C21.2652 10 21.5196 10.1054 21.7071 10.2929C21.8946 10.4804 22 10.7348 22 11V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_62_1478">
                                    <rect width="24" height="24" fill="white" transform="translate(7 7)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                )
            }
            {/* <button className="absolute top-4 right-4 bg-red-600 rounded-full">
                <svg width="35" height="35" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19" cy="19" r="19" fill="#FF6868" />
                    <g clip-path="url(#clip0_62_1478)">
                        <path d="M11 14H27" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17 18V24" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21 18V24" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 14L13 26C13 26.5304 13.2107 27.0391 13.5858 27.4142C13.9609 27.7893 14.4696 28 15 28H23C23.5304 28 24.0391 27.7893 24.4142 27.4142C24.7893 27.0391 25 26.5304 25 26L26 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 14V11C16 10.7348 16.1054 10.4804 16.2929 10.2929C16.4804 10.1054 16.7348 10 17 10H21C21.2652 10 21.5196 10.1054 21.7071 10.2929C21.8946 10.4804 22 10.7348 22 11V14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_62_1478">
                            <rect width="24" height="24" fill="white" transform="translate(7 7)" />
                        </clipPath>
                    </defs>
                </svg>
            </button> */}
            <div className={cn("w-full px-4 pb-4 absolute bottom-0",
                cameraDetailView === 'overview' && 'hidden',
            )}>
                <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-3 px-4 shadow-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col text-white ml-2">
                            <span className="font-bold text-md">{camera?.name} trial camera name</span>
                            <span className="text-sm text-gray-300">{orgName} trial org &gt; {folder?.name} trial folder</span>
                        </div>
                        <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center">
                            <IconBorderCornerSquare className="rotate-90" color="white" stroke={4} size={15} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}