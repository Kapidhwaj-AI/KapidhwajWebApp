import { Folders, Organization } from '@/models/organization';
import { IconChevronRight, IconFolder, IconFolders, IconPencil, IconSitemap, IconTrash } from '@tabler/icons-react';
import React from 'react'


interface ListCardProps {
    handleNavigate: (id: string | number, type: 'org' | 'folder') => void;
    setIsDelete: (val: boolean) => void;
    data: Organization | Folders;
    setIsFolder?: (val: boolean) => void;
    setIsOrg?: (val: boolean) => void;
    selectedId?: string | number;
    setId: (val: number | string) => void;
    setIsOpen: (val: boolean) => void;
    setIsEdit: (val: boolean) => void
    setName: (val: string) => void
}

export function ListCard({ setIsDelete, setIsEdit, setIsOpen, setName, handleNavigate, data, setIsFolder, setIsOrg, selectedId, setId }: ListCardProps) {
    const isFolder = 'organization_id' in data;

    const id = data.id;
    const name = data.name;
    const ownerOrOrgId = isFolder ? data.organization_id : data.owner ?? '—';

    const handleClick = () => {
        handleNavigate(id, isFolder ? 'folder' : 'org');
        setIsFolder?.(isFolder);
        setIsOrg?.(!isFolder);
    };
    const handleOnDelete = () => {
        setIsDelete(true)
        if (isFolder) {
            setIsFolder?.(true);
            setIsOrg?.(false)
        }
        else {
            setIsFolder?.(false); setIsOrg?.(true)
        }
        setId(id)
    }
    const handleOnEdit = () => {
        if (isFolder) {
            setIsFolder?.(true);
            setIsOrg?.(false)
        }
        else {
            setIsFolder?.(false); setIsOrg?.(true)
        }
        setIsEdit(true)
        setIsOpen(true)
        setName(data.name)
        setId(id)
    }
    return (
        <div className={`${selectedId === id ? 'bg-[var(--surface-300)]' : 'bg-[var(--surface-200)]'} group flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors`}>
            <div className="w-10 h-10 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                {!isFolder ? <IconSitemap size={20} className="text-[#888888]" /> : data.parent_id === null ? <IconFolders size={20} className="text-[#888888]" /> : <IconFolder size={20} className="text-[#888888]" />}
            </div>
            <div className="ml-3 flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{name}</h3>
                <p className="text-xs text-gray-500 truncate">{ownerOrOrgId}</p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={handleOnDelete}
                    className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                >
                    <IconTrash size={18} className="text-[#FF6868]" />
                </button>
                <button
                    onClick={handleOnEdit}
                    className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"

                >
                    <IconPencil size={18} className="text-gray-600" />
                </button>
                {(setIsOrg || setIsFolder) && <button
                    onClick={handleClick}
                    className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                >
                    <IconChevronRight size={18} className="text-gray-600" />
                </button>}
            </div>
        </div>
    )
}

