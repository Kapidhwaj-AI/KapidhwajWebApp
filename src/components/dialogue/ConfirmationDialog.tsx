"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {  IconAlertHexagonFilled, IconCheck, IconX } from "@tabler/icons-react";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

export function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "Are You Sure?",
    description = "This process is irreversible, confirm if it is what you are proceeding.",
}: ConfirmationDialogProps) {
    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                />
                <DialogPrimitive.Content
                    className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-4xl bg-[var(--surface-pink)] p-8 shadow-lg"
                >
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF6868]">
                            <IconAlertHexagonFilled stroke={2} className="h-10 w-10 text-white" />
                        </div>

                        <div className="space-y-2">
                            <DialogPrimitive.Title className="text-2xl font-semibold text-[#FF6868]">
                                {title}
                            </DialogPrimitive.Title>
                            <DialogPrimitive.Description className="">
                                {description}
                            </DialogPrimitive.Description>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="inline-flex w-30 h-12 gap-1 items-center justify-center rounded-4xl bg-slate-100 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:bg-[#550404] dark:text-slate-400 dark:hover:bg-slate-700"
                            >
                                <IconX stroke={2} />
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="inline-flex w-30 h-12 gap-1 items-center justify-center rounded-4xl bg-[#FF6868] text-sm font-medium text-white transition-colors hover:bg-red-700"
                            >
                                <IconCheck stroke={2} />
                                Yes
                            </button>
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
} 