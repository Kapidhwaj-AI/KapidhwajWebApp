'use client'
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { IconBellRinging, IconFolderStar, IconSettings2, IconShareplay, IconSmartHome, IconUrgent } from '@tabler/icons-react';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { ProfileMenu } from './ProfileMenu';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations()
  const menuItems: MenuItemType[] = [
    { icon: <IconSmartHome stroke={2} size={24} />, label: t('home_title'), path: '/home' },
    { icon: <IconShareplay stroke={2} size={24} />, label: t('streams.title'), path: '/streams' },
    { icon: <IconUrgent stroke={2} size={24} />, label: t('alerts.title'), path: '/alerts' },
    { icon: <IconFolderStar stroke={2} size={24} />, label: t('favourites.title'), path: '/favourites' },
    { icon: <IconBellRinging stroke={2} size={24} />, label: t('notifications.title'), path: '/notifications' },
    { icon: <IconSettings2 stroke={2} size={24} />, label: t('settings.title'), path: '/settings' },
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



  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if sidebar should appear expanded
  const shouldExpand = isMobile ? isExpanded : (isExpanded || isHovering);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      {/* {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-[var(--surface-300)] md:hidden"
        >
          ☰
        </button>
      )} */}

      <div
        className={cn(
          'bg-[var(--surface-200)] flex flex-col items-center justify-between py-4 transition-[width] duration-1000',
          'fixed md:relative z-40 h-full',
          isMobile ?
            (shouldExpand ? 'w-64 rounded-r-2xl' : 'w-24 rounded-r-2xl') :
            (shouldExpand ? 'w-64 rounded-4xl mx-4' : 'w-24 rounded-full mx-4'),
        )}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
      >
        {/* Logo Section */}
        <div>
          <div className={cn(
            'flex items-center mb-4 transition-[width] duration-1000',
            shouldExpand
              ? 'w-full px-3 py-2 md:px-4 md:py-3 justify-start h-12 md:h-14'
              : 'w-12 h-12 md:w-14 md:h-14 justify-center p-0 mx-auto'
          )}>
            <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
              <Image
                onClick={toggleSidebar}
                src="/assets/images/logo-square.png"
                alt="Logo"
                width={98}
                height={98}
                className="rounded-full object-cover w-full h-full"
                priority={true}
              />
            </div>
              {shouldExpand && (
                <span className="font-semibold text-base md:text-lg ml-2 whitespace-nowrap overflow-hidden">
                  Kapidhwaj AI
                </span>
              )}
          

          </div>

          <nav className="flex flex-col items-center  space-y-2 md:space-y-3">
            {menuItems.map((item) => (
              <Link
                onClick={() => { if (isMobile) setIsExpanded(false) }}
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
                <div className="flex-shrink-0">
                  {React.cloneElement(item.icon, {
                    stroke: 2,
                    size: isMobile ? 20 : 24
                  })}
                </div>

                {shouldExpand && (
                  <span className="ml-3 whitespace-nowrap overflow-hidden text-sm md:text-base">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex w-full  items-center justify-center  space-y-2 md:space-y-3 px-5">
          <button
            onClick={() => setIsProfileMenuOpen(true)}
            className={cn(
              'relative rounded-full flex items-center justify-center transition-[width] duration-1000 hover:ring-2 hover:ring-blue-500 ',
              shouldExpand ? 'w-full flex items-center justify-center gap-3 px-3 py-2' : 'w-full h-12  md:h-14'
            )}
          >
            <Image
              src="/assets/images/person-logo.png"
              alt="Profile"
              width={isMobile ? 40 : 48}
              height={isMobile ? 40 : 48}
              className="rounded-full object-cover"
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
    </>
  );
}