import { protectApi } from '@/lib/protectApi';
import { showToast } from '@/lib/showToast';
import React, { useRef, useState } from 'react'

const CameraMovement = ({ camId }: { camId: string }) => {
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
        sendCameraCommand(`/camera/ptz/${direction}`, camId);

    const zoomCamera = (zoomType: string, camId: string,) =>
        sendCameraCommand(`/camera/zoom/${zoomType}`, camId);
    const handlePress = (direction: string) => {
        console.log(direction, "direction")
        if (direction === 'plus' || direction === 'minus') {
            zoomCamera(direction, camId);
        } else {
            moveCamera(direction, camId,);
        }
    };
    const startTimeRef = useRef<number | null>(null);
    const startRepeating = (direction: string) => {
        startTimeRef.current = Date.now();
        handlePress(direction);
    };
    const [duration, setDuration] = useState(0);

    const stopRepeating = () => {
        if (startTimeRef.current) {
            const endTime = Date.now();
            const elapsed = endTime - startTimeRef.current;
            stopMovement(camId);
            setDuration(elapsed);
            startTimeRef.current = null;
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 space-y-6">
            <div className="relative w-52 h-52 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shadow-lg">
                <button
                    className="absolute top-2 w-14 h-14 bg-gray-400 rounded-md flex items-center justify-center"
                    onMouseDown={() => startRepeating("up")}
                    onMouseUp={stopRepeating}
                    onTouchStart={() => startRepeating("up")}
                    onTouchEnd={stopRepeating}
                >                    ↑
                </button>
                <button
                    className="absolute bottom-2 w-14 h-14 bg-gray-400 rounded-md flex items-center justify-center"
                    onMouseDown={() => startRepeating("down")}
                    onMouseUp={stopRepeating}
                    onTouchStart={() => startRepeating("down")}
                    onTouchEnd={stopRepeating}
                >
                    ↓
                </button>
                <button
                    className="absolute left-2 w-14 h-14 bg-gray-400 rounded-md flex items-center justify-center"
                    onMouseDown={() => startRepeating("left")}
                    onMouseUp={stopRepeating}
                    onTouchStart={() => startRepeating("left")}
                    onTouchEnd={stopRepeating}
                >
                    ←
                </button>
                <button
                    className="absolute right-2 w-14 h-14 bg-gray-400 rounded-md flex items-center justify-center"
                    onMouseDown={() => startRepeating("right")}
                    onMouseUp={stopRepeating}
                    onTouchStart={() => startRepeating("right")}
                    onTouchEnd={stopRepeating}
                    
                >
                    →
                </button>

                <div className="w-5 h-5 rounded-full bg-gray-600" />
            </div>
            <div className="flex gap-6">
                <button
                    className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center text-2xl"
                    onMouseDown={() => startRepeating("minus")}
                    onMouseUp={stopRepeating}
                    onTouchStart={() => startRepeating("minus")}
                    onTouchEnd={stopRepeating}
                >
                    -
                </button>
                <button
                    className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center text-2xl"
                    onMouseDown={() => startRepeating("plus")}
                    onMouseUp={stopRepeating}
                    onTouchStart={() => startRepeating("plus")}
                    onTouchEnd={stopRepeating}
                >
                    +
                </button>
            </div>
            <div>
               
                <p>Held for: {duration} ms</p>
            </div>

        </div>
    )
}

export default CameraMovement