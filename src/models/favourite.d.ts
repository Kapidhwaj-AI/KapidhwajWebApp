import { Camera } from "./camera";

export interface Favourite{
    camera: Camera;
    organization: Organization
}

interface Organization{
    created_at:Date
    id:string
    name:string
    owner:string
    updated_at:Date
}

export interface FavouriteViewProps {
    search: string;
    setSearch: (val:string) => void;
    err: string;
    loading: boolean;
    filteredFavourites: Favourite[];
    toogleColumnValue:number;
    handleDelete: (id: number) => void;
    setIsDelete:(val: boolean) => void;
    isDelete: boolean;
}