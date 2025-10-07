"use client";

import dynamic from "next/dynamic";
import type { ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer = dynamic<ToastContainerProps>(
    () => import("react-toastify").then((mod) => mod.ToastContainer),
    { ssr: false }
);

export function ToastProvider() {
    return <ToastContainer position="top-right" autoClose={3000} />;
}
