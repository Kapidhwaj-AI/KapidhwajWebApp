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
                className={`px-2 py-1 rounded-full transition-colors text-[#888888] ${cameraDetailView === 'focused' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => handleChange('focused')}
            >
                Focused
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