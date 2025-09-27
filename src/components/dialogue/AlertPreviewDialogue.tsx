import React, { useState } from 'react'
import Modal from '../ui/Modal'
import Image from 'next/image';
import { RootActions, RootState, useStore } from '@/store';
import dynamic from 'next/dynamic';
const Maximize = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconMaximize),
    { ssr: false });

const Minimize = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconMinimize),
    { ssr: false });

interface AlertPreviewDialogueProps {
    onClose: () => void;
    imageUrl: string;
    alertType: string;
}


const AlertPreviewDialogue: React.FC<AlertPreviewDialogueProps> = ({ onClose, imageUrl, alertType }) => {
    const [zoom, setZoom] = useState(1);
    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 5));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.2));
    const resetZoom = () => setZoom(1);
    const isFullscreen = useStore((state: RootState) => state.camera.isAlertFullScreen);
    const setIsFullScreenMode = useStore((state: RootActions) => state.setIsAlertFullScreen);
    const className = isFullscreen ? 'h-[100vh] w-[100vw] overflow-auto scrollbar-hide rounded-[29px]  shadow-xl flex flex-col' : 'max-h-[90vh] overflow-auto scrollbar-hide rounded-[29px] w-[90%] md:w-[748px] h-auto  p-4 md:p-8 shadow-xl flex flex-col'
    return (
        <Modal onClose={() => { onClose(); setIsFullScreenMode(false); }} title={alertType} className={className}>
           
                <div className={`relative w-full ${isFullscreen ? 'h-full w-full' : ' h-[500px]'} overflow-auto scrollbar-hide rounded-xl flex justify-center items-center`}>
                    <div
                        style={{
                            transform: `scale(${zoom})`,
                            transition: 'transform 0.3s ease',
                            transformOrigin: 'top left',

                        }}
                    >
                        <button className='absolute top-[1%] right-1 bg-white rounded-lg' onClick={() => { setIsFullScreenMode(!isFullscreen) }}>
                            {isFullscreen ? <Minimize  stroke={'2'} size={30} /> : <Maximize className='text-4xl'  stroke={'2'} size={30} />}
                        </button>
                        <Image
                            src={imageUrl}
                            alt="alert-image"
                            width={1000}
                            height={1000}
                            loading="lazy"
                            className={`rounded-xl ${isFullscreen ? 'h-[87vh] w-[87vw]' : 'max-h-[500px] object-cover'} `}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-end gap-3'>
                    <button onClick={handleZoomIn} className="bg-[#2B4C88] rounded-lg p-2 text-white  text-center">
                        Zoom in +
                    </button>
                    <button onClick={handleZoomOut} className="bg-[#2B4C88] rounded-lg p-2 text-white  text-center">
                        Zoom out -
                    </button>
                    <button onClick={resetZoom} className="bg-[#2B4C88] rounded-lg p-2 text-white  text-center">
                        Reset
                    </button>
                    <a
                        href={`/api/alert/image?url=${encodeURIComponent(imageUrl)}&filename=${alertType}_${new Date().toISOString()}.jpg`}
                        className="bg-[#2B4C88] rounded-lg p-2 text-white  text-center"
                    >
                        Download
                    </a>
                </div>
        </Modal>
    )
}

export default AlertPreviewDialogue