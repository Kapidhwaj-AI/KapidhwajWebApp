import { AlertCard } from "@/components/alert/AlertCard";
import CameraStreamCard from "@/components/camera/CameraStreamCard";
import HomeProfileCard from "@/components/common/HomeProfileCard";
import { IconBellRinging } from "@tabler/icons-react";
import Link from 'next/link';

export default function Home() {

  return (
    <div className="h-full flex flex-col gap-4 min-h-0">
      <div className="flex items-center justify-between px-4">
        {/* Profile Card - Positioned top-left */}
        <HomeProfileCard />
        <div className="relative">
          <Link href={"/notifications"}>
            <div className="bg-[var(--surface-100)] text-[#888888] rounded-full p-4">

              <IconBellRinging stroke={2} size={24} />
            </div>
          </Link>
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            2
          </span>
        </div>
      </div>
      <div className="flex flex-1 gap-4 min-h-0 rounded-4xl">
        {/* 5/7 of available width */}
        <div className="flex-[5] flex flex-col p-6 rounded-4xl bg-[var(--surface-100)] overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-lg">Favourites</span>
            <Link href={"/favourites"} className="bg-[var(--surface-200)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
              View All
              <span className="text-md leading-none">&gt;</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto  scrollbar-hide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-min">
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <CameraStreamCard key={index} />
              ))}
            </div>
          </div>
        </div>

        {/* 2/7 of available width */}
        <div className="flex-[2] flex flex-col p-6 rounded-4xl bg-[var(--surface-100)] overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-lg">Alerts</span>
            <Link href={"/alerts"} className="bg-[var(--surface-200)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
              View All
              <span className="text-md leading-none">&gt;</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto  scrollbar-hide">
            <div className="grid grid-cols-1 gap-6 min-h-min">
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <AlertCard alert={""} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}