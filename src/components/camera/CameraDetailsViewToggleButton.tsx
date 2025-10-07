
import { CameraDetailView, RootActions, RootState, useStore } from '@/store';
import { useTranslations } from 'next-intl';

export function CameraDetailsViewToggleButton() {
    const setToggleCameraDetailsView = useStore((state: RootActions) => state.setToggleCameraDetailsView);
    const cameraDetailView = useStore((state: RootState) => state.camera.cameraDetailView);
    const handleChange = (value: CameraDetailView) => {
        setToggleCameraDetailsView(value)
    }
    const t = useTranslations()
    return (
        <div className="flex items-center bg-[var(--surface-100)] rounded-full py-1 px-1">
            <button
                className={`px-2 py-1 rounded-full transition-colors text-[#888888] ${cameraDetailView === 'focused' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => handleChange('focused')}
            >
                {t('focused')}
            </button>
            <button
                className={`px-2 py-1 rounded-full transition-colors text-[#888888] ${cameraDetailView === 'overview' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => handleChange('overview')}
            >
                {t('overview')}
            </button>
        </div>
    );
}