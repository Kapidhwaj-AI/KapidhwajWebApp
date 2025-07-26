"use client";

import { useState } from "react";
import { ConfirmationDialog } from "@/components/dialogue/ConfirmationDialog";

export default function ExamplePage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleConfirm = () => {
        // Handle confirmation action here
       
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <button
                onClick={() => setIsDialogOpen(true)}
                className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
            >
                Open Dialog
            </button>

            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirm}
            />
        </div>
    )
}