// Helper function to safely access localStorage (for SSR compatibility)
export const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const setLocalStorageItem = (
  keyOrEntries: string | [string, string][],
  value?: string
): void => {
  if (typeof window === "undefined") return;

  if (typeof keyOrEntries === "string" && typeof value === "string") {
    localStorage.setItem(keyOrEntries, value);
  } else if (Array.isArray(keyOrEntries)) {
    keyOrEntries.forEach(([k, v]) => localStorage.setItem(k, v));
  }
};

export const removeLocalStorageItem = (keys: string | string[]): void => {
  if (typeof window === "undefined") return;
  const keyArray = Array.isArray(keys) ? keys : [keys];
  keyArray.forEach((k) => localStorage.removeItem(k));
};
