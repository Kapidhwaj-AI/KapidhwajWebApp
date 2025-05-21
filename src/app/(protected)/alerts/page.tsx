"use client";
import { AlertCard } from "@/components/alert/AlertCard";
import AlertsFiltersButtons from "@/components/alert/AlertsFiltersButtons";
import SearchBar from "@/components/common/Searchbar";
import { IconFilter } from "@tabler/icons-react";

export default function Alerts() {
  console.log("app-home-page");

  return (
    //temp colour changed -> bg-stone-800
    <div className="h-full flex flex-col gap-4 min-h-0 p-5 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Alerts</h1>
        <div className="flex items-center gap-4">
          <SearchBar search="" setSearch={() => { }} placeholder="Search Notification" />
          <div className="bg-[var(--surface-100)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full flex items-center gap-1">
            <IconFilter stroke={2} />
            <span>Filters</span>
          </div>
        </div>
      </div>
      <AlertsFiltersButtons />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((_, index) => (
              <AlertCard alert={""} key={index} />
            ))
          }
        </div>
      </div>
    </div >
  );
}
