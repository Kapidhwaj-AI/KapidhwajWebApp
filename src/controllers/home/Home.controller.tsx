import HomeView from '@/components/views/home/Home.view'
import { protectApi } from '@/lib/protectApi'
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '@/lib/storage'
import { Hub, ManageHub } from '@/models/settings'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const HomeController = () => {
    const [nearbyHubs, setNearbyHubs] = useState<ManageHub[]>([])
    const [savedHaubs, setSavedHubs] = useState<Hub[]>([])
    const [isHubLoading, setIsHubLoading] = useState(false)
    const [isSavedHubsLoading, setIsSavedHubsLoading] = useState(false)
    const [nearbyHubsErr, setNearbyHubsErr] = useState('')
    const [savedHubErr, setSavedErr] = useState('')
    const [isRemotely, setIsRemotely] = useState(false)
    const hub = getLocalStorageItem('hub')
    const router = useRouter()
    const fetchHubs = async () => {
        setIsHubLoading(true)
        try {
            const res = await fetch('/api/hubs');
            const data = await res.json();
            setNearbyHubs(data.hubs)
        } catch (error) {
            console.error("err:", error)
            setNearbyHubsErr(error)
        } finally {
            setIsHubLoading(false)
        }

    }
    const fetchSavedHubs = async () => {
        setIsSavedHubsLoading(true)
        try {
            console.log("helle")
            const res = await protectApi<Hub[]>(`/devices/hub`);
            const data = res.data.data
            setSavedHubs(data)
        } catch (error) {
            console.error("err:", error)
            setSavedErr(error)
        } finally {
            setIsSavedHubsLoading(false)
        }
    }
    useEffect(() => {
        fetchHubs()
        fetchSavedHubs()
        if (hub) {
            setIsRemotely(true)
        }
    }, [])
    const handleAccessRemotely = (hub: Hub) => {
        isRemotely ? removeLocalStorageItem('hub') : setLocalStorageItem('hub', JSON.stringify(hub));
        router.refresh()
        setIsRemotely((prev) => !prev)
    }

    return (
        <HomeView isRemotely={isRemotely} handleAccessRemotely={handleAccessRemotely} fetchHub={fetchHubs} savedHubs={savedHaubs} fetchSavedHubs={fetchSavedHubs} isHubLoading={isHubLoading} isSavedHubLoading={isSavedHubsLoading} nearbyHubs={nearbyHubs} />
    )
}

export default HomeController