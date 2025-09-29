'use client'
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
const IconBellRinging = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconBellRinging),
  { ssr: false });
const IconSettings2 = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconSettings2),
  { ssr: false });
const IconShareplay = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconShareplay),
  { ssr: false });
const IconUrgent = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconUrgent),
  { ssr: false });
const IconMenu2 = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconMenu2),
  { ssr: false });
const IconX = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconX),
  { ssr: false });
const IconFolderHeart = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconFolderHeart),
  { ssr: false });
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ProfileMenu } from './ProfileMenu';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';
import { getLocalStorageItem } from '@/lib/storage';
import { BASE_URL } from '@/lib/protectApi';

type SidebarTabs = "/home" | "/streams" | "/alerts" | "/favourites" | "/notifications" | "/settings";

interface MenuItemType {
  icon: React.ReactElement<{ stroke?: number; size?: number }>;
  label: string;
  path: SidebarTabs;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations()
  const menuItems: MenuItemType[] = [
    // { icon: <IconSmartHome />, label: t('home_title'), path: '/home' },
    { icon: <IconShareplay />, label: t('streams.title'), path: '/streams' },
    { icon: <IconUrgent />, label: t('alerts.title'), path: '/alerts' },
    { icon: <IconFolderHeart />, label: t('favourites.title'), path: '/favourites' },
    { icon: <IconBellRinging />, label: t('notifications.title'), path: '/notifications' },
    { icon: <IconSettings2 />, label: t('settings.title'), path: '/settings' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const userProfile = JSON.parse(getLocalStorageItem('user') ?? '{}').profile_image;
  const shouldExpand = isMobile ? isExpanded : (isExpanded || isHovering);
  useEffect(() => {
    if (!isHovering || !isExpanded) {
      setIsProfileMenuOpen(false)
    }
  }, [isHovering, isExpanded])
  return (
    <>
      {isMobile && (
        <div className="flex items-center justify-between bg-[var(--surface-200)] px-4 py-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo-square.webp"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
              priority={false}
            />
            <span className="font-semibold text-base">Kapidhwaj AI</span>
          </div>
          <button
            onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsProfileMenuOpen(false) }}
            className="p-2 rounded-lg bg-[var(--surface-300)]"
          >
            <IconMenu2 size={24} />
          </button>
        </div>
      )}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <div className="bg-[var(--surface-200)] w-64 h-full p-4 flex flex-col justify-between">
            <div className='flex flex-col gap-5'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-1 items-center'>

                  <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                    <Image
                      onClick={() => setIsExpanded(!isExpanded)}
                      src="/assets/images/logo-square.webp"
                      alt="Logo"
                      width={98}
                      height={98}
                      className="rounded-full object-cover w-full h-full"
                      priority={false}
                    />
                  </div>

                  <span className="font-semibold text-base md:text-lg  whitespace-nowrap overflow-hidden">
                    Kapidhwaj AI
                  </span>
                </div>
                <button
                  onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsProfileMenuOpen(false) }}
                  className="p-2 rounded-lg bg-[var(--surface-300)]"
                >
                  {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {
                  menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-2',
                        pathname.includes(item.path)
                          ? 'bg-[#2B4C88] text-white'
                          : 'bg-[var(--surface-400)] text-[#888888] hover:text-gray-900 dark:hover:text-gray-100'
                      )}
                    >
                      {React.cloneElement(item.icon, { stroke: 2, size: 22 })}
                      <span>{item.label}</span>
                    </Link>
                  ))}
              </nav>
            </div>

            {/* Profile */}
            <div>
              <button
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 w-full rounded-lg px-4 py-2 hover:ring-2 hover:ring-blue-500"
              >
                <Image
                  src={userProfile ? BASE_URL+ userProfile : "/assets/images/person-logo.webp"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  priority={false}
                />
                <span className="text-sm">{t('your_profile')}</span>
              </button>
              <ProfileMenu
                isOpen={isProfileMenuOpen}
                onClose={() => setIsProfileMenuOpen(false)}
              />
            </div>
          </div>

          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      {!isMobile && (
        <div
          className={cn(
            'bg-[var(--surface-200)] flex md:flex-col items-center justify-between md:py-4  md:transition-[width] md:duration-1000',
            shouldExpand ? 'w-60 rounded-4xl' : 'w-24 rounded-full'
          )}
          onMouseEnter={() => !isMobile && setIsHovering(true)}
          onMouseLeave={() => !isMobile && setIsHovering(false)}
        >
          {/* Logo + Title */}
          <div className='flex md:flex-col w-full md:justify-start md:px-0  justify-between'>
            <div className={cn(
              'flex items-center md:mb-4 transition-[width] duration-1000',
              shouldExpand
                ? 'w-full px-3 py-2 md:px-4 md:py-3 justify-start h-12 md:h-14'
                : 'w-12 h-12 md:w-14 md:h-14 justify-center p-0 mx-auto'
            )}>
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <Image
                  onClick={() => setIsExpanded(!isExpanded)}
                  src="/assets/images/logo-square.webp"
                  alt="Logo"
                  width={98}
                  height={98}
                  className="rounded-full object-cover w-full h-full"
                  priority={false}
                />
              </div>
              {shouldExpand && (
                <span className="font-semibold text-base md:text-lg ml-2 whitespace-nowrap overflow-hidden">
                  Kapidhwaj AI
                </span>
              )}
            </div>

            {/* Nav */}
            {<nav className="flex flex-col items-center px-5 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className={cn(
                    'flex items-center rounded-full transition-[width] duration-1000',
                    pathname.includes(item.path) ? 'bg-[#2B4C88] text-white' : 'bg-[var(--surface-400)] text-[#888888] hover:text-gray-900 dark:hover:text-gray-100',
                    shouldExpand
                      ? 'w-full px-3 py-2 md:px-4 md:py-3 justify-start h-12 md:h-14'
                      : 'w-12 h-12 md:w-14 md:h-14 justify-center p-0 mx-auto'
                  )}
                >
                  {React.cloneElement(item.icon, {
                    stroke: 2,
                    size: 24
                  })}
                  {shouldExpand && (
                    <span className="ml-3 whitespace-nowrap overflow-hidden text-sm md:text-base">
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </nav>}
          </div>

          {/* Bottom profile */}
          <div className="relative  w-full items-center justify-center space-y-3 px-5">
            <button
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              className={cn(
                'rounded-full flex items-center md:justify-center justify-end  hover:ring-2 hover:ring-blue-500 ',
                shouldExpand ? 'w-full  gap-3 px-3 py-2' : 'w-full h-12 md:h-14'
              )}
            >
              <Image
                src={userProfile ? BASE_URL + userProfile : "/assets/images/person-logo.webp"}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full object-cover"
                priority={false}
              />
              {shouldExpand && (
                <span className="text-sm text-gray-700 dark:text-gray-200">{t('your_profile')}</span>
              )}
            </button>


            <ProfileMenu
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
