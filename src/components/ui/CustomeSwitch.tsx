// Switch Component
export function Switch({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button type="button" className={`relative inline-flex h-[33px] w-[51px] items-center rounded-[30px]
    focus:outline-none bg-white`} onClick={onChange}>
            <span className={`inline-block h-[24px] w-[24px] transform rounded-full transition-transform ${enabled
                ? 'translate-x-6 bg-[#2B4C88]' : 'translate-x-1 bg-gray-400 dark:bg-gray-600'}`} />
        </button>
    );
}