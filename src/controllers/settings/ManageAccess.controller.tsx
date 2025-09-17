'use client'
import ManageAccessView from '@/views/settings/ManageAccess.view'
import { useDebounce } from '@/hooks/useDebounce'
import { protectApi } from '@/lib/protectApi'
import { Organization } from '@/models/organization'
import { AccessLevel, User } from '@/models/settings'
import { AxiosResponse } from 'axios'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { getLocalStorageItem } from '@/lib/storage'
const AddNewAccessDialogue = dynamic(() => import('@/components/dialogue/AddNewAccessDialogue').then((mod) => mod.AddNewAccessDialogue))
const AddNewUserDialogue = dynamic(() => import('@/components/dialogue/AddNewUserDialogue').then((mod) => mod.AddNewUserDialogue))
const DeleteDialog = dynamic(() => import('@/components/dialogue/DeleteDialog').then((mod) => mod.DeleteDialog))

const ManageAccessController = () => {
    const [sharedUser, setSharedUser] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isAddAccessModalOpen, setAddAccessModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedShareableUser, setSelectedShareableUser] = useState<User>()
    //adduser
    const [accessLevels, setAccessLevels] = useState<AccessLevel[]>([])
    const [userName, setUsername] = useState('')
    const [selectedAccess, setSelectedAccess] = useState<number>(-1)
    const [searchedUsers, setSearchedUsers] = useState<{ name: string, userId: string }[]>([])
    const [selectedUser, setSelectedUser] = useState<{ name: string, userId: string } | null>(null)
    const [shareableOrg, setShareableOrg] = useState<Organization[]>([])
    const [open, setOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)
    const [selectedTab, setSelectedTab] = useState('all')
    const debouncedQuery = useDebounce(userName, 300)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStreams, setSelectedStreams] = useState<Set<string>>(new Set());
    const [originalSelectedStreams, setOriginalSelectdStreams] = useState<Set<string>>(new Set())
    const [originalAccessRole, setOriginalAccessRole] = useState<number>()
    const [isAccessLoading, setIsAccessLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const t = useTranslations()
    const fetchUser = async () => {
        setIsLoading(true)
        try {
            const res = await protectApi<User[], undefined>('/user/added')
            if (res?.status === 200) {
                const data = res.data.data
                setSharedUser(data)
            }
        } catch (error) {
            console.error("err:", error)
        } finally {
            setIsLoading(false)
        }
    }
    const fetchAccessLevels = async () => {
        setIsAccessLoading(true)
        try {
            const res = await protectApi<AccessLevel[]>('/organizations/roles')
            if (res?.status === 200) {
                setAccessLevels(res.data.data)
            }

        } catch (error) {
            console.error("Error: ", error)
        } finally {
            setIsAccessLoading(false)
        }
    }
    const fetchUserSelectedStreams = async () => {
        try {
            const res = await protectApi<{ cameraIds: string[] }[]>(`/camera/get-shared?userId=${selectedShareableUser?.id}`)
            if (res?.status === 200) {
                const cameraIdsSet = new Set<string>()
                res.data.data.forEach((org: { cameraIds: string[] }) => {
                    org.cameraIds.forEach(id => cameraIdsSet.add(id));
                });
                setOriginalSelectdStreams(cameraIdsSet)
                setSelectedStreams(cameraIdsSet)
            }
        }
        catch (err) {
            console.error("Error:", err)
        }
    }
    const fetchSearchedUser = async () => {
        if (debouncedQuery.trim().length < 3) return;

        const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
        try {
            const res = await fetch(`https://apilive.kapidhwaj.ai/user/exists?username=${debouncedQuery}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`); 
            }
            const data = await res.json();
            setSearchedUsers([{ name: debouncedQuery, userId: data.userId }]);
            setOpen(true)
        } catch (error) {
            console.error("err:", error)
        }
    }
    const fetchSharedOrg = async () => {
        try {
            const res = await protectApi<Organization[]>('/organizations/getShareable')
            if (res?.status === 200) {
                setShareableOrg(res.data.data)
            }
        } catch (error) {
            console.error("Error", error)
        }
    }
    useEffect(() => {
        const fetchAll = async () => {
            const results = await Promise.allSettled([
                fetchUser(),
                fetchAccessLevels(),
                fetchSharedOrg()
            ]);

            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    const name = ['fetchUser', 'fetchAccessLevel', 'fetchSharedSites'][index];
                    console.error(`${name} failed:`, result.reason);
                }
            });
        };

        fetchAll();
    }, [])
    useEffect(() => {
        if (isEdit) {
            fetchUserSelectedStreams()
            setUsername(selectedShareableUser?.name ?? '')
            setSelectedUser({ name: selectedShareableUser?.name ?? '', userId: selectedShareableUser?.id ?? '' })
            setSelectedAccess(selectedShareableUser?.role_id ?? -1)
            setOriginalAccessRole(selectedShareableUser?.role_id)
        }
    }, [isEdit])
    useEffect(() => {
        if (debouncedQuery.trim().length < 3) return;
        fetchSearchedUser()
    }, [debouncedQuery])
    const handleRemoveUser = async () => {
        try {
            const res = await protectApi<AxiosResponse, { userId: string, roleId: number }>('/organizations/removeUser?action=remove', "POST", { userId: selectedShareableUser?.id ?? '', roleId: selectedShareableUser?.role_id ?? NaN })
            if (res.status === 200) {
                setIsDelete(false)
                fetchUser()
            }
        } catch (err) {
            console.error(err, "Error")
        }
    }
    const handleSelectUser = (user: { name: string, userId: string }) => {
        setSelectedUser(user);
        setUsername(user.name);
        setOpen(false);
    };
    const handleSave = async () => {
        if (selectedStreams.size === 0) return;
        if (!selectedUser?.userId) return;
        setIsSaving(true);
        const orgCam: { [key: string]: { cameraId: string }[] } = {};
        const revokedCameras: { [key: string]: { cameraId: string }[] } = {};
        shareableOrg.forEach((org) => {
            const CamerasInOrg: { cameraId: string }[] = [];
            const RevokedCamerasInOrg: { cameraId: string }[] = [];
            org.cameras.forEach((orgCam) => {
                if (isEdit) {
                    if (selectedStreams.has(orgCam.camera_id)) {
                        if (selectedAccess !== originalAccessRole) {
                            CamerasInOrg.push({ cameraId: orgCam.camera_id });
                        } else {
                            if (!originalSelectedStreams.has(orgCam.camera_id)) {
                                CamerasInOrg.push({ cameraId: orgCam.camera_id });
                            }
                        }
                    } else {
                        if (originalSelectedStreams.has(orgCam.camera_id)) {
                            RevokedCamerasInOrg.push({ cameraId: orgCam.camera_id })
                        }
                    }
                }
                else {
                    if (selectedStreams.has(orgCam.camera_id)) {
                        CamerasInOrg.push({ cameraId: orgCam.camera_id });
                    }
                }
            });

            org.folders.forEach((orgFolder) => {
                orgFolder.cameras?.forEach((folderCam) => {
                    if (isEdit) {
                        if (selectedStreams.has(folderCam.camera_id)) {
                            if (selectedAccess !== originalAccessRole) {
                                CamerasInOrg.push({ cameraId: folderCam.camera_id });
                            } else {
                                if (!originalSelectedStreams.has(folderCam.camera_id)) {
                                    CamerasInOrg.push({ cameraId: folderCam.camera_id });
                                }
                            }
                        } else {
                            if (originalSelectedStreams.has(folderCam.camera_id)) {
                                RevokedCamerasInOrg.push({ cameraId: folderCam.camera_id })
                            }
                        }
                    }
                    else {
                        if (selectedStreams.has(folderCam.camera_id)) {
                            CamerasInOrg.push({ cameraId: folderCam.camera_id });
                        }
                    }
                });

                orgFolder.child_folders?.forEach((childFolder) => {
                    childFolder.cameras?.forEach((childCam) => {
                        if (isEdit) {
                            if (selectedStreams.has(childCam.camera_id)) {
                                if (selectedAccess !== originalAccessRole) {
                                    CamerasInOrg.push({ cameraId: childCam.camera_id });
                                } else {
                                    if (!originalSelectedStreams.has(childCam.camera_id)) {
                                        CamerasInOrg.push({ cameraId: childCam.camera_id });
                                    }
                                }
                            } else {
                                if (originalSelectedStreams.has(childCam.camera_id)) {
                                    RevokedCamerasInOrg.push({ cameraId: childCam.camera_id })
                                }
                            }
                        }
                        else {
                            if (selectedStreams.has(childCam.camera_id)) {
                                CamerasInOrg.push({ cameraId: childCam.camera_id });
                            }
                        }
                    });
                });
            });

            orgCam[org.id] = CamerasInOrg;
            revokedCameras[org.id] = RevokedCamerasInOrg;
        });

        try {

            for (const org of shareableOrg) {
                const cameraIds = JSON.stringify(orgCam[org.id]);
                if (cameraIds.length === 0) continue;
                const res = await protectApi<unknown, {
                    roleId: number;
                    userId: string;
                    organizationId: string;
                    cameraIds: string;
                    revokeIds?: string;
                }>(
                    `${isEdit ? '/camera/update-shared' : '/camera/shareMany'}?action=share&organizationId=${org.id}`,
                    isEdit ? "PUT" : 'POST',
                    {
                        roleId: selectedAccess,
                        userId: selectedUser?.userId,
                        organizationId: org.id,
                        cameraIds: JSON.stringify(orgCam[org.id]),
                        revokeIds: isEdit ? JSON.stringify(revokedCameras[org.id]) : undefined
                    }
                );

                if (!res || res.status !== 200) {
                    throw new Error(`Sharing failed for org ${org.id}`);
                }
            }

            setAddUserModalOpen(false)
            setIsEdit(false)
            fetchUser()

        } catch (error) {
            console.error("Camera sharing failed:", error);
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <>
            <ManageAccessView accessLevels={accessLevels} isAccessLoading={isAccessLoading} setIsEdit={setIsEdit} setIsDelete={setIsDelete} selectedShareableUser={selectedShareableUser} setSelectedShareableUser={setSelectedShareableUser} isLoading={isLoading} sharedUser={sharedUser} setAddAccessModalOpen={setAddAccessModalOpen} setAddUserModalOpen={setAddUserModalOpen} />
            {isAddUserModalOpen && <AddNewUserDialogue
                isEdit={isEdit}
                isLoading={isSaving}
                handleSave={handleSave}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                organizations={shareableOrg}
                handleSelectUser={handleSelectUser}
                selectedUser={selectedUser}
                popoverRef={popoverRef}
                setSelectedUser={setSelectedUser}
                open={open}
                setOpen={setOpen}
                searchedUsers={searchedUsers}
                selectedAccess={selectedAccess}
                setSelectedAccess={setSelectedAccess}
                username={userName}
                setUsername={setUsername}
                accessLevels={accessLevels}
                isOpen={isAddUserModalOpen}
                onClose={() => { setAddUserModalOpen(false); setIsEdit(false); setUsername(''); setSelectedAccess(NaN) }}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStreams={selectedStreams}
                setSelectedStreams={setSelectedStreams}
            />}

            {isAddAccessModalOpen && <AddNewAccessDialogue
                isOpen={isAddAccessModalOpen}
                onClose={() => setAddAccessModalOpen(false)}
            />}
            {isDelete && <DeleteDialog title={t('managePeople.delete_access_user')} data={{ userId: selectedShareableUser?.id, roleId: selectedShareableUser?.role_id }} onClose={() => setIsDelete(false)} handleDelete={handleRemoveUser} />}
        </>
    )
}

export default ManageAccessController