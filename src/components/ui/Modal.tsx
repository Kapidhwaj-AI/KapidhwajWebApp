import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import React from 'react';


interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
    isCancel?: boolean
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title, className, isCancel }) => {
    return ReactDOM.createPortal
        (
            <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <div className={className ? className : "bg-[var(--surface-200)] max-h-[90vh] overflow-auto scrollbar-hide rounded-[69px] w-[90%] md:w-[748px] h-auto  p-4 md:p-8 shadow-xl flex flex-col"}>
                    {title ? <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[20px] md:text-[24px] font-extralight dark:text-white">{title}</h2>
                        <button
                            onClick={onClose}

                        >
                            <X className='text-red-500' />
                        </button>
                    </div>
                        : !isCancel && <button
                            onClick={onClose}
                            className="  text-gray-500 self-end hover:text-gray-800"
                        >
                            <X />
                        </button>

                    }
                    {children}
                </div>
            </div>,
            document.body
        );
};

export default Modal;