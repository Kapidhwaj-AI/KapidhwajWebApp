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

export const notoHindi = localFont({
    src: [
        {
            path: "../../public/fonts/NotoSansDevanagari-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/NotoSansDevanagari-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/NotoSansDevanagari-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/NotoSansDevanagari-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-notoHindi",
    display: "swap"
});

export const notoGuj = localFont({
    src: [
        {
            path: "../../public/fonts/NotoSansGujarati-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/NotoSansGujarati-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/NotoSansGujarati-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/NotoSansGujarati-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-notoGuj",
    display: "swap"
});