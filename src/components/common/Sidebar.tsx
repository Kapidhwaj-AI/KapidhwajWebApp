import { ReactElement, useState } from 'react';
import { cn } from '@/lib/utils';
import { IconBellRinging, IconFolderStar, IconLogout2, IconSettings2, IconShareplay, IconSmartHome, IconUrgent } from '@tabler/icons-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { handleLogout } from '@/services/auth';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

type SidebarTabs = "/home" | "/streams" | "/alerts" | "/favourites" | "/notifications" | "/settings";

type MenuItemType = {
  icon: ReactElement;
  label: string;
  path: SidebarTabs;
};

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
  console.log(pathname);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChangeTab = (path: SidebarTabs) => {
    console.log("Changing tab to:", path); // Debug log
    router.push(path)
  };

  return (
    <div
      className={cn(
        'bg-[var(--surface-200)] flex flex-col py-4 mx-4 overflow-hidden transition-[width] duration-1000',
        isExpanded ? 'w-64 rounded-4xl' : 'w-25 rounded-full'
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo Section */}
      <div className={cn(
        'flex items-center mb-4 px-0',
        isExpanded ? 'px-4' : 'justify-center'
      )}>
        <div className="w-20 h-20 flex-shrink-0">
          <Image
            src="/assets/images/logo-square.png"
            alt="Logo"
            width={98}
            height={98}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        {isExpanded && (
          <h1 className="ml-3 font-semibold text-lg whitespace-nowrap">
            Kapidhwaj AI
          </h1>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center px-4 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleChangeTab(item.path)}
            className={cn(
              'flex items-center rounded-full transition-all duration-300 h-14',
              'hover:text-gray-900 dark:hover:text-gray-100',
              pathname.includes(item.path) ? 'bg-[#2B4C88] text-white' : 'bg-[var(--surface-400)] text-[#888888]',
              isExpanded
                ? 'w-full px-4 py-3 justify-start'
                : 'w-14  justify-center p-0 mx-auto'
            )}
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>

            {isExpanded && (
              <span className="ml-3 whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto flex flex-col items-center space-y-3 px-2">
        {/* Theme Toggle - Always visible */}
        <div className={cn(
          'flex items-center justify-center',
          isExpanded ? 'w-full' : 'w-14'
        )}>
          <ThemeToggle />
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className={cn(
            'rounded-full bg-[#a50000] text-white hover:bg-[#8a0000]',
            'transition-all duration-300',
            isExpanded ? 'w-full px-4 py-3' : 'w-14 h-14 p-0'
          )}
          variant="ghost"
        >
          {isExpanded ? 'Log Out' : <IconLogout2 stroke={2} size={20} />}
        </Button>
      </div>
    </div>
  );
}