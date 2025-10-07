"use client";
import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { IconRefresh, IconTrash } from "@tabler/icons-react";
import { ApiResponse, protectApi } from "@/lib/protectApi";
import { AxiosResponse } from "axios";
import { getLocalStorageItem } from "@/lib/storage";
import { RootActions, RootState, useStore } from "@/store";

interface Line {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    direction: "in-out" | "out-in";
}

const FootFallDialogue = ({
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
    const [lines, setLines] = useState<Line[]>([]);
    const [loading, setLoading] = useState(true);
    const [cameraError, setCameraError] = useState(false);
    const setSettings = useStore((state: RootActions) => state.setSettings);
    const settings = useStore((state: RootState) => state.singleCameraSettings.settings);
    const fetchLines = async () => {
        try {
            const res = await protectApi<{
                lineCoords: {
                    lx1: number; ly1: number; lx2: number; ly2: number;
                }, footfallOrientationFlag: boolean
            }>(`/camera/config?cameraId=${cameraId}`, 'GET');
            const data = await res?.data?.data;
            setCameraError(false);

            setLines([{
                id: Date.now().toString(),
                x1: data.lineCoords.lx1 / 2,
                y1: data.lineCoords.ly1 / 2,
                x2: data.lineCoords.lx2 / 2,
                y2: data.lineCoords.ly2 / 2,
                direction: data.footfallOrientationFlag ? "in-out" : 'out-in',
            }]);

        } catch (err) {
            console.error("Error fetching lines:", err);
            setCameraError(true);
            const defaultLine: Line = {
                id: Date.now().toString(),
                x1: 300,
                y1: 200,
                x2: 500,
                y2: 200,
                direction: "in-out",
            };
            setLines([defaultLine]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLines();
    }, []);

    const updateLine = (id: string, key: keyof Line, value: number) => {
        setLines((prev) =>
            prev.map((line) => (line.id === id ? { ...line, [key]: value } : line))
        );
    };

    const toggleDirection = (id: string) => {
        setLines((prev) =>
            prev.map((line) =>
                line.id === id
                    ? { ...line, direction: line.direction === "in-out" ? "out-in" : "in-out" }
                    : line
            )
        );
    };

    const deleteLine = (id: string) => {
        setLines((prev) => prev.filter((l) => l.id !== id));
    };

    const addLine = () => {
        const newLine: Line = {
            id: Date.now().toString(),
            x1: 250,
            y1: 250,
            x2: 400,
            y2: 250,
            direction: "in-out",
        };
        setLines((prev) => [...prev, newLine]);
    };

    const handleDrag = (
        e: React.MouseEvent,
        id: string,
        point: "x1y1" | "x2y2"
    ) => {
        const svg = (e.target as SVGElement).closest("svg")!;
        const rect = svg.getBoundingClientRect();

        const move = (ev: MouseEvent) => {
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            if (point === "x1y1") {
                updateLine(id, "x1", x);
                updateLine(id, "y1", y);
            } else {
                updateLine(id, "x2", x);
                updateLine(id, "y2", y);
            }
        };

        const up = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
    };

    const handleSave = async () => {
        setAiLoading(true);
        try {
            const res = await protectApi('/camera/config', 'POST', { cameraId: cameraId, lineCoords: { lx1: lines[0].x1 * 2, ly1: lines[0].y1 * 2, lx2: lines[0].x2 * 2, ly2: lines[0].y2 * 2 }, maskedLineCoords: { w1: 50, h1: 400, w2: 250, h2: 800 }, footfallOrientationFlag: lines[0].direction === 'in-out' ? true : false });
            if (res?.status === 200) {
                const toggelRes = await handleToggleAiStream("footfall_count", true)
                onClose();
                if (toggelRes.status) {
                    setSettings({ ...settings, footfall_count: true });
                }
            }
        } catch (err) {
            console.error("Error saving lines:", err);
        }
    };
    const savedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}');
    const savedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}');
    const streamUrl = savedLocalHub.id ? `http://${savedLocalHub.id}.local:8889/${cameraId}` : savedRemoteHub?.id ? `http://turn.kapidhwaj.ai:${savedRemoteHub?.live_port}/${cameraId}` : url
    const handleClose = () => {
        if (!cameraError) {
            handleToggleAiStream("footfall_count", true)
            setSettings({ ...settings, footfall_count: true });
        }
        onClose();
    }
    return (
        <Modal className="bg-[var(--surface-200)] dark:bg-gray-800 max-h-[90vh] overflow-auto scrollbar-hide rounded-[29px] w-auto h-auto  p-4 md:p-8 shadow-xl flex flex-col" onClose={handleClose} title="Foot Fall Count">
            <div className="relative  mx-auto w-[960px] aspect-[16/9]">
                <iframe
                    src={streamUrl}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded"
                />

                {!loading && (
                    <svg
                        width="100%"
                        height="100%"
                        className="absolute top-0 left-0 pointer-events-none"
                    >
                        {lines.map((line) => {
                            const midX = (line.x1 + line.x2) / 2;
                            const midY = (line.y1 + line.y2) / 2;

                            const dx = line.x2 - line.x1;
                            const dy = line.y2 - line.y1;
                            const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

                            const arrowLength = 40;
                            const isInOut = line.direction === "in-out";

                            return (
                                <g key={line.id}>
                                    {/* main line */}
                                    <line
                                        x1={line.x1}
                                        y1={line.y1}
                                        x2={line.x2}
                                        y2={line.y2}
                                        stroke="white"
                                        strokeWidth="3"
                                    />

                                    {/* drag handles */}
                                    <circle
                                        cx={line.x1}
                                        cy={line.y1}
                                        r={6}
                                        fill="white"
                                        stroke="black"
                                        strokeWidth={2}
                                        className="cursor-move pointer-events-auto"
                                        onMouseDown={(e) => handleDrag(e, line.id, "x1y1")}
                                    />
                                    <circle
                                        cx={line.x2}
                                        cy={line.y2}
                                        r={6}
                                        fill="white"
                                        stroke="black"
                                        strokeWidth={2}
                                        className="cursor-move pointer-events-auto"
                                        onMouseDown={(e) => handleDrag(e, line.id, "x2y2")}
                                    />

                                    <foreignObject
                                        transform={`translate(${midX},${midY}) rotate(${angleDeg})`}

                                        width={40} height={40}
                                        className="pointer-events-auto "
                                    >
                                        <div className="flex gap-2 bg-black/90 p-1 rounded">
                                            <button className="text-white" onClick={() => toggleDirection(line.id)}>
                                                <IconRefresh size={12} />
                                            </button>
                                            <button className="text-white" onClick={() => deleteLine(line.id)}>
                                                <IconTrash size={12} />
                                            </button>
                                        </div>
                                    </foreignObject>
                                    <g
                                        transform={`translate(${midX},${midY}) rotate(${angleDeg})`}
                                        onClick={() => toggleDirection(line.id)}
                                        className="cursor-pointer"
                                    >
                                        <line
                                            x1={0}
                                            y1={-arrowLength / 2}
                                            x2={0}
                                            y2={arrowLength / 2}
                                            stroke="white"
                                            strokeWidth="2"
                                            markerEnd="url(#arrowhead)"
                                            markerStart="url(#arrowTail)"
                                        />

                                        {isInOut ? (
                                            <>
                                                <text
                                                    x={0}
                                                    y={-arrowLength / 2 - 10}
                                                    fill="white"
                                                    textAnchor="middle"
                                                    fontSize="12"
                                                >
                                                    Out
                                                </text>
                                                <text
                                                    x={0}
                                                    y={arrowLength / 2 + 15}
                                                    fill="white"
                                                    textAnchor="middle"
                                                    fontSize="12"
                                                >
                                                    In
                                                </text>
                                            </>
                                        ) : (
                                            <>
                                                <text
                                                    x={0}
                                                    y={-arrowLength / 2 - 10}
                                                    fill="white"
                                                    textAnchor="middle"
                                                    fontSize="12"
                                                >
                                                    In
                                                </text>
                                                <text
                                                    x={0}
                                                    y={arrowLength / 2 + 15}
                                                    fill="white"
                                                    textAnchor="middle"
                                                    fontSize="12"
                                                >
                                                    Out
                                                </text>
                                            </>
                                        )}
                                    </g>
                                </g>
                            );
                        })}


                    </svg>)}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={addLine}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add Line
                </button>

                <div className="flex gap-3">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FootFallDialogue;
