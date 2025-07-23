'use client'
import Spinner from "@/components/ui/Spinner";
import AlertsHomeViewController from "@/controllers/alerts/Alerts.home.view.controller";
import { CameraHomeViewController } from "@/controllers/camera/Camera.home.view.controller";
import { HomeProfileCardController } from "@/controllers/home/Home.profile.card.controller";
import { NotificationBadgeController } from "@/controllers/ui/Notification.badge.controller";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loadCount, setLoadCount] = useState(0);

  const incrementLoad = () => setLoadCount(prev => prev - 1)
  const decrementLoad = () => setLoadCount((prev) => prev - 1);
  useEffect(() => {
    if (loadCount === 0) setLoading(false);
  }, [loadCount]);
  const t = useTranslations()
  if (loading) return <Spinner />;
  return (
    <div className="h-full flex flex-col gap-4 min-h-0">
      <div className="flex items-center justify-between px-4">
        <HomeProfileCardController />

        <div className="relative">
          <NotificationBadgeController />
        </div>
      </div>

      <div className="flex md:flex-row flex-col flex-1 gap-4 min-h-0">
        {/* 5/7 of available width */}
        <div className="flex-[5] flex flex-col p-6 rounded-4xl bg-[var(--surface-100)] overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-lg">{t('home.favourites')}</span>

            <Link
              href={"/favourites"}
              className="bg-[var(--surface-200)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1"
            >
              {t('home.view_all')}
              <IconChevronRight className="text-sm" size={20}/>
            </Link>
          </div>
          <CameraHomeViewController />
        </div>

        {/* 2/7 of available width */}
        <div className="flex-[2] flex flex-col p-6 rounded-4xl bg-[var(--surface-100)] overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-lg">{t('home.alerts')}</span>
            <Link
              href={"/alerts"}
              className="bg-[var(--surface-200)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1"
            >
              {t('home.view_all')}
              <IconChevronRight className="text-sm" size={20}/>
            </Link>
          </div>
          <AlertsHomeViewController onStart={incrementLoad} onFinish={decrementLoad} />
        </div>
      </div>
    </div>
  );
}
