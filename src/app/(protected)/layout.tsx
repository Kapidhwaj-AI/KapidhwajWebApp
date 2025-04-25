"use client";
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import Sidebar from '@/components/common/Sidebar';
import { TokenCheck } from '@/components/common/TokenCheck';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log("app-protected-layout");

    return (
        <div className="flex flex-col md:flex-row h-screen md:h-[calc(100vh-2rem)] md:my-4">
            {/* Mobile Sidebar Toggle would go here */}
            <Sidebar />
            <main className="flex-1 bg-[var(--surface-200)] p-2 md:p-4 rounded-none md:rounded-4xl md:mr-4 flex flex-col min-h-0 overflow-auto">
                <TokenCheck />
                {children}
            </main>
        </div>
    );
}