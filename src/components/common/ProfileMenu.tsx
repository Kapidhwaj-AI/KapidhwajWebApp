import { BASE_URL } from "@/lib/protectApi";
import { showToast } from "@/lib/showToast";
import { getLocalStorageItem, removeLocalStorageItem } from "@/lib/storage";
import { RootActions, useStore } from "@/store";
import axios from "axios";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
 
  const clearAuthToken = useStore((state: RootActions) => state.clearAuthToken);

  const handleLogoutClick = async () => {
    const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
    try {
      const res = await axios({
        url: `${BASE_URL}:8084/signout`, method: "POST", headers: {
          'Authorization': `BBearer ${token}`
        }
      })
      if (res?.status === 200) {
        document.cookie = "locale=; path=/; max-age=0";
        showToast(res.data.message ?? 'User Logout Successfully', "success")
        removeLocalStorageItem(['user', 'Remotehub', 'Localhub', 'kapi-token'])
        clearAuthToken()
        router.replace("/login");
      }
    } catch (error) {
      console.error("err", error)
      if (error.status === 401) {
        document.cookie = "locale=; path=/; max-age=0";
        showToast(error.response.data.message ?? 'THE BEARER TOKEN IS INVALIDATED (LOGGED OUT)', "error")
        removeLocalStorageItem(['user', 'Remotehub', 'Localhub', 'kapi-token'])
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
            <User size={18} color="white" />
          </div>
          {t('settings.profile')}
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
        >
          <div className=" bg-black dark:bg-white rounded-lg p-2 text-white dark:text-black">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </div>
          {theme === "dark" ? t('light_mode') : t('dark_mode')}
        </button>
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#FF6868] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
        >
          <div className="bg-[#FF6868] rounded-lg p-2">
            <LogOut size={18} color="white" />
          </div>
          {t('settings.logout')}
        </button>
      </div>
    </div>
  );
}
