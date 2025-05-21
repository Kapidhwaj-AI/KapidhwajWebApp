import { AlertCard } from "@/components/alert/AlertCard";
import CameraStreamCard from "@/components/camera/CameraStreamCard";
import { CameraHomeViewController } from "@/controllers/camera/Camera.home.view.controller";
import { HomeProfileCardController } from "@/controllers/home/Home.profile.card.controller";
import { NotificationBadgeController } from "@/controllers/ui/Notification.badge.controller";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-4 min-h-0">
      <div className="flex items-center justify-between px-4">
        {/* Profile Card - Positioned top-left */}
        <HomeProfileCardController />

        <div className="relative">
          <NotificationBadgeController />
        </div>
      </div>

      <div className="flex flex-1 gap-4 min-h-0">
        {/* 5/7 of available width */}
        <div className="flex-[5] flex flex-col p-6 rounded-4xl bg-[var(--surface-100)] overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-lg">Favourites</span>

            <Link
              href={"/favourites"}
              className="bg-[var(--surface-200)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1"
            >
              View All
              <span className="text-md leading-none">&gt;</span>
            </Link>
          </div>

          {/* <div className="flex-1 overflow-y-auto  scrollbar-hide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-min">
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <CameraStreamCard
                  key={index}
                  camera={null}
                  folder={null}
                  orgName={""}
                />
              ))}
            </div>
          </div> */}

          <CameraHomeViewController />
        </div>

        {/* 2/7 of available width */}
        <div className="flex-[2] flex flex-col p-6 rounded-4xl bg-[var(--surface-100)] overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-lg">Alerts</span>
            <Link
              href={"/alerts"}
              className="bg-[var(--surface-200)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1"
            >
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
