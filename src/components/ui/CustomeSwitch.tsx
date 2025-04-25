// Switch Component
export function Switch({ enabled, onChange, trackColor = "bg-white" }: { enabled: boolean; onChange: () => void, trackColor: string }) {
    return (
        <button type="button" className={`relative inline-flex h-[33px] w-[51px] items-center rounded-[30px]
    focus:outline-none ${trackColor} dark:bg-[#444444]`} onClick={onChange}>
            <span className={`inline-block h-[24px] w-[24px] transform rounded-full transition-transform ${enabled
                ? 'translate-x-6 bg-[#2B4C88] dark:bg-[#7A73D1]' : 'translate-x-1 bg-[#C6C6C6] dark:bg-[#C6C6C6]'}`} />
        </button>
    );
}