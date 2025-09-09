"use client";
import { protectApi } from "@/lib/protectApi";
import { getLocalStorageItem, removeLocalStorageItem } from "@/lib/storage";
import { clearAuthToken } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { apiBaseUrl } from "@/services/config";
import { IconMoon, IconSun, IconUser, IconLogout2 } from "@tabler/icons-react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const hub = JSON.parse(getLocalStorageItem('hub') ?? '{}')
  const isValidHub = hub && typeof hub === 'object' && 'id' in hub && 'isRemotely' in hub;
  const handleLogoutClick = async () => {
    const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
    try {
      const res = await axios({
        url: `${apiBaseUrl}/signout`, method: "POST", headers: {
          'Authorization': `BBearer ${token}`
        }
      })
      if (res?.status === 200) {
        document.cookie = "locale=; path=/; max-age=0";
        toast.success(res.data.message ?? 'User Logout Successfully')
        removeLocalStorageItem('user')
        removeLocalStorageItem('Localhub')
        removeLocalStorageItem('Remotehub')
        removeLocalStorageItem('kapi-token')
        dispatch(clearAuthToken())
        router.replace("/login");
      }
    } catch (error) {
      console.error("err", error)
      if (error.status === 401) {
        document.cookie = "locale=; path=/; max-age=0";
        toast.error(error.response.data.message ?? 'THE BEARER TOKEN IS INVALIDATED (LOGGED OUT)')
        removeLocalStorageItem('user')
        removeLocalStorageItem('kapi-token')
        removeLocalStorageItem('hub')
        dispatch(clearAuthToken())
        router.replace("/login");
      }
    }
  };
  const t = useTranslations()
  if (!isOpen) return null;

  return (
    <div
      className="absolute bottom-21 mt-2 left-1/2 -translate-x-1/2 
             w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-lg py-2 z-50"
      onMouseLeave={onClose}
    >
      <div className="px-3 py-2">
        <button
          onClick={() => router.push("/settings")}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
        >
          <div className="bg-[#7A73D1] rounded-lg p-2">
            <IconUser size={18} color="white" />
          </div>
          {t('settings.profile')}
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
        >
          <div className=" bg-black dark:bg-white rounded-lg p-2 text-white dark:text-black">
            {theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
          </div>
          {theme === "dark" ? t('light_mode') : t('dark_mode')}
        </button>
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#FF6868] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
        >
          <div className="bg-[#FF6868] rounded-lg p-2">
            <IconLogout2 size={18} color="white" />
          </div>
          {t('settings.logout')}
        </button>
      </div>
    </div>
  );
}
