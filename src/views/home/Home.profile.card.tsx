import { useTranslations } from "next-intl";
import Image from "next/image";

export const HomeProfileCard = ({
  imagePath,
  name,
  devices,
}: {
  imagePath: string;
  name: string;
  devices: number;
}) => {
  const t = useTranslations()
  return (
    <div className="flex items-center md:gap-3 gap-1">
      
      <div className="h-18 w-18 rounded-full bg-[var(--surface-100)] text-[#888888] overflow-hidden">
        <Image
          src={imagePath}
          alt="User Profile"
          width={200} 
          height={200} 
          className="rounded-full object-cover"
          priority={false}
          loading="lazy"
          sizes="200px"
        />
      </div>
      <div className="flex items-center bg-[#2B4C88] rounded-full py-2 px-4 h-18 md:w-60 w-auto">
        <div className="flex flex-col gap-1 ml-3">
          <h1
            className="md:text-md text-sm font-bold text-white leading-[100%]"
            style={{ fontWeight: 700 }}
          >
            {t('home.greetings')} {name ?? 'Your Name'}
          </h1>
          <p className="text-xs text-white mt-0.5">
            {devices.toString()} {t('home.devices_active')}
          </p>
        </div>
      </div>
    </div>
  );
};
