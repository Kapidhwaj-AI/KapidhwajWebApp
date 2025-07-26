import React from 'react'
import Modal from '../ui/Modal'
import Image from 'next/image';


interface AlertPreviewDialogueProps {
    onClose: () => void;
    imageUrl: string;
    alertType: string;
}


const AlertPreviewDialogue: React.FC<AlertPreviewDialogueProps> = ({ onClose, imageUrl, alertType }) => {
    return (
        <Modal onClose={onClose} title={alertType}>
            <div className='flex flex-col gap-2'>
                <Image src={imageUrl} alt='alert-image' width={1000} height={1000} className='w-full h-full rounded-xl' />
                <a
                    href={`/api/alert/image?url=${encodeURIComponent(imageUrl)}&filename=${alertType}_${new Date().toISOString()}.jpg`}
                    className="bg-[#2B4C88] rounded-lg p-2 text-white self-end text-center"
                >
                    Download
                </a>
            </div>
        </Modal>
    )
}

export default AlertPreviewDialogue