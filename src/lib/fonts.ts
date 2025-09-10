import localFont from "next/font/local";

export const jakarta = localFont({
    src: [
        {
            path: "../../public/fonts/PlusJakartaSans-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/PlusJakartaSans-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/PlusJakartaSans-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/PlusJakartaSans-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-jakarta",
    display: "swap"
});