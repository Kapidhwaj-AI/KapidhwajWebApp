'use client';

import { CameraDetailView, setToggleCameraDetailsView } from '@/redux/slices/cameraSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

export function CameraDetailsViewToggleButton() {
    const dispatch = useDispatch<AppDispatch>();
    const cameraDetailView = useSelector((state: RootState) => state.camera.cameraDetailView)
    const handleChange = (value: CameraDetailView) => {
        dispatch(setToggleCameraDetailsView(value))
    }
    return (
        <div className="flex items-center bg-[var(--surface-100)] rounded-full py-1 px-1">
            <button
                className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors text-[#888888] ${cameraDetailView === 'focused' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => handleChange('focused')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_123_694)">
                        <path d="M15 9.99963L19.553 7.72363C19.7054 7.64747 19.8748 7.61151 20.045 7.61918C20.2152 7.62684 20.3806 7.67788 20.5256 7.76744C20.6706 7.85699 20.7902 7.98211 20.8733 8.1309C20.9563 8.2797 20.9999 8.44724 21 8.61763V15.3816C20.9999 15.552 20.9563 15.7196 20.8733 15.8684C20.7902 16.0172 20.6706 16.1423 20.5256 16.2318C20.3806 16.3214 20.2152 16.3724 20.045 16.3801C19.8748 16.3878 19.7054 16.3518 19.553 16.2756L15 13.9996V9.99963Z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H13C13.5304 6 14.0391 6.21071 14.4142 6.58579C14.7893 6.96086 15 7.46957 15 8V16C15 16.5304 14.7893 17.0391 14.4142 17.4142C14.0391 17.7893 13.5304 18 13 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V8Z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_123_694">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>Focused
            </button>
            <button
                className={`px-2 py-1 rounded-full transition-colors text-[#888888] ${cameraDetailView === 'overview' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => handleChange('overview')}
            >
                Overview
            </button>
        </div>
    );
}