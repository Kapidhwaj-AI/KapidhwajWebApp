"use client";
import { CameraDetailsViewToggleButton } from "@/components/camera/CameraDetailsViewToggleButton";
import CameraStreamCard from "@/components/camera/CameraStreamCard";
import ColumnDropdown from "@/components/camera/ColumnDropdown";
import OrganizationFilterButtons from "@/components/camera/OrganizationFilterButtons";
import SearchBar from "@/components/common/Searchbar";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Favourites() {
    console.log("app-home-page");
    const toogleColumnValue = useSelector((state: RootState) => state.camera.toogleColumns);
    return (
        <div className="h-full flex flex-col gap-4 min-h-0 p-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Favourites</h1>
                <div className="flex justify-between items-center gap-4">
                    <CameraDetailsViewToggleButton />
                    <ColumnDropdown />
                    <SearchBar search="" setSearch={() => { }} placeholder="Search Favourites       " />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide mt-5">
                <div className={cn("grid grid-cols-1 gap-6 min-h-min",
                    {
                        "md:grid-cols-1": toogleColumnValue === 1,
                        "md:grid-cols-2": toogleColumnValue === 2,
                        "md:grid-cols-3": toogleColumnValue === 3,
                        "md:grid-cols-4": toogleColumnValue === 4,
                        "md:grid-cols-5": toogleColumnValue === 5,
                    }
                )}>
                    {[0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((_, index) => (
                        <CameraStreamCard key={index} isFavouritesPage/>
                    ))}
                </div>
            </div>
        </div>
    );
}
