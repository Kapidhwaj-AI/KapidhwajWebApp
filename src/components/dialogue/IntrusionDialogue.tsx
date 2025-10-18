import { ApiResponse, protectApi } from '@/lib/protectApi';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Modal from '../ui/Modal';
import { AxiosResponse } from 'axios';
import { getLocalStorageItem } from '@/lib/storage';
import { RootActions, RootState, useStore } from '@/store';
import Spinner from '../ui/Spinner';
import { showToast } from '@/lib/showToast';
import SelectField from '../ui/Select.field';

type Point = { x: number; y: number };
interface IntrusionRoi {
    A: Point;
    B: Point;
    C: Point;
    D: Point;
    dwell_time?: null | number
}

const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;

const IntrusionDialogue = ({
    onClose,
    url,
    cameraId,
    handleToggleAiStream,
    setAiLoading,
    isTrack
}: {
    onClose: () => void;
    url: string;
    cameraId?: string;
    setAiLoading: (val: boolean) => void;
    isTrack?: boolean;
    handleToggleAiStream: (
        key:
            | 'fire_smoke_detection'
            | 'face_detection'
            | 'intrusion_detection'
            | 'people_count'
            | 'license_plate_detection'
            | 'footfall_count'
            | 'intrusion_track_detection',
        toggleValue: boolean
    ) => Promise<AxiosResponse<ApiResponse<unknown>, unknown>>;
}) => {
    const [points, setPoints] = useState<Point[]>([]);
    const [err, setErr] = useState(false);
    const [isDragging, setIsDragging] = useState<number | null>(null);
    const [dwellTime, setDwellTime] = useState<number | null>(5)
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const setSettings = useStore((state: RootActions) => state.setSettings);
    const settings = useStore(
        (state: RootState) => state.singleCameraSettings.settings
    );
    const [loading, setLoading] = useState(false);
    const toRelative = (p: Point): Point => ({
        x: p.x / REFERENCE_WIDTH,
        y: p.y / REFERENCE_HEIGHT,
    });

    const toAbsolute = (p: Point): Point => ({
        x: p.x * REFERENCE_WIDTH,
        y: p.y * REFERENCE_HEIGHT,
    });
    const roiToArray = (roi: IntrusionRoi): Point[] => [roi.A, roi.B, roi.C, roi.D];
    const arrayToRoi = (arr: Point[]): IntrusionRoi => {
        const ordered = ensureAntiClockwise(arr);
        return { A: ordered[0], B: ordered[1], C: ordered[2], D: ordered[3] };
    };

    // Ensure anticlockwise point ordering
    const ensureAntiClockwise = (pts: Point[]): Point[] => {
        if (pts.length < 3) return pts;
        const area =
            0.5 *
            (pts[0].x * pts[1].y +
                pts[1].x * pts[2].y +
                pts[2].x * pts[3].y +
                pts[3].x * pts[0].y -
                (pts[1].x * pts[0].y +
                    pts[2].x * pts[1].y +
                    pts[3].x * pts[2].y +
                    pts[0].x * pts[3].y));

        return area < 0 ? [...pts].reverse() : pts;
    };

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                setErr(false);
                const res = await protectApi<{ intrusionRoi?: IntrusionRoi; intrusionTrackRoi?: IntrusionRoi }>(
                    `/camera/config?cameraId=${cameraId}&serviceType=${isTrack ? 'intrusion_track_detection' : 'intrusion_detection'}`
                );
                const intrusionRoi = res.data.data.intrusionRoi;
                const intrusionTrackRoi = res.data.data?.intrusionTrackRoi
                if (intrusionRoi && !isTrack) {
                    const absPoints = roiToArray(intrusionRoi);
                    const relativePoints = absPoints.map(toRelative);
                    setPoints(relativePoints);
                } else if (intrusionTrackRoi && isTrack) {
                    setDwellTime(res.data.data.intrusionTrackRoi?.dwell_time ?? 5)
                    const absPoints = roiToArray({ A: intrusionTrackRoi.A, B: intrusionTrackRoi.B, C: intrusionTrackRoi.C, D: intrusionTrackRoi.D });
                    const relativePoints = absPoints.map(toRelative);
                    setPoints(relativePoints);
                }
                else {
                    setErr(true);
                    const defaultPts = [
                        { x: 10, y: 10 },
                        { x: 10, y: REFERENCE_HEIGHT - 10 },
                        { x: REFERENCE_WIDTH - 10, y: REFERENCE_HEIGHT - 10 },
                        { x: REFERENCE_WIDTH - 10, y: 10 },
                    ].map(toRelative);
                    setPoints(defaultPts);
                }
            } catch (error) {
                setErr(true);
                console.error('Err:', error);
                const defaultPts = [
                    { x: 10, y: 10 },
                    { x: 10, y: REFERENCE_HEIGHT - 10 },
                    { x: REFERENCE_WIDTH - 10, y: REFERENCE_HEIGHT - 10 },
                    { x: REFERENCE_WIDTH - 10, y: 10 },
                ].map(toRelative);
                setPoints(defaultPts);
            }
        };
        fetchCoords();
    }, []);

    const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDragging(index);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging === null || !svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        let newX = (e.clientX - rect.left) / rect.width;
        let newY = (e.clientY - rect.top) / rect.height;

        newX = Math.max(0, Math.min(newX, 1));
        newY = Math.max(0, Math.min(newY, 1));

        const newPoint = { x: newX, y: newY };

        requestAnimationFrame(() => {
            setPoints((prevPoints) => {
                const updated = [...prevPoints];
                updated[isDragging] = newPoint;
                return updated;
            });
        });
    };

    const handleMouseUp = () => {
        setIsDragging(null);
        console.log('New polygon (1920x1080 scale):', points);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const absPoints = points.map(toAbsolute);
            const roi = arrayToRoi(absPoints);
            const  payload = { cameraId }
            if (isTrack) {
                console.log(isTrack, "isTrack")
                payload['intrusionTrackRoi'] = { ...roi, dwellTime }
            } else {
                payload['intrusionRoi'] = roi
            }
            const res = await protectApi('/camera/config', 'POST', payload);
            if (res.status === 200) {
                showToast("Intrusion area saved successfully.", "success");
                const serviceType = isTrack ? 'intrusion_track_detection' : 'intrusion_detection'
                const toggle = await handleToggleAiStream(serviceType, true);
                if (toggle.status === 200) {
                    setSettings({ ...settings, [serviceType]: true });
                    onClose()
                }
            }
        } catch (err) {
            console.error('Save Err:', err);
        } finally {
            setLoading(false);
        }
    };

    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setContainerSize({ width: rect.width, height: rect.height });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const scaledPoints = useMemo(() => {
        const { width, height } = containerSize;
        return points.map((p) => ({
            x: p.x * width,
            y: p.y * height,
        }));
    }, [points, containerSize]);

    const savedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}');
    const savedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}');
    const streamUrl = savedLocalHub.id
        ? `http://${savedLocalHub.id}.local:8889/${cameraId}`
        : savedRemoteHub?.id
            ? `http://turn.kapidhwaj.ai:${savedRemoteHub?.live_port}/${cameraId}`
            : url;

    const handleClose = () => {
        if (!err) {
            const serviceType = isTrack ? 'intrusion_track_detection' : 'intrusion_detection'
            handleToggleAiStream(serviceType, true);
            setSettings({ ...settings, [serviceType]: true });
        }
        onClose();
    };

    return (
        <Modal
            className="bg-[var(--surface-200)] dark:bg-gray-800 max-h-[90vh] overflow-auto scrollbar-hide rounded-[20px] w-full sm:w-[95vw] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] gap-3 p-4 md:p-8 shadow-xl flex flex-col"
            onClose={handleClose}
            title="Intrusion"
        >
            {isTrack && <div className='flex justify-end'>
                <SelectField placeholder='Select Seconds' value={dwellTime ?? 5} setValue={(val) => setDwellTime(Number(val))} data={[{ id: 5, name: '5 Seconds' }, { id: 10, name: '10 Seconds' }, { id: 15, name: '15 Seconds' }]} />
            </div>
            }
            <div ref={containerRef} className="relative aspect-video rounded">
                <iframe
                    src={streamUrl}
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded"
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
                                points={scaledPoints.map((p) => `${p.x},${p.y}`).join(' ')}
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

            <div className="flex gap-3 mt-4 justify-end">
                <button
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                    onClick={handleClose}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-[#2B4C88] text-white rounded"
                    onClick={handleSave}
                >
                    {loading ? <Spinner /> : 'Save'}
                </button>
            </div>
        </Modal>
    );
};

export default IntrusionDialogue;
