
const IconBellRinging = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconBellRinging),
  { ssr: false });
import dynamic from "next/dynamic";
import Link from "next/link";

export const NotificationBadge = ({ value }: { value: number }) => {
  return (
    <>
      <Link href={"/notifications"}>
        <div className="bg-[var(--surface-100)] text-[#888888] rounded-full p-4">
          <IconBellRinging stroke={2} size={24} />
        </div>
      </Link>

      {/* Notification Badge */}
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {value}
      </span>
    </>
  );
};
