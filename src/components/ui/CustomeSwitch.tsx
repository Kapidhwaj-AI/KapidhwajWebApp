// Switch Component
export function Switch({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button type="button" className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
    focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-600'}`} onClick={onChange}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled
                ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    );
}