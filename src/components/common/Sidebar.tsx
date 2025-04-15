import React, { ReactElement, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { IconBellRinging, IconFolderStar, IconLogout2, IconSettings2, IconShareplay, IconSmartHome, IconUrgent } from '@tabler/icons-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { handleLogout } from '@/services/auth';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

type SidebarTabs = "/home" | "/streams" | "/alerts" | "/favourites" | "/notifications" | "/settings";

interface MenuItemType {
  icon: React.ReactElement<{ stroke?: number; size?: number }>;
  label: string;
  path: SidebarTabs;
}

const menuItems: MenuItemType[] = [
  { icon: <IconSmartHome stroke={2} size={24} />, label: 'Home', path: '/home' },
  { icon: <IconShareplay stroke={2} size={24} />, label: 'Streams', path: '/streams' },
  { icon: <IconUrgent stroke={2} size={24} />, label: 'Alerts', path: '/alerts' },
  { icon: <IconFolderStar stroke={2} size={24} />, label: 'Favourites', path: '/favourites' },
  { icon: <IconBellRinging stroke={2} size={24} />, label: 'Notifications', path: '/notifications' },
  { icon: <IconSettings2 stroke={2} size={24} />, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

  const handleChangeTab = (path: SidebarTabs) => {
    router.push(path);
    if (isMobile) setIsExpanded(false);
  };

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
          'bg-[var(--surface-200)] flex flex-col py-4 transition-[width] duration-1000',
          'fixed md:relative z-40 h-full',
          isMobile ?
            (shouldExpand ? 'w-64 rounded-r-2xl' : 'w-24 rounded-r-2xl') :
            (shouldExpand ? 'w-64 rounded-4xl mx-4' : 'w-24 rounded-full mx-4'),
        )}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
      >
        {/* Logo Section */}
        <div className={cn(
          'flex items-center mb-4',
          shouldExpand ? 'px-4' : 'justify-center px-0'
        )}>
          <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
            <Image
              onClick={toggleSidebar}
              src="/assets/images/logo-square.png"
              alt="Logo"
              width={98}
              height={98}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          {shouldExpand && (
            <h1 className="ml-3 font-semibold text-lg whitespace-nowrap overflow-hidden">
              <span className="inline-block animate-text-slide">Kapidhwaj AI</span>
            </h1>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col items-center px-2 space-y-2 md:space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleChangeTab(item.path)}
              className={cn(
                'flex items-center rounded-full transition-all duration-300',
                'hover:text-gray-900 dark:hover:text-gray-100',
                pathname.includes(item.path) ? 'bg-[#2B4C88] text-white' : 'bg-[var(--surface-400)] text-[#888888]',
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
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col items-center space-y-2 md:space-y-3 px-2">
          {/* Theme Toggle */}
          <div className={cn(
            'flex items-center',
            shouldExpand ? 'w-full justify-start pl-3' : 'w-12 h-12 md:w-14 md:h-14 justify-center'
          )}>
            <ThemeToggle />
            {/* {shouldExpand && <span className="ml-3">Theme</span>} */}
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className={cn(
              'rounded-full bg-[#a50000] text-white hover:bg-[#8a0000]',
              'transition-all duration-300',
              shouldExpand ? 'w-full px-3 py-2 h-12' : 'w-12 h-12 md:w-14 md:h-14 p-0'
            )}
            variant="ghost"
          >
            {shouldExpand ? 'Log Out' : <IconLogout2 stroke={2} size={isMobile ? 20 : 24} />}
          </Button>
        </div>
      </div>
    </>
  );
}