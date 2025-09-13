import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
    className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ className = "" }) => {
    const router = useRouter();
    const t =useTranslations()
    return (
        <button
            onClick={() => router.back()}
            className={`bg-[var(--surface-500)] text-sm md:text-md hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-3 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1 ${className}`}
        >
            <ChevronLeft className='text-sm leading-none' size={20}/>
            <span className="hidden sm:inline">{t('back')}</span>
        </button>
    );
}; 