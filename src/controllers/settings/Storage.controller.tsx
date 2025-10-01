'use client'
import { protectApi } from '@/lib/protectApi'
import { StorageUsage } from '@/models/settings'
import StorageView from '@/views/settings/Storage.view'
import React, { useState } from 'react'

const StorageController = () => {

    const [storageUsage, setStorageUsage] = useState<StorageUsage>({clipsGB:0, imagesGB:0, freeGB:0, sizeGB:0, usedGB:0, usedPercent:0, freePercent:0})
    const [loading, setLoading] = useState<boolean>(false)
    const fecthStorageDetails = async() => {    
        setLoading(true)
        try {
            const res = await protectApi<StorageUsage>(`/devices/hub/usage`, "GET")               
            if (res.status === 200) {
                console.log("storage details:", res.data)  
                setStorageUsage(res.data.data)
            }           
        } catch (error) {
            console.error("err:", error)            
        }  finally {
            setLoading(false)
        }
        
    }

    React.useEffect(() => {
        fecthStorageDetails()
    }, [])  
    console.log("storageUsage:", storageUsage)
  return <StorageView loading={loading} storageUsage={storageUsage}/>
}

export default StorageController