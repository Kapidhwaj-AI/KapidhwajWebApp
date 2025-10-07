'use client'
import HomeView from '@/views/home/Home.view'
import { protectApi } from '@/lib/protectApi'
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '@/lib/storage'
import { Hub, ManageHub } from '@/models/settings'
import React, { useEffect, useState } from 'react'
const HubDialogue = dynamic(() => import('@/components/dialogue/HubDialogue'), { ssr: false })
import { Organization } from '@/models/organization'
const SiteFolderModal = dynamic(() => import('@/components/dialogue/SiteFolderModal'), { ssr: false })
import dynamic from 'next/dynamic'
import { RootActions, RootState, useStore } from '@/store'
const HomeController = () => {
    const [nearbyHubs, setNearbyHubs] = useState<ManageHub[]>([])
    const [savedHubs, setSavedHubs] = useState<Hub[]>([])
    const [commonHubs, setCommonHubs] = useState<Hub[]>([])
    const [isHubLoading, setIsHubLoading] = useState(false)
    const [isSavedHubsLoading, setIsSavedHubsLoading] = useState(false)

    const [devices, setDevices] = useState(0)
    const [isAddModal, setIsAddModal] = useState(false)
    const localHub = useStore((state: RootState) => state.hub.localHub)
    const remoteHub = useStore((state: RootState) => state.hub.remoteHub)
    const storedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const storedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const tempHub = JSON.parse(getLocalStorageItem('Remotetemphub') ?? '{}')
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [id, setId] = useState('')
    const [selectedSite, setSelectedSite] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [sites, setSites] = useState<Organization[]>([])
    const [isSiteAddModal, setIsSiteAddModal] = useState(false)
    const [siteName, setSiteName] = useState('')
    const setRemoteHub = useStore((state: RootActions) => state.setRemoteHub);
    const setLocalHUb = useStore((state: RootActions) => state.setLocalHUb);

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
            const res = await protectApi<Hub[]>(`/devices/hub`, "GET", undefined, undefined, true);
            const data = res.data.data
            setDevices(res.data.data.length)
            setSavedHubs(data)
        } catch (error) {
            console.error("err:", error)
        } finally {
            setIsSavedHubsLoading(false)
        }
    }
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
    useEffect(() => {
        fetchHubs()
        fetchSavedHubs()
    }, [])
    useEffect(() => {
        if (nearbyHubs.length > 0 && savedHubs.length > 0) {
            const commonHubs = savedHubs.filter(saved => {
                const match = nearbyHubs.some(nearby => {
                    const result = nearby.name.trim() === String(saved.id).trim();
                    return result;
                });
                return match;
            });
            setCommonHubs(commonHubs);
            if (commonHubs.length === 1) {
                setLocalHUb(commonHubs[0])
            }
        }
    }, [savedHubs, nearbyHubs]);

    const handleAccessRemotely = (hub: Hub) => {
        setLocalHUb(null)
        setRemoteHub(hub)
        removeLocalStorageItem('Localhub')
        if (storedRemoteHub) {
            setLocalStorageItem([['Remotetemphub', JSON.stringify(storedRemoteHub)], ['Remotehub', JSON.stringify(hub)]])
        } else {
            setLocalStorageItem([['Remotetemphub', JSON.stringify(hub)], ['Remotehub', JSON.stringify(hub)]])
        }
    }
    const handleAccessNearbyHubs = (hub: ManageHub) => {
        setLocalHUb(commonHubs.find((item) => item.id === hub.name) ?? null)
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true)
        try {
            const res = await protectApi<unknown, { name: string, hubId: string, password: string, organizationId: string }>('/devices/hub?action=add', 'POST', { name, hubId: id, password, organizationId: selectedSite }, undefined, true)
            if (res.status === 200) {
                setIsAddModal(false)
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
    const handleSubmit = async () => {
        setIsSaving(true)
        try {
            const res = await protectApi<unknown, { name: string }>('/organizations', 'POST', { name: siteName }, undefined, true);
            if (res.status === 201 || res.status === 200) {
                setIsSiteAddModal(false)
                setSiteName('')
                await fetchSites()
            }

        } catch (err) {
            console.error("Err:", err)
        } finally {
            setIsSaving(false)
        }
    }
    return (
        <>
            <HomeView commonHubs={commonHubs} setIsSiteAddModal={setIsSiteAddModal} setIsAddModal={setIsAddModal} handleNearbyHubsAccess={handleAccessNearbyHubs} devices={devices} handleAccessRemotely={handleAccessRemotely} fetchHub={fetchHubs} savedHubs={savedHubs} fetchSavedHubs={fetchSavedHubs} isHubLoading={isHubLoading} isSavedHubLoading={isSavedHubsLoading} nearbyHubs={nearbyHubs} />
            {isAddModal && <HubDialogue isLoading={isSaving} showPassword={showPassword} setShowPassword={setShowPassword} onSubmit={onSubmit} id={id} selectedSite={selectedSite} setSelectedSite={setSelectedSite} setId={setId} setName={setName} setPassword={setPassword} name={name} password={password} sites={sites} onClose={() => setIsAddModal(false)} />}
            {isSiteAddModal && <SiteFolderModal isLoading={isSaving} setName={setSiteName} name={siteName} onClose={() => { setIsSiteAddModal(false); setSiteName('') }} handleSubmit={handleSubmit} />}
        </>
    )
}

export default HomeController