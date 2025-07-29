'use client'
import HomeView from '@/components/views/home/Home.view'
import { protectApi } from '@/lib/protectApi'
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '@/lib/storage'
import { Hub, ManageHub } from '@/models/settings'
import React, { useEffect, useState } from 'react'


const HomeController = () => {
    const [nearbyHubs, setNearbyHubs] = useState<ManageHub[]>([])
    const [savedHaubs, setSavedHubs] = useState<Hub[]>([])
    const [isHubLoading, setIsHubLoading] = useState(false)
    const [isSavedHubsLoading, setIsSavedHubsLoading] = useState(false)
    const [isRemotely, setIsRemotely] = useState(false)
    const [devices, setDevices] = useState(0)
    const hub = JSON.parse(getLocalStorageItem('hub') ?? '{}')
    const isValidHub = hub && typeof hub === 'object' && 'id' in hub && 'isRemotely' in hub;
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
            setDevices(res.data.data.length)
            setSavedHubs(data)
        } catch (error) {
            console.error("err:", error)
            // if (error.status === 401 && error.response.data.message === "THE BEARER TOKEN IS INVALIDATED (LOGGED OUT)") {
            //     document.cookie = "locale=; path=/; max-age=0";
            //     toast.error(error.response.data.message ?? 'THE BEARER TOKEN IS INVALIDATED (LOGGED OUT)')
            //     removeLocalStorageItem('user')
            //     removeLocalStorageItem('kapi-token')
            //     removeLocalStorageItem('hub')
            //     router.replace("/login");
            // }

        } finally {
            setIsSavedHubsLoading(false)

        }
    }
    useEffect(() => {
        fetchHubs()
        fetchSavedHubs()
        if (isValidHub && hub.isRemotely) {
            setIsRemotely(true)
        }
    }, [])
    const handleAccessRemotely = (hub: Hub) => {
        setLocalStorageItem('hub', JSON.stringify({ ...hub, isRemotely: !isRemotely }));
        setIsRemotely((prev) => !prev)
        removeLocalStorageItem('kapi-token')
        window.location.href ='/login';
    }

    return (
        <HomeView devices={devices} isRemotely={isRemotely} handleAccessRemotely={handleAccessRemotely} fetchHub={fetchHubs} savedHubs={savedHaubs} fetchSavedHubs={fetchSavedHubs} isHubLoading={isHubLoading} isSavedHubLoading={isSavedHubsLoading} nearbyHubs={nearbyHubs} />
    )
}

export default HomeController