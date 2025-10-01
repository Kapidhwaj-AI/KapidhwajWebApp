"use client"
import FavouritesView from '@/views/favourites/Favourites.view';
import { protectApi } from '@/lib/protectApi';
import { Favourite } from '@/models/favourite';
import React, { useEffect, useMemo, useState } from 'react'
import { AxiosError } from 'axios';
import { showToast } from '@/lib/showToast';
import { RootState, useStore } from '@/store';

const FavouritesController = () => {
    const toogleColumnValue = useStore((state: RootState) => state.camera.toogleColumns);
    const [isDelete, setIsDelete] = useState(false)
    const [search, setSearch] = useState('')
    const [favourites, setFavourites] = useState<Favourite[]>([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')

    const handleDelete = async (id: number) => {
        const res = await protectApi(`/camera/fav/remove?cameraId=${id}`, 'POST', { cameraId: id })
        const res1 = await protectApi(`/camera/fav/remove?cameraId=${id}`, 'POST', { cameraId: id }, undefined, true)

        if (res?.status === 200 && res1?.status === 200) {
            setIsDelete(false)
        }
        fetchFav()
    }
    const fetchFav = async () => {
        setLoading(true)
        try {
            const res = await protectApi<Favourite[], undefined>('/camera/fav')
            const data = res?.data.data
            setFavourites(data ?? [])
        } catch (error) {
            setErr(error?.message)
            if (error instanceof AxiosError && error.response?.status === 400) {
                showToast(error.response?.data.error, "error")
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchFav()
    }, [])
    const filteredFavourites = useMemo(() => {
        return search.trim().length > 0 ? favourites.filter((item) => item.camera.name.toLowerCase().includes(search)) : favourites
    }, [search, favourites])
    return (
        <FavouritesView loading={loading} setIsDelete={setIsDelete} setSearch={setSearch} isDelete={isDelete} filteredFavourites={filteredFavourites} search={search} err={err} handleDelete={handleDelete} toogleColumnValue={toogleColumnValue} />
    )
}

export default FavouritesController