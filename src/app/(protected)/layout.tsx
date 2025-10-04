import Sidebar from '@/components/common/Sidebar';
const SocketNotification = dynamic(() => import("@/components/common/SocketNotification"),
    { ssr: true });
import { TokenCheck } from '@/components/common/TokenCheck';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import dynamic from 'next/dynamic';
export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={"flex flex-col md:flex-row gap-4 h-screen p-4"}>
            <SocketNotification />
            <Sidebar />
            <main className="flex-1 relative bg-[var(--surface-200)]  md:rounded-4xl rounded-2xl flex flex-col gap-3 min-h-0 overflow-auto scrollbar-hide">
                <TokenCheck />
                <Breadcrumbs/>
                {children}
            </main>
        </div>
    );
}