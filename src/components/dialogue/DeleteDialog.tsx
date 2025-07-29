import React from 'react';
import Modal from '../ui/Modal';
import { IconCheck, IconX } from '@tabler/icons-react';
import { HexagonAlertIcon } from '../ui/HexgonAlertIcon';
import { useTranslations } from 'next-intl';

type DeleteDialogProps<T> = {
    data: T;
    handleDelete: (data: T) => void;
    onClose: () => void;
    title?: string;
    description?: string;
};

export function DeleteDialog<T>({ data, handleDelete, onClose, title, description }: DeleteDialogProps<T>) {
    const t = useTranslations()
    return (
        <Modal
            isCancel={true}
            onClose={onClose}
            className="bg-[#FFEBEB] dark:bg-[#3C0000] p-5 flex flex-col gap-4 rounded-4xl justify-between items-center"
        >
            <form onSubmit={(e) => { e.preventDefault(); handleDelete(data) }} className="bg-[#FFEBEB] dark:bg-[#3C0000] p-5 flex flex-col gap-4 rounded-4xl justify-between items-center"
>
                <div className="bg-[#FF6868] rounded-full text-white p-2">
                    <HexagonAlertIcon />
                </div>
                <div className="flex flex-col items-center justify-center gap-1 ">
                    <h3 className="text-2xl text-[#FF6868] font-bold">{title ?? 'Are You Sure?'}</h3>
                    <p className="text-xs">
                        {description ?? t('delete_desc')}
                    </p>
                </div>
                <div className="flex gap-2 text-sm">
                    <button type='button'
                        onClick={onClose}
                        className="bg-white shadow-md rounded-4xl flex gap-1 p-2 items-center justify-center text-[#888888]"
                    >
                        <IconX size={20} />
                        {t('no')}
                    </button>
                    <button type='submit'
                        className="bg-[#FF6868] shadow-md rounded-4xl flex gap-1 p-2 items-center justify-center text-white"
                    >
                        <IconCheck size={20} />
                        {t('yes')}
                    </button>
                </div>
            </form>
        </Modal>
    );
}


