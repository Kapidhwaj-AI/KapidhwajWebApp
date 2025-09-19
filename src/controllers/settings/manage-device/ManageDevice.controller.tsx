'use client'
import { protectApi } from '@/lib/protectApi';
import { Organization } from '@/models/organization';
import { Hub, } from '@/models/settings';
import React, {  useEffect, useState } from 'react'
import { Camera } from '@/models/camera';
import ManageDeviceView from '@/views/settings/ManageDevice.view';

const ManageDevicesController = () => {
    const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
    const [savedHaubs, setSavedHubs] = useState<Hub[]>([])
    const [isHubLoading, setIsHubLoading] = useState(false)
    const [isSavedHubsLoading, setIsSavedHubsLoading] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [camera, setCamera] = useState<Camera>()
    const [selectedSite, setSelectedSite] = useState('')
    const [sites, setSites] = useState<Organization[]>([])
    const fetchSites = async (): Promise<void> => {
        try {
            const res = await protectApi<{ organization: Organization }[]>(
                '/organizations',
                undefined,
                undefined,
                undefined,
                false
            );
            if (res.status === 200) {
                const sites = res.data.data?.map((item) => item.organization);
                setSites(sites);
            }
        } catch (error) {
            console.error('err (sites):', error);
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
            else{
                setSelectedHub(data[0])
            }
        } catch (error) {
            console.error('err (saved hubs):', error);
        } finally {
            setIsSavedHubsLoading(false);
        }
    };
    useEffect(() => {
        const fetchAll = async () => {
            const results = await Promise.allSettled([,
                fetchSavedHubs(),
                fetchSites(),
            ]);

            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    const name = ['fetchSavedHubs', 'fetchSites'][index];
                    console.error(`${name} failed:`, result.reason);
                }
            });
        };

        fetchAll();
    }, [])

    const handleToggleStream = async (toggleValue: boolean, id: string, physical_address: string, hub_id: string) => {
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
            await fetchSavedHubs()
        }
    }
    return (
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
    )

}

export default ManageDevicesController