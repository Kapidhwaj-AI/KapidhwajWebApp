// app/(auth)/layout.tsx
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log("app-auth-layout");
    return (
        <main className="min-h-screen grid place-items-center bg-gray-200 p-4">
            {children}
        </main>
    );
}