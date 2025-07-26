"use client"
import FavouritesView from '@/components/views/favourites/Favourites.view';
import { protectApi } from '@/lib/protectApi';
import { Favourite } from '@/models/favourite';
import { RootState } from '@/redux/store';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';

const FavouritesController = () => {
    const toogleColumnValue = useSelector((state: RootState) => state.camera.toogleColumns);
    const [isDelete, setIsDelete] = useState(false)
    const [search, setSearch] = useState('')
    const [favourites, setFavourites] = useState<Favourite[]>([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const handleDelete = async (id: number) => {
        const res = await protectApi(`/camera/fav?cameraId=${id}`, 'DELETE')

        if (res.status === 200) {
            setIsDelete(false)
        }
        fetchFav()
    }
    const fetchFav = async () => {
        setLoading(true)
        try {
            const res = await protectApi<Favourite[], undefined>('/camera/fav')
            const data = res.data.data
            setFavourites(data)
        } catch (error) {
            setErr(error?.message)
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