import { ApiResponse, protectApi } from '@/lib/protectApi';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Modal from '../ui/Modal';
import { AxiosResponse } from 'axios';
import { getLocalStorageItem } from '@/lib/storage';
import { RootActions, RootState, useStore } from '@/store';


type Point = { x: number; y: number };

const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;

const IntrusionDialogue = ({
    onClose,
    url,
    cameraId,
    handleToggleAiStream,
    setAiLoading
}: {
    onClose: () => void;
    url: string;
    cameraId?: string;
    setAiLoading: (val: boolean) => void;
    handleToggleAiStream: (key: "fire_smoke_detection" | "face_detection" | "intrusion_detection" | "people_count" | "license_plate_detection" | "footfall_count", toggleValue: boolean) => Promise<AxiosResponse<ApiResponse<unknown>, unknown>>
}) => {
    const [points, setPoints] = useState<Point[]>([]);
    const [err, setErr] = useState(false)
    const [isDragging, setIsDragging] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const setSettings = useStore((state: RootActions) => state.setSettings);
    const settings = useStore((state: RootState) => state.singleCameraSettings.settings);
    useEffect(() => {
        const fetchCoords = async () => {
            try {
                setErr(false)
                const res = await protectApi<{box:Point[]}>(`/camera/config?cameraId=${cameraId}`)
                const coords = res.data.data.box;
                if (coords) {
                    setPoints(coords);
                } else {
                    setErr(true)
                    setPoints([
                        { x: 10, y: 10 },
                        { x: REFERENCE_WIDTH-10, y: 10 },
                        { x: REFERENCE_WIDTH-10, y: REFERENCE_HEIGHT-10 },
                        { x: 10, y: REFERENCE_HEIGHT-10 },
                    ]);
                }
            } catch (error) {
                setErr(true)
                console.error(error, "Err:")
                setPoints([
                    { x: 10, y: 10 },
                    { x: REFERENCE_WIDTH - 10, y: 10 },
                    { x: REFERENCE_WIDTH - 10, y: REFERENCE_HEIGHT - 10 },
                    { x: 10, y: REFERENCE_HEIGHT - 10 },
                ]);
            }

        };
        fetchCoords();
    }, [])
    const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDragging(index);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging === null || !svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();

        const scaleX = REFERENCE_WIDTH / rect.width;
        const scaleY = REFERENCE_HEIGHT / rect.height;

        const newPoint = {
            x: (e.clientX - rect.left),
            y: (e.clientY - rect.top),
        };
        requestAnimationFrame(() => {
            setPoints((prevPoints) => {
                const updatedPoints = [...prevPoints];
                updatedPoints[isDragging] = newPoint;
                return updatedPoints;
            });
        });
    };

    const handleMouseUp = () => {
        setIsDragging(null);
        console.log("New polygon (1920x1080 scale):", points);
    };
  

    const scaledPoints = useMemo(() => {
        if (!containerRef.current) return points;
        const rect = containerRef.current.getBoundingClientRect();
        const scaleX = rect.width / REFERENCE_WIDTH;
        const scaleY = rect.height / REFERENCE_HEIGHT;
        return points?.map((p) => ({
            x: p.x ,
            y: p.y,
        }));
    },[points, containerRef.current]);
    const savedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}');
       const savedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}');
       const streamUrl = savedLocalHub.id ? `http://${savedLocalHub.id}.local:8889/${cameraId}` : savedRemoteHub?.id ? `http://turn.kapidhwaj.ai:${savedRemoteHub?.live_port}/${cameraId}` : url
       const handleClose = () => {
           if (!err) {
               handleToggleAiStream("footfall_count", true)
               setSettings({ ...settings, footfall_count: true });
           }
           onClose();
       }
       console.log(points,"points")
    return (
        <Modal className="bg-[var(--surface-200)] dark:bg-gray-800 max-h-[90vh] overflow-auto scrollbar-hide rounded-[29px] w-auto h-auto  p-4 md:p-8 shadow-xl flex flex-col" onClose={handleClose} title="Foot Fall Count">
            <div
                ref={containerRef}
                className="relative w-[960px] aspect-[16/9] rounded"
            >
               <iframe
                    src={streamUrl}
                    allowFullScreen
                    className="absolute w-[960px] aspect-[16/9] rounded"
                />
                <svg
                    ref={svgRef}
                    className="absolute inset-0 w-full h-full"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {scaledPoints.length > 0 && (
                        <>
                            <polygon
                                points={scaledPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                                fill="rgba(255, 1, 1, 0.5)"
                                stroke="white"
                                strokeWidth={2}
                            />
                            {scaledPoints.map((p, i) => (
                                <circle
                                    key={i}
                                    cx={p.x}
                                    cy={p.y}
                                    r={6}
                                    strokeWidth={2}
                                    className="fill-black stroke-white cursor-pointer"
                                    onMouseDown={handleMouseDown(i)}
                                />
                            ))}
                        </>
                    )}
                </svg>
            </div>
        </Modal>
    )
}

export default IntrusionDialogue