// app/(auth)/layout.tsx
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className="min-h-screen w-full flex items-center justify-center bg-contain bg-cover bg-center bg-no-repeat p-3 sm:p-4"
            style={{ backgroundImage: 'url("/assets/images/auth-bg.png")', }}
        >
            <div className="w-full max-w-[480px] min-w-[280px] transform scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100">
                {children}
            </div>
        </main>
    );
}