'use client';

import { FormEvent, useEffect, useState } from 'react';
import { IconX, IconCheck, IconRefresh, IconCopy, IconRouter, IconCopyPlus } from '@tabler/icons-react';
// import { cameras } from '../device/SavedCameras';
import Modal from '../ui/Modal';
import { DevicesMap } from '@/models/settings';
import Spinner from '../ui/Spinner';
import { InputField } from '../ui/Input.field';
import { useTranslations } from 'next-intl';
import SelectField from '../ui/Select.field';
import { Folders, Organization } from '@/models/organization';
import { protectApi } from '@/lib/protectApi';

interface AddNewCameraDialogueProps {
    isOpen: boolean;
    onClose: () => void;
    nearCams: DevicesMap | undefined
    isLoading: boolean;
    fetchNearCams: () => void;
    setSelectedSite: (val: string) => void;
    selectedSite: string;
    sites: Organization[];
    hubId: string;

    fetchSavedHubs:() => void
}

export function AddNewCameraDialogue({ isOpen, fetchSavedHubs, hubId, onClose, isLoading, fetchNearCams, nearCams, selectedSite, setSelectedSite, sites }: AddNewCameraDialogueProps) {
    const [ipAddress, setIpAddress] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [roomName, setRoomName] = useState('');
    const [mac, setMac] = useState('')
    const [username, setUsername] = useState('')
    const [rooms, setRooms] = useState<{ id: string; name: string }[]>([])
    const [subfolders, setSubfolders] = useState<{ id: string; name: string }[]>([])
    const [subfolderId, setSubfolderId] = useState('')
    const [isSaving, setIsSaving] = useState(false);
    const t = useTranslations()


    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !name ||
            !ipAddress ||
            !mac ||
            !username ||
            !password ||
            !selectedSite ||
            !hubId
        ) {

            return;
        }
        setIsSaving(true)
        try {
            const folderToSend = subfolderId || roomName || null;
            const res = await protectApi(`/camera?action=add&organizationId=${selectedSite}`, 'POST', {
                name,
                physicalAddress: mac,
                folderId: Number(folderToSend),
                hubId, username, password, ipaddress: ipAddress,
            })
            if (res.status === 200) {
                onClose()
               await fetchSavedHubs()
            }
        } catch {

        } finally {
            setIsSaving(false)
        }
    };
    useEffect(() => {
        setRoomName('')
        const fetchFolders = async () => {
            try {
                const res = await protectApi<Folders[]>(`/Folders?action=view&organizationId=${selectedSite}`)
                if (res.status === 200) {
                    const data = res.data.data.map((item) => ({ id: item.id.toString(), name: item.name }))
                    setRooms(data)
                }
            } catch (e) {
                console.error("Err:", e)
            }
        }
        if (selectedSite.length > 0) {
            fetchFolders()
        }
    }, [selectedSite])
    useEffect(() => {
        setSubfolderId('')
        const fetchFolders = async () => {
            try {
                const res = await protectApi<{ child_folders: Folders[] }>(`/Folders/${roomName}?action=view`)
                if (res.status === 200) {
                    const data = res.data.data.child_folders.map((item) => ({ id: item.id.toString(), name: item.name }))
                    setSubfolders(data)
                }
            } catch (e) {
                console.error("Err:", e)
            }
        }
        if (roomName.length > 0) {
            fetchFolders()
        }
    }, [roomName])
    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} title={t('settings.add_new_camera')}>
            <form onSubmit={handleSave} className="h-full w-full flex flex-col gap-4">
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* IP Address Field */}

                    <InputField value={name}
                        required
                        setValue={setName}
                        label={t('settings.name')}
                        placeholder={t('settings.enter_name_here')}
                    />


                    {/* Name Field */}

                    <InputField value={ipAddress}
                        required
                        setValue={setIpAddress}
                        label={t('settings.ip_address')}
                        placeholder={t('settings.enter_ip_address')}
                    />

                    <InputField value={mac}
                        required
                        setValue={setMac}
                        label={t('settings.mac_address')}
                        placeholder={t('settings.enter_mac_address')}
                    />


                    {/* Username Field */}

                    <InputField value={username}
                        required
                        setValue={setUsername}
                        label={t('settings.username')}
                        placeholder={t('settings.enter_username')}
                    />

                    <InputField value={password}
                        required
                        setValue={setPassword}
                        label={t('settings.password')}
                        placeholder={t('settings.enter_password')}
                    />
                    <SelectField required placeholder={t('settings.select_a_site')} label={t('settings.select_site')} value={selectedSite} setValue={setSelectedSite} data={sites} />


                    {/* Folder Name Field */}
                    <SelectField placeholder={t('settings.select_folder')} label={t('settings.folder_optional')} value={roomName} setValue={setRoomName} data={rooms} />
                    <SelectField placeholder={t('settings.select_subfolder')} label={t('settings.subfolder_optional')} value={subfolderId} setValue={setSubfolderId} data={subfolders} />

                </div>

                {/* Divider */}


                {/* Nearby Cameras Section */}
                <div>
                    <div className="flex gap-2 items-center mb-2">
                        <h2 className="text-sm font-bold">{t('manage_hubs.manage_cameras.nearby_cameras')}</h2>
                        <button type='button'
                            onClick={fetchNearCams}
                            disabled={isLoading}
                            className="p-1.5 hover:bg-[var(--surface-200)] rounded-full transition-colors disabled:opacity-50"
                        >
                            <IconRefresh
                                size={16}
                                className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`}
                            />
                        </button>
                    </div>

                    <div className="w-full h-[140px] md:h-[160px] xl:h-[240px] bg-[var(--surface-100)] p-3 rounded-[24px]">
                        <div className="space-y-2 h-full overflow-y-auto pr-2 scrollbar-hide">
                            {isLoading ? (
                                <Spinner />
                            ) : nearCams ? (
                                Object.entries(nearCams).map(([mac, device]) => (
                                    <div
                                        key={device.ipaddress}
                                        className="flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-[12px] transition-colors min-h-[60px]"
                                    >
                                        <div className="w-[44px] h-[44px] bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                            <IconRouter size={18} className="text-gray-600" />
                                        </div>
                                        <div className="ml-2.5 flex-1 min-w-0">
                                            <h3 className="text-sm font-medium truncate">{device.name}</h3>
                                            <p className="text-xs text-gray-500 truncate">{device.ipaddress}</p>
                                        </div>
                                        <button type='button'
                                            onClick={() => { navigator.clipboard.writeText(device.rtsp); setName(device.name); setIpAddress(device.ipaddress); setMac(mac) }}
                                            className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                        >
                                            <IconCopyPlus size={16} className="text-gray-600" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No cameras found nearby.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-10">
                    <button type='button'
                        className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                        onClick={onClose}
                    >
                        <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t('close')}</span>
                    </button>
                    <button type='submit'
                        className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"

                    >
                        <span className='flex items-center gap-2'><IconCheck size={16} />{t('save')}</span>
                    </button>
                </div>
            </form>
        </Modal>
    );
} 