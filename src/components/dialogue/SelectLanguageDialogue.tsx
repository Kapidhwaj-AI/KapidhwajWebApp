import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { IconCheck, IconX, IconLanguage } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';


export  function SelectLanguageDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'gu'>('en');
    const router = useRouter()
    useEffect(() => {
        const match = document.cookie.match(/(^| )locale=([^;]+)/);
        if (match && ['en', 'hi', 'gu'].includes(match[2])) {
            setSelectedLanguage(match[2] as 'en' | 'hi' | 'gu');
        }
    }, []);
    const t = useTranslations()
    const handleSave = () => {
        document.cookie = `locale=${selectedLanguage}; path=/; max-age=31536000`; 
        onClose();
        router.refresh()
    };

    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} title={t('language') + " " + t('settings.title')}>
            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <IconLanguage size={24} />
                    <h3 className="font-medium">{t("select_language")}</h3>
                </div>

                <div className="space-y-3 pl-9">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="language"
                            value="en"
                            checked={selectedLanguage === 'en'}
                            onChange={() => setSelectedLanguage('en')}
                            className="h-4 w-4"
                        />
                        <span>English</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="language"
                            value="hi"
                            checked={selectedLanguage === 'hi'}
                            onChange={() => setSelectedLanguage('hi')}
                            className="h-4 w-4"
                        />
                        <span>हिंदी</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="language"
                            value="gu"
                            checked={selectedLanguage === 'gu'}
                            onChange={() => setSelectedLanguage('gu')}
                            className="h-4 w-4"
                        />
                        <span>ગુજરાતી</span>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2 rounded-4xl border bg-[var(--surface-850)] text-[#888888]"
                >
                    <IconX size={20} /><span>{t('close')}</span>
                </button>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-4xl bg-[#2B4C88] text-white hover:bg-blue-700"
                >
                    <IconCheck size={20} /><span>{t("save")}</span>
                </button>
            </div>
        </Modal>
    );
}
