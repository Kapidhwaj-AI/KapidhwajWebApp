let toast: typeof import("react-toastify").toast;

export async function showToast(
    message: string,
    type: "info" | "success" | "error" | "warning" = "info"
) {
    if (!toast) {
        const mod = await import("react-toastify");
        toast = mod.toast;
    }

    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "warning":
            toast.warning(message);
            break;
        default:
            toast.info(message);
    }
}

