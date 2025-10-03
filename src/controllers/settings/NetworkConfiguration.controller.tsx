'use client'
import { protectApi } from '@/lib/protectApi'
import { showToast } from '@/lib/showToast'
import { NetworkData, NicsData } from '@/models/settings'
import NetworkConfigurationView from '@/views/settings/NetworkConfiguration.view'
import React, { useEffect, useState } from 'react'

const NetworkConfigurationController = () => {
  const [loading, setLoading] = useState(false)
  const [newtworkData, setNetworkData] = useState<NetworkData>()
  const [nics, setNics] = useState<NicsData[]>([])
  const [nic, setNic] = useState('')
  const [status, setStatus] = useState<{ isInternetConnected: boolean, isSocketConnected: boolean, isTunnelAlive: boolean }>()
  const getNetwork = async () => {
    try {
      const res = await protectApi<NetworkData>(`/network`)
      const nicRes = await protectApi<NicsData[]>('/network/nics')
      setNetworkData(res?.data.data)
      setNics(nicRes?.data.data ?? [])
      setNic((nicRes?.data.data.find((item) => item.id === 'eth0')?.id || res?.data.data.nic) ?? '')
    } catch (err) {
      console.error(err, "Error")
    } finally {

    }
  }
  const healthCheck = async () => {
    try {
      const res = await protectApi<{ isInternetConnected: boolean, isSocketConnected: boolean, isTunnelAlive: boolean }>('/devices/hub/health')   
      if( res?.status === 200  ){
        setStatus(res?.data.data)      
      }    
    } catch (error) {     
      console.error("err", error)
      setStatus(undefined) 
    }
  } 
  const handleSave = async (data: NetworkData) => {
    if (data.mode === 'static') {
      if (!data.ipv4?.address || !data.ipv4.gateway || !data.ipv4.subnetMask) {
        console.error("error", data)
        showToast('Please Fill all the feilds', "error")
        return
      }
    }
   
    setLoading(true)
    data.nic = nic
    try {
      const res = await protectApi<unknown, NetworkData>('/network', 'PUT', data)
      if (res?.status === 200) {
        const res = await protectApi<unknown>('/network/apply', 'POST')
        if (res?.status === 200) {
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
    healthCheck()
    const intervalId: NodeJS.Timeout = setInterval(healthCheck, 10000);
    return () => clearInterval(intervalId);
  }, [])
  return (
    <>
      <NetworkConfigurationView nic={nic} setNic={setNic} nicsData={nics} loading={loading} networkData={newtworkData} handleSave={handleSave} />
    </>
  )
}

export default NetworkConfigurationController

