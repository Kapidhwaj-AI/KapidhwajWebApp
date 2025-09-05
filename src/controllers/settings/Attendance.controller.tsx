'use client'
import StartAttendance from '@/components/dialogue/StartAttendanceDialogue'
import { protectApi } from '@/lib/protectApi'
import { Category } from '@/models/category'
import { Organization } from '@/models/organization'
import AttendanceView from '@/views/settings/Attendance.view'
import React, { useEffect, useState } from 'react'

const AttendanceController = () => {
    const [loading, setLoading] = useState(false)
    const [sites, setSites] = useState<Organization[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isStartModal, setIsStartModal] = useState(false)
    const fetchSites = async () => {
        setLoading(true)
        try {
            const res = await protectApi<{ organization: Organization }[]>('/organizations', undefined, undefined, undefined, false)
            if (res?.status === 200) {
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
            setCategories(res?.data.data ??[])
        } catch (error) {
            console.error("Err", error)
        }
    }
    useEffect(() => {
        fetchSites();
        fetchCat();
    }, [])
    console.log("org", categories)
    return (
        <>
            <AttendanceView setIsStartModal={setIsStartModal} sites={sites} loading={loading} categories={categories} />
            {isStartModal && <StartAttendance categories={categories} onClose={() => setIsStartModal(false)} sites={sites} isEdit={false} />}
        </>
    )
}

export default AttendanceController
