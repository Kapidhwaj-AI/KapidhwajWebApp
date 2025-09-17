
const Input = dynamic(() => import("@/components/ui/input").then((mod) => mod.Input),
    { ssr: false });
import { Search } from "lucide-react";
import dynamic from "next/dynamic";

const SearchBar = ({ search, setSearch, placeholder, className }: { search: string; setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; className?:string }) => {
    return (
        <div className={`relative self-end ${className}`}>
            <Input name={`search ${placeholder}`}
                type="text"
                value={search}
                onChange={(e) => setSearch(e)}
                placeholder={placeholder}
                className="h-[35px] w-[200px] pl-9 pr-4 text-sm bg-transparent rounded-full border-none focus:outline-none focus-visible::ring-2 focus:ring-[#2B4C88] dark:text-white"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
    );
};

export default SearchBar;
