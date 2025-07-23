"use client";
import { CameraDetailsViewToggleButton } from "@/components/camera/CameraDetailsViewToggleButton";
import CameraStreamCard from "@/components/camera/CameraStreamCard";
import ColumnDropdown from "@/components/camera/ColumnDropdown";
import OrganizationFilterButtons from "@/components/camera/OrganizationFilterButtons";
import SearchBar from "@/components/common/Searchbar";
import Spinner from "@/components/ui/Spinner";
import { protectApi } from "@/lib/protectApi";
import { cn } from "@/lib/utils";
import { Favourite } from "@/models/favourite";
import { RootState } from "@/redux/store";
import { FileChartColumn } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function Favourites() {
    console.log("app-home-page");
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
            setErr(error)
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
    const t = useTranslations()
    if (err) return <p className="text-red text-center">{err}</p>
    if (loading) return <Spinner />

    return (
        <div className="h-full flex flex-col gap-4 min-h-0 p-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{t('favourites.title')}</h1>
                <div className="flex justify-between items-center gap-4">
                    <CameraDetailsViewToggleButton />
                    <ColumnDropdown />
                    <SearchBar search={search} setSearch={(e) => setSearch(e.target.value)} placeholder={t('favourites.search_placeholder')} />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide mt-5">
                {filteredFavourites.length === 0 ? <p className="text-center w-full h-full flex items-center justify-center dark:text-white">{t('favourites.no_favourites')}</p> :
                    <div className={cn("grid grid-cols-1 gap-6 min-h-min",
                        {
                            "md:grid-cols-1": toogleColumnValue === 1,
                            "md:grid-cols-2": toogleColumnValue === 2,
                            "md:grid-cols-3": toogleColumnValue === 3,
                            "md:grid-cols-4": toogleColumnValue === 4,
                            "md:grid-cols-5": toogleColumnValue === 5,
                        }
                    )}>
                        {filteredFavourites.map((favourite, index) => (
                            <CameraStreamCard handleDelete={handleDelete} setIsDelete={setIsDelete} isDelete={isDelete} isFav camera={favourite.camera} key={index} />
                        ))}
                    </div>
                }

            </div>
        </div>
    );
}
