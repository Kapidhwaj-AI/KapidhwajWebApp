import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-3 sm:p-4"
      style={{ backgroundImage: 'url("/assets/images/auth-bg.png")' }}
    >
      <div className="w-full max-w-[480px] min-w-[280px] transform scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100">
        <div className="w-full bg-white dark:bg-[var(--surface-150)] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
          {/* Logo Section */}
          <div className="flex justify-center pt-4 sm:pt-6 md:pt-8 pb-1 sm:pb-2">
            <Image
              src="/assets/images/logo-rectangle.png"
              alt="Kapidhwaj AI"
              width={252}
              height={117}
              sizes="(max-width: 640px) 180px, 
         (max-width: 768px) 200px, 
         (max-width: 1024px) 220px, 
         252px"
              priority={false}
            />
          </div>

          {children}

          <div className="flex flex-row gap-2 w-full justify-center items-center pb-5">
            <p className="text-orange-500 font-bold text-base font-poppins">
              No Compromise.
            </p>

            <p className="text-black dark:text-white font-bold text-base font-poppins">
              No Excuse.
            </p>

            <p className="text-green-600 font-bold font-poppins text-base">
              No Negotiation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
