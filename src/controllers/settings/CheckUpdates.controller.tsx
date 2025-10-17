import { protectApi } from '@/lib/protectApi';
import { UpdatesData } from '@/models/settings';
import CheckUpdatesView from '@/views/settings/CheckUpdates.view';
import React, { useEffect, useState } from 'react'

const CheckUpdatesController = () => {
  const [loading, setLoading] = useState(false);
  const [updates, setUpdates] = useState<UpdatesData>()

  const checUpdates = async () => {
    setLoading(true)
    try {
      const res = await protectApi<UpdatesData>('/devices/hub/update/get')
      if (res.status === 200) {
        setUpdates(res.data.updatesData)
      }
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checUpdates()
  }, [])
  console.log(updates,"updates")
  return (
    <>
      <CheckUpdatesView />
    </>
  )
}

export default CheckUpdatesController