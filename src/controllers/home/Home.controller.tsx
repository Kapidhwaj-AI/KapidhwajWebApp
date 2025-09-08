'use client'
import HomeView from '@/views/home/Home.view'
import { protectApi } from '@/lib/protectApi'
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '@/lib/storage'
import { Hub, ManageHub } from '@/models/settings'
import React, { useEffect, useState } from 'react'
import HubDialogue from '@/components/dialogue/HubDialogue'
import { Organization } from '@/models/organization'
import SiteFolderModal from '@/components/dialogue/SiteFolderModal'
import { setLocalHUb, setRemoteHub } from '@/redux/slices/hubSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'


const HomeController = () => {
    const [nearbyHubs, setNearbyHubs] = useState<ManageHub[]>([])
    const [savedHubs, setSavedHubs] = useState<Hub[]>([])
    const [commonHubs, setCommonHubs] = useState<Hub[]>([])
    const [isHubLoading, setIsHubLoading] = useState(false)
    const [isSavedHubsLoading, setIsSavedHubsLoading] = useState(false)

    const [devices, setDevices] = useState(0)
    const [isAddModal, setIsAddModal] = useState(false)
    const storedHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
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
    const dispatch = useDispatch<AppDispatch>()
    const fetchHubs = async () => {
        setIsHubLoading(true)
        try {
            const res = await fetch('/api/hubs');
            const data = await res.json();
            setNearbyHubs(data.hubs)

        } catch (error) {
            console.error("err:", error)

        } finally {
            ``
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
            if (error.status === 401 && error.response.data.message === "THE BEARER TOKEN IS INVALIDATED (LOGGED OUT)") {
                document.cookie = "locale=; path=/; max-age=0";
                removeLocalStorageItem('kapi-token')
                removeLocalStorageItem('hub')
                removeLocalStorageItem('temphub')
                window.location.href = '/login';
            }

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
            if (error.status === 400 && error.response.data.message === `Hub with ID ${storedHub.id} is not connected`) {
                setLocalStorageItem("hub", JSON.stringify(tempHub))
            }
            console.error("err:", error)
        }
    }
    useEffect(() => {
        fetchHubs()
        fetchSavedHubs()
    }, [])
    useEffect(() => {
        if (nearbyHubs.length > 0 && savedHubs.length > 0) {
            console.log("SavedHubs:", savedHubs);
            console.log("NearbyHubs:", nearbyHubs);

            const commonHubs = savedHubs.filter(saved => {
                const match = nearbyHubs.some(nearby => {
                    const result = nearby.name.trim() === String(saved.id).trim();
                    return result;
                });
                return match;
            });


            setCommonHubs(commonHubs);

            if (commonHubs.length === 1) {
                console.log("Final CommonHubs:", commonHubs);

                dispatch(setLocalHUb(commonHubs[0]));
            }
        }
    }, [savedHubs, nearbyHubs]);

    const handleAccessRemotely = (hub: Hub) => {
        // const findHub = nearbyHubs.find((item) => item.name === hub.id)
        // if (findHub) {
        //     setLocalStorageItem('hub', JSON.stringify({ ...hub, isRemotely: !isRemotely }));
        //     setIsRemotely((prev) => !prev)
        // }
        // else {
        dispatch(setRemoteHub(hub))
        if (storedHub) {
            setLocalStorageItem('Remotetemphub', JSON.stringify(storedHub))
        } else {
            setLocalStorageItem('Remotetemphub', JSON.stringify(hub))
        }
        window.location.reload();
    }
    const handleAccessNearbyHubs = (hub: ManageHub) => {
        dispatch(setLocalHUb(commonHubs.find((item) => item.id === hub.name) ?? null))
        // window.location.reload();
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