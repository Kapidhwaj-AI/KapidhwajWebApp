'use client';

import { IconMail, IconPhone, IconX } from '@tabler/icons-react';
import Modal from '../ui/Modal';
import { useTranslations } from 'next-intl';

export function HelpAndSupportDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const t = useTranslations()
    if (isOpen) {
        return (
            <Modal onClose={onClose} title={t('settings.support')}>
                    <div className="space-y-7 mb-5">
                        <p className="text-md text-gray-700 dark:text-gray-300">
                            {t('settings.query')}
                        </p>

                        <div className="flex flex-col space-y-5">
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-[#56CE40] rounded-xl'>
                                    <IconPhone size={40} stroke={2} color='white' />
                                </div>
                                <a
                                    href="tel:+919876543210"
                                    className="text-4xl hover:underline"
                                >
                                    +91 9876543210
                                </a>
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-[#FF6868] rounded-xl'>
                                    <IconMail size={40} stroke={2} color='white' />
                                </div>
                                <a
                                    href="mailto:mail@kapidhwaj.ai"
                                    className="text-4xl hover:underline"
                                >
                                    mail@kapidhwaj.ai
                                </a>
                            </div>

                        </div>
                    </div>
            </Modal>
        );
    }
    return null;
}