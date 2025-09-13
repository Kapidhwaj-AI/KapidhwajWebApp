'use client'
const HubDialogue = dynamic(() => import('@/components/dialogue/HubDialogue'))
import { protectApi } from '@/lib/protectApi';
import { Organization } from '@/models/organization';
import { Hub, ManageHub } from '@/models/settings';
import React, { FormEvent, useEffect, useState } from 'react'
import { Camera } from '@/models/camera';
import dynamic from 'next/dynamic';
import ManageDeviceView from '@/views/settings/ManageDevice.view';

const ManageDevicesController = () => {
    const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
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
    const [camera, setCamera] = useState<Camera>()
    const [selectedSite, setSelectedSite] = useState('')
    const [sites, setSites] = useState<Organization[]>([])
    const [showPassword, setShowPassword] = useState(false)
    const [isSaving, setIsSaving] = useState(false);
    const handleNearbyAdd = (ip: string) => {
        setId(ip)
        setIsOpen(true)
    };
    const fetchSites = async (): Promise<void> => {
        try {
            const res = await protectApi<{ organization: Organization }[]>(
                '/organizations',
                undefined,
                undefined,
                undefined,
                true
            );
            if (res.status === 200) {
                const sites = res.data.data?.map((item) => item.organization);
                setSites(sites);
            }
        } catch (error) {
            console.error('err (sites):', error);
        }
    };

    const fetchHubs = async (): Promise<void> => {
        setIsHubLoading(true);
        try {
            const res = await fetch('/api/hubs');
            const data = await res.json();
            setNearbyHubs(data.hubs);
        } catch (error) {
            console.error('err (hubs):', error);
        } finally {
            setIsHubLoading(false);
        }
    };

    const fetchSavedHubs = async (): Promise<void> => {
        setIsSavedHubsLoading(true);
        try {
            const res = await protectApi<Hub[]>(
                `/devices/hub`,
                undefined,
                undefined,
                undefined,
                false
            );
            const data = res.data.data;
            setSavedHubs(data);
            if (selectedHub) {
                const updated = data.find((h) => h.id === selectedHub.id);
                if (updated) setSelectedHub(updated);
            }
        } catch (error) {
            console.error('err (saved hubs):', error);
        } finally {
            setIsSavedHubsLoading(false);
        }
    };
    useEffect(() => {
        const fetchAll = async () => {
            const results = await Promise.allSettled([
                fetchHubs(),
                fetchSavedHubs(),
                fetchSites(),
            ]);

            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    const name = ['fetchHubs', 'fetchSavedHubs', 'fetchSites'][index];
                    console.error(`${name} failed:`, result.reason);
                }
            });
        };

        fetchAll();
    }, [])

    const handleToggleStream = async (toggleValue: boolean, id: string, physical_address: string, hub_id: number) => {
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
    const handleDeleteSavedCamera = async (cameraId: string, organizationId: string) => {
        const res = await protectApi<unknown, { cameraId: string, organizationId: string }>('/camera/delete?action=remove', 'DELETE', { cameraId, organizationId })
        if (res?.status === 200) {
            setIsDelete(false)
        }
    }
    const handleDeleHub = async (hubId: string) => {
        const res = await protectApi(`/devices/hub?action=remove&hubId=${hubId}`, 'DELETE', undefined, undefined, true)
        if (res.status === 200) {
            setIsHubDelete(false)
        }
    }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true)
        try {
            const res = await protectApi<unknown, { name: string, hubId: string, password: string, organizationId: string }>('/devices/hub?action=add', 'POST', { name, hubId: id, password, organizationId: selectedSite }, undefined, true)
            if (res?.status === 200) {
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
            <ManageDeviceView
            camera={camera} 
            setCamera={setCamera} 
            selectedSite={selectedSite} 
            sites={sites} 
            setSelectedSite={setSelectedSite} 
            handleDelete={handleDeleteSavedCamera} 
            isDelete={isDelete} 
            setIsDelete={setIsDelete} 
            toggleStream={handleToggleStream} 
            fetchSavedHubs={fetchSavedHubs} 
            isSavedHubLoading={isSavedHubsLoading} 
            selectedHub={selectedHub}
            setIsHubLoading={setIsHubLoading}
           />

            {isOpen && <HubDialogue 
            isLoading={isSaving}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSubmit={onSubmit}
            id={id}
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
            setId={setId}
            setName={setName}
            setPassword={setPassword}
            name={name}
            password={password}
            sites={sites}
            onClose={() => setIsOpen(false)} />}
        </>
    )

}

export default ManageDevicesController