import { protectApi } from '@/lib/protectApi';
import { showToast } from '@/lib/showToast';
import React, { useRef } from 'react'

const CameraMovement = ({ camId }: { camId: string }) => {

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const sendCameraCommand = async (movementInput: string, camId: string) => {
        try {
            await protectApi(`${movementInput}`, "POST", { camId });
            console.log(`${movementInput} command successful`);
        } catch (err) {
            console.error(err);
            showToast(err.response?.data?.message || "Error sending camera command", "error");
        }
    };

    const stopMovement = async (camId: string) => {
        try {
            await protectApi("/camera/ptz/stop", "POST", { camId });
            console.log("stop command successful");
        } catch (err) {
            console.error(err);
            showToast(err.response?.data?.message || "Error sending camera command", "error");
        }
    };
    const moveCamera = (direction: string, camId: string,) =>
        sendCameraCommand(`/camera/ptz/${direction}`, camId,);

    const zoomCamera = (zoomType: string, camId: string,) =>
        sendCameraCommand(`/camera/zoom/${zoomType}`, JSON.stringify(camId),);
    const handlePress = (direction: string) => {
        console.log(direction, "direction")
        if (direction === 'plus' || direction === 'minus') {
            zoomCamera(direction, camId);
        } else {
            moveCamera(direction, camId,);
        }
    };

    const startRepeating = (direction: string) => {
        handlePress(direction);
       

    };

    const stopRepeating = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        stopMovement(camId);
    };

    return (
        <div className="flex flex-col items-center mt-10 space-y-6">
            <div className="relative w-52 h-52 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shadow-lg">
                <button
                    className="absolute top-2 w-14 h-14 bg-gray-400 rounded-md flex items-center justify-center"
                    onMouseDown={() => startRepeating("up")}
                    onMouseUp={stopRepeating}
                   onMouseLeave={stopRepeating}
                >
                    ↑
                </button>
                <button
                    className="absolute bottom-2 w-14 h-14 bg-gray-400 roundedro-md flex items-center justify-center"
                    onMouseDown={() => startRepeating("down")}
                    onMouseUp={stopRepeating}
                    onMouseLeave={stopRepeating}
                >
                    ↓
                </button>
                <button
                    className="absolute left-2 w-14 h-14 bg-gray-400 rounded-md flex items-center justify-center"
                    onMouseDown={() => startRepeating("left")}
                    onMouseUp={stopRepeating}
                    onMouseLeave={stopRepeating}
                >
                    ←
                </button>

                {/* Right */}
                <button
                    className="absolute right-2 w-14 h-14 bg-gray-400 rounded-md flex items-center justify-center"
                    onMouseDown={() => startRepeating("right")}
                    onMouseUp={stopRepeating}
                    onMouseLeave={stopRepeating}
                >
                    →
                </button>

                {/* Center Dot */}
                <div className="w-5 h-5 rounded-full bg-gray-600" />
            </div>

            {/* Zoom Controls */}
            <div className="flex gap-6">
                <button
                    className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center text-2xl"
                    onMouseDown={() => startRepeating("minus")}
                    onMouseUp={stopRepeating}
                    onMouseLeave={stopRepeating}
                >
                    -
                </button>
                <button
                    className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center text-2xl"
                    onMouseDown={() => startRepeating("plus")}
                    onMouseUp={stopRepeating}
                    onMouseLeave={stopRepeating}
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default CameraMovement