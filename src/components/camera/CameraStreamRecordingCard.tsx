import { cn } from "@/lib/utils";
import { RecordedClip } from "@/models/clip";
import { useEffect, useRef, useState } from "react";
import { getLocalStorageItem } from "@/lib/storage";
import { Pause, Play } from "lucide-react";
import { RootState, useStore } from "@/store";

export default function CameraStreamRecordingCard({ recording }: { recording: RecordedClip }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isValidHub, setIsValidHub] = useState(false)
    const savedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}');
    const savedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}');
    const localHub = useStore((state: RootState) => state.hub.localHub)
    const remoteHub = useStore((state: RootState) => state.hub.remoteHub)
    useEffect(() => {
        if (((remoteHub !== null || localHub !== null) && (remoteHub?.id || localHub?.id)) || (savedLocalHub?.id || savedRemoteHub?.id)) {
            setIsValidHub(true)
        }
    }, [localHub, remoteHub])
    const staticPort = remoteHub?.static_port || savedRemoteHub?.static_port
    const id = localHub?.id || savedLocalHub.id
    const baseUrl = isValidHub ? remoteHub?.id ? `http://media.kapidhwaj.ai:${staticPort}/` : `http://${id}.local:3000/` : 'http://media.kapidhwaj.ai:3000/'
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
                'transition-all duration-300 hover:shadow-xl hover:scale-[1.01] snap-start'
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <video
                ref={videoRef}
                controls
                src={baseUrl + recording.recorded_path}
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
                        <Pause
                            stroke={'2'}
                            className="text-white/80 hover:text-white"
                            size={24}
                            fill="currentColor"
                        />
                    ) : (
                        <Play
                            stroke={'2'}
                            className="text-white/80 hover:text-white"
                            size={24}
                                fill="currentColor"

                        />
                    )}
                </button>
            )}
        </div>
    );
}