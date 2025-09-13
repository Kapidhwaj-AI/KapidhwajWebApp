"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";


type ToastType = "default" | "success" | "error" | "info" | "warning";
type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

interface ToastOptions {
    id?: string | number;
    type?: ToastType;
    autoClose?: number; // ms, 0 = persistent
    pauseOnHover?: boolean;
    closeButton?: boolean;
    position?: Position;
    onClose?: () => void;
}

interface Toast {
    id: string;
    message: React.ReactNode;
    type: ToastType;
    autoClose: number;
    createdAt: number;
    pauseOnHover: boolean;
    closeButton: boolean;
    position: Position;
    onClose?: () => void;
}

/* Context & Hook */
type ToastAPI = {
    toast: (message: React.ReactNode, options?: ToastOptions) => string;
    success: (msg: React.ReactNode, opts?: ToastOptions) => string;
    error: (msg: React.ReactNode, opts?: ToastOptions) => string;
    info: (msg: React.ReactNode, opts?: ToastOptions) => string;
    warning: (msg: React.ReactNode, opts?: ToastOptions) => string;
    dismiss: (id?: string) => void;
    update: (id: string, changes: Partial<ToastOptions & { message?: React.ReactNode }>) => void;
    clear: () => void;
};

const ToastContext = createContext<ToastAPI | null>(null);

export const useToast = (): ToastAPI => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
};

/* Helper utilities */
const uid = (prefix = "t") => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

const DEFAULT_AUTO_CLOSE = 5000;
const ACCENT = "#2B4C88";

/* Provider Component */
export const CustomToastProvider: React.FC<{ children: React.ReactNode; maxToasts?: number }> = ({ children, maxToasts = 5 }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const portalRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof document !== "undefined") {
            let el = document.getElementById("app-toast-root");
            if (!el) {
                el = document.createElement("div");
                el.id = "app-toast-root";
                document.body.appendChild(el);
            }
            portalRef.current = el;
        }
    }, []);

    const push = useCallback((t: Toast) => {
        setToasts((prev) => {
            // keep ordering: new at end
            const next = [...prev, t];
            // limit per provider
            if (next.length > maxToasts) {
                // drop oldest (first)
                next.shift();
            }
            return next;
        });
    }, [maxToasts]);

    const remove = useCallback((id?: string) => {
        if (!id) { // clear all
            setToasts([]);
            return;
        }
        setToasts((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const update = useCallback((id: string, changes: Partial<ToastOptions & { message?: React.ReactNode }>) => {
        setToasts((prev) =>
            prev.map((t) =>
                t.id === id
                    ? {
                        ...t,
                        message: changes.message ?? t.message,
                        type: changes.type ?? t.type,
                        autoClose: changes.autoClose ?? t.autoClose,
                        pauseOnHover: changes.pauseOnHover ?? t.pauseOnHover,
                        closeButton: changes.closeButton ?? t.closeButton,
                        position: changes.position ?? t.position,
                    }
                    : t
            )
        );
    }, []);

    const createToast = useCallback((message: React.ReactNode, options: ToastOptions = {}) => {
        const id = String(options.id ?? uid());
        const t: Toast = {
            id,
            message,
            type: options.type ?? "default",
            autoClose: typeof options.autoClose === "number" ? options.autoClose : DEFAULT_AUTO_CLOSE,
            createdAt: Date.now(),
            pauseOnHover: options.pauseOnHover ?? true,
            closeButton: options.closeButton ?? true,
            position: options.position ?? "top-right",
            onClose: options.onClose,
        };
        push(t);
        return id;
    }, [push]);

    const api = useMemo<ToastAPI>(() => ({
        toast: createToast,
        success: (m, o) => createToast(m, { ...(o || {}), type: "success" }),
        error: (m, o) => createToast(m, { ...(o || {}), type: "error" }),
        info: (m, o) => createToast(m, { ...(o || {}), type: "info" }),
        warning: (m, o) => createToast(m, { ...(o || {}), type: "warning" }),
        dismiss: (id) => remove(id),
        update: (id, changes) => update(id, changes),
        clear: () => remove(undefined),
    }), [createToast, remove, update]);

    return (
        <ToastContext.Provider value={api}>
            {children}
            {portalRef.current ? createPortal(<ToastContainer toasts={toasts} removeToast={remove} />, portalRef.current) : null}
        </ToastContext.Provider>
    );
};

/* Toast Container & Item */
const positionToClasses = (pos: Position) => {
    switch (pos) {
        case "top-right": return "items-end justify-start top-4 right-4";
        case "top-left": return "items-start justify-start top-4 left-4";
        case "bottom-right": return "items-end justify-end bottom-4 right-4";
        case "bottom-left": return "items-start justify-end bottom-4 left-4";
        case "top-center": return "items-center justify-start top-4 left-1/2 transform -translate-x-1/2";
        case "bottom-center": return "items-center justify-end bottom-4 left-1/2 transform -translate-x-1/2";
        default: return "items-end justify-start top-4 right-4";
    }
};

const ToastContainer: React.FC<{ toasts: Toast[]; removeToast: (id?: string) => void }> = ({ toasts, removeToast }) => {
    // group by position
    const grouped = useMemo(() => {
        const map = new Map<Position, Toast[]>();
        toasts.forEach((t) => {
            const arr = map.get(t.position) ?? [];
            arr.push(t);
            map.set(t.position, arr);
        });
        return map;
    }, [toasts]);

    const positions: Position[] = ["top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center"];

    return (
        <>
            {positions.map((pos) => {
                const list = grouped.get(pos) ?? [];
                if (list.length === 0) return null;
                return (
                    <div
                        key={pos}
                        className={`fixed z-50 pointer-events-none flex flex-col gap-3 ${positionToClasses(pos)}`}
                        style={{ maxWidth: "clamp(240px, 28vw, 420px)" }}
                    >
                        {list.map((t) => (
                            <ToastItem key={t.id} toast={t} onClose={() => { removeToast(t.id); t.onClose?.(); }} />
                        ))}
                    </div>
                );
            })}
        </>
    );
};

/* Individual toast item with progress bar and pause on hover */
const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
    const { id, message, type, autoClose, pauseOnHover, closeButton } = toast;
    const [visible, setVisible] = useState(true);
    const [paused, setPaused] = useState(false);
    const startRef = useRef<number | null>(null);
    const remainingRef = useRef<number>(autoClose);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const elRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0); // 0..100

    useEffect(() => {
        if (!autoClose || autoClose <= 0) return; // persistent toast

        const step = (now: number) => {
            if (!startTimeRef.current) startTimeRef.current = now;
            const elapsed = now - (startTimeRef.current ?? now);
            const percent = Math.min(100, ((elapsed) / autoClose) * 100);
            setProgress(percent);
            if (percent >= 100) {
                // close
                setVisible(false);
                return;
            }
            rafRef.current = requestAnimationFrame(step);
        };

        // start animation
        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [autoClose]);

    // Pause/resume on hover
    const handleMouseEnter = () => {
        if (pauseOnHover && autoClose && autoClose > 0) {
            setPaused(true);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            // compute remaining
            // progress is percent
            const elapsedPct = progress; // 0..100
            const elapsedMs = (elapsedPct / 100) * autoClose;
            remainingRef.current = Math.max(0, autoClose - elapsedMs);
        }
    };

    const handleMouseLeave = () => {
        if (pauseOnHover && autoClose && autoClose > 0) {
            setPaused(false);
            // resume animation with remainingRef.current
            startTimeRef.current = null;
            const start = performance.now();
            const initialRemaining = remainingRef.current;
            const total = initialRemaining;

            const step = (now: number) => {
                if (!startTimeRef.current) startTimeRef.current = now;
                const localElapsed = now - startTimeRef.current;
                const percent = Math.min(100, ((total - (total - localElapsed)) / autoClose) * 100 + progress);
                // The above is a bit approximate — simpler: compute new absolute percent:
                const absElapsed = (progress / 100) * autoClose + localElapsed;
                const newPct = Math.min(100, (absElapsed / autoClose) * 100);
                setProgress(newPct);
                if (newPct >= 100) {
                    setVisible(false);
                    return;
                }
                rafRef.current = requestAnimationFrame(step);
            };

            rafRef.current = requestAnimationFrame(step);
        }
    };

    // When visibility goes false -> call onClose after animation
    useEffect(() => {
        if (!visible) {
            const id = setTimeout(() => onClose(), 180); // leave small time for fade out
            return () => clearTimeout(id);
        }
    }, [visible, onClose]);

    const toneBg = (() => {
        switch (type) {
            case "success": return "bg-green-50 border-green-200";
            case "error": return "bg-red-50 border-red-200";
            case "info": return "bg-blue-50 border-blue-200";
            case "warning": return "bg-yellow-50 border-yellow-200";
            default: return "bg-white border-slate-200 dark:bg-[#0b1220]";
        }
    })();

    const toneText = (() => {
        switch (type) {
            case "success": return "text-green-800";
            case "error": return "text-red-800";
            case "info": return "text-blue-800";
            case "warning": return "text-yellow-800";
            default: return "text-slate-900 dark:text-white";
        }
    })();

    return (
        <div
            ref={elRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`pointer-events-auto transform transition-all duration-150 w-full shadow-lg border rounded-lg ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} ${toneBg}`}
            style={{ overflow: "hidden" }}
        >
            <div className="flex items-start gap-3 p-3">
                <div className="flex-shrink-0 mt-0.5">
                    {/* icon circle */}
                    <div style={{ width: 10, height: 10, borderRadius: 50, background: ACCENT }} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${toneText}`}>{message}</div>
                </div>
                {closeButton && (
                    <button
                        aria-label="close"
                        onClick={() => {
                            setVisible(false);
                        }}
                        className="ml-3 inline-flex items-center justify-center rounded-md p-1 hover:bg-slate-100"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>

            {/* progress bar */}
            {autoClose && autoClose > 0 && (
                <div style={{ height: 4, background: "rgba(0,0,0,0.06)" }}>
                    <div
                        style={{
                            width: `${progress}%`,
                            height: 4,
                            background: ACCENT,
                            transition: paused ? "none" : "width 120ms linear",
                        }}
                    />
                </div>
            )}
        </div>
    );
};
