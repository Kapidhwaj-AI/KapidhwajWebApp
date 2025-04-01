"use client";
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import Sidebar from '@/components/common/Sidebar';
export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log("app-protected-layout");

    return (
        <div className="flex my-4 h-[calc(100vh-2rem)]">
            {/* border-2 border-black */}
            <Sidebar />
            <main className="flex-1 bg-[var(--surface-200)] p-4 rounded-4xl mr-4 flex flex-col min-h-0">
                {children}
            </main>
        </div>
    );
}