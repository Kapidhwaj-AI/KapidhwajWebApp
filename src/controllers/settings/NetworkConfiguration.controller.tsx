'use client'
import { protectApi } from '@/lib/protectApi'
import { showToast } from '@/lib/showToast'
import { NetworkData } from '@/models/settings'
import NetworkConfigurationView from '@/views/settings/NetworkConfiguration.view'
import React, { useEffect, useState } from 'react'

const NetworkConfigurationController = () => {
    const [loading, setLoading] = useState(false)
    const [newtworkData, setNetworkData] = useState<NetworkData>()
    const getNetwork = async () => {
        try {
            const res = await protectApi<NetworkData>(`/network`)
            setNetworkData(res.data.data)
        } catch (err) {
            console.error(err, "Error")
        } finally {

        }
    }
    const handleSave = async (data: NetworkData) => {
        if (data.mode === 'static') {
            if (!data.ipv4?.address || !data.ipv4.gateway || !data.ipv4.subnetMask || !data.dns?.alternate || !data.dns.preferrd) {
                showToast('Please Fill all the feilds', "error")
                return
            }
        }
        if (!data.autoDns) {
            if (!data.dns?.alternate || !data.dns.preferrd) {
                showToast('Please Fill all the feilds', "error")
                return
            }
        }
        setLoading(true)
        try {
            const res = await protectApi<unknown, NetworkData>('/network', 'PUT', data)
            if (res.status === 200) {
                const res = await protectApi<unknown>('/network/apply', 'POST')
                if (res.status === 200) {
                    getNetwork()
                }
            }
        } catch (error) {
            console.error("err", error)
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        getNetwork()
    }, [])
    return (
        <>
            <NetworkConfigurationView loading={loading} networkData={newtworkData} handleSave={handleSave} />
        </>
    )
}

export default NetworkConfigurationController

