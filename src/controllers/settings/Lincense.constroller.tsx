'use client'
import StartLicense from '@/components/dialogue/StartLicenseDialogue'
import { protectApi } from '@/lib/protectApi'
import { Category } from '@/models/category'
import { Organization } from '@/models/organization'
import LicenseView from '@/views/settings/License.view'
import React, { useEffect, useState } from 'react'

const LincenseConstroller = () => {
  const [loading, setLoading] = useState(false)
  const [sites, setSites] = useState<Organization[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isStartModal, setIsStartModal] = useState(false)
  const fetchSites = async () => {
    setLoading(true)
    try {
      const res = await protectApi<{ organization: Organization }[]>('/organizations', undefined, undefined, undefined, false)
      if (res.status === 200) {
        const sites = res.data.data?.map(
          (item) => item.organization,
        );
        setSites(sites)
      }
    } catch (error) {
      console.error("err:", error)
    } finally {
      setLoading(false)
    }
  }
  const fetchCat = async () => {
    try {
      const res = await protectApi<Category[]>(`/category?organizationId=${sites[0].id}`)
      setCategories(res.data.data)
    } catch (error) {
      console.error("Err", error)
    }
  }
  useEffect(() => {
    fetchSites();
    fetchCat();
  }, [])
  return (
    <>
      <LicenseView setIsStartModal={setIsStartModal} categories={categories} sites={sites} loading={loading} />
      {isStartModal && <StartLicense onClose={() => setIsStartModal(false)} sites={sites} categories={categories} isEdit />}
    </>
  )
}

export default LincenseConstroller