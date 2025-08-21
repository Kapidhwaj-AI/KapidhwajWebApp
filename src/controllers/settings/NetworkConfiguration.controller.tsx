'use client'
import { protectApi } from '@/lib/protectApi'
import NetworkConfigurationView from '@/views/settings/NetworkConfiguration.view'
import React, { useState } from 'react'

const NetworkConfigurationController = () => {
  const [loading, setLoading] = useState(false)
  const getNetwork = async () => {
    setLoading(true)
    try {
      const res = protectApi(``)
    } catch (err) {

    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <NetworkConfigurationView />
    </>
  )
}

export default NetworkConfigurationController