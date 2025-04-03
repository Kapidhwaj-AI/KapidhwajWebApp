import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = ({ search, setSearch, placeholder }: { search: string; setSearch: () => void; placeholder: string; }) => {
    return (
        <div className="flex items-center bg-[var(--surface-100)] px-4 py-0.5 rounded-full">
            <IconSearch stroke={2} color="#888888" />
            <Input
                type="text"
                placeholder={placeholder}
                className="bg-transparent dark:bg-[#272727] shadow-none border-none placeholder-gray-400 text-gray-700 flex-1 ml-1"
                value={search}
                onChange={setSearch}
            />
        </div>
    );
};

export default SearchBar;
