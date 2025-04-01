"use client";
import { CameraDetailsViewToggleButton } from "@/components/camera/CameraDetailsViewToggleButton";
import CameraStreamCard from "@/components/camera/CameraStreamCard";
import OrganizationFilterButtons from "@/components/camera/OrganizationFilterButtons";
import SearchBar from "@/components/common/Searchbar";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Streams() {
  console.log("app-home-page");

  return (
    <div className="h-full flex flex-col gap-4 min-h-0 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Streams</h1>
        <div className="flex justify-between items-center gap-4">
          <CameraDetailsViewToggleButton />
          <SearchBar search="" setSearch={() => { }} />
        </div>
      </div>
      <OrganizationFilterButtons />
      <h2 className="text-lg ">Showing {6} streams</h2>
      <div className="flex-1 overflow-y-auto  scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-min">
          {[0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((_, index) => (
            <CameraStreamCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
