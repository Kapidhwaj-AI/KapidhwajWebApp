'use client'
import HubDialogue from '@/components/dialogue/HubDialogue';
import ManageDeviceView from '@/components/views/settings/ManageDevice.view';
import { protectApi } from '@/lib/protectApi';
import { Organization } from '@/models/organization';
import { Hub, ManageHub } from '@/models/settings';


import React, { FormEvent, useEffect, useState } from 'react'

const ManageDevicesController = () => {
    const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
    const [siteModalOpen, setSiteModalOpen] = useState(false);
    const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false);
    const [nearbyHubs, setNearbyHubs] = useState<ManageHub[]>([])
    const [savedHaubs, setSavedHubs] = useState<Hub[]>([])
    const [isHubLoading, setIsHubLoading] = useState(false)
    const [isSavedHubsLoading, setIsSavedHubsLoading] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isHubDelete, setIsHubDelete] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [selectedSite, setSelectedSite] = useState('')
    const [sites, setSites] = useState<Organization[]>([])
    const [showPassword, setShowPassword] = useState(false)
    const [isSaving, setIsSaving] = useState(false);
    const handleNearbyAdd = (ip: string) => {
        setId(ip)
        setIsOpen(true)
    };
    const fetchSites = async () => {

        try {
            const res = await protectApi<{ organization: Organization }[]>('/organizations')
            if (res.status === 200) {
                const sites = res.data.data?.map(
                    (item) => item.organization,
                );
                setSites(sites)
            }
        } catch (error) {
            console.error("err:", error)
        }
    }
    const fetchHubs = async () => {
        setIsHubLoading(true)
        try {
            const res = await fetch('/api/hubs');
            const data = await res.json();
            setNearbyHubs(data.hubs)
        } catch (error) {
            console.error("err:", error)

        } finally {
            setIsHubLoading(false)
        }

    }
    const fetchSavedHubs = async () => {
        setIsSavedHubsLoading(true)
        try {
            const res = await protectApi<Hub[]>(`/devices/hub`);
            const data = res.data.data
            setSavedHubs(data)
            if (selectedHub) {
                const updated = data.find(h => h.id === selectedHub.id);
                if (updated) setSelectedHub(updated);
            }
        } catch (error) {
            console.error("err:", error)
        } finally {
            setIsSavedHubsLoading(false)
        }
    }

    const handleToggleStream = async (toggleValue: boolean, id: number, physical_address: string, hub_id: number) => {
        const url = toggleValue ? `/camera/start?action=add&hubId=${hub_id}` : `/camera/stop?action=remove&hubId=${hub_id}`
        const payload = {
            cameras: [
                {
                    id: id.toString(),
                    macaddress: physical_address,
                },
            ],
        }
        const res = await protectApi<unknown, typeof payload>(url, "POST", payload)
        return res
    }
    const handleDeleteSavedCamera = async (cameraId: number, organizationId: string) => {
        const res = await protectApi<unknown, { cameraId: number, organizationId: string }>('/camera/delete?action=remove', 'DELETE', { cameraId, organizationId })
        if (res.status === 200) {
            setIsDelete(false)
        }
    }
    const handleDeleHub = async (hubId: string) => {
        const res = await protectApi(`/devices/hub?action=remove&hubId=${hubId}`, 'DELETE')
        if (res.status === 200) {
            setIsHubDelete(false)
        }
    }
    useEffect(() => {
        fetchHubs()
        fetchSavedHubs()
        fetchSites()
    }, [])
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true)
        try {
            const res = await protectApi<unknown, { name: string, hubId: string, password: string, organizationId: string }>('/devices/hub?action=add', 'POST', { name, hubId: id, password, organizationId: selectedSite })
            if (res.status === 200) {
                setIsOpen(false)
                setName('')
                setSelectedSite('')
                setPassword('')
                setId('')
            }

        } catch (error) {
            console.error("Err", error)
        } finally {
            setIsSaving(false)
        }
    }
    return (
        <>
            <ManageDeviceView selectedSite={selectedSite} sites={sites} setSelectedSite={setSelectedSite} setIsOpen={setIsOpen} handleDeleteHub={handleDeleHub} isHubDelete={isHubDelete} setIsHubDelete={setIsHubDelete} handleDelete={handleDeleteSavedCamera} isDelete={isDelete} setIsDelete={setIsDelete} handleCopyIp={handleNearbyAdd} toggleStream={handleToggleStream} fetchSavedHubs={fetchSavedHubs} savedHubs={savedHaubs} isSavedHubLoading={isSavedHubsLoading} nearbyHubs={nearbyHubs} fetchHub={fetchHubs} setSiteModalOpen={setSiteModalOpen} selectedHub={selectedHub} isHubLoading={isHubLoading} setIsHubLoading={setIsHubLoading} setSelectedHub={setSelectedHub} isAddFolderModalOpen={isAddFolderModalOpen} setAddFolderModalOpen={setAddFolderModalOpen} siteModalOpen={siteModalOpen} />
            {isOpen && <HubDialogue isLoading={isSaving} showPassword={showPassword} setShowPassword={setShowPassword} onSubmit={onSubmit} id={id} selectedSite={selectedSite} setSelectedSite={setSelectedSite} setId={setId} setName={setName} setPassword={setPassword} name={name} password={password} sites={sites} onClose={() => setIsOpen(false)} />}
        </>
    )

}

export default ManageDevicesController