import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = ({ search, setSearch }: { search: string; setSearch: () => void }) => {
    return (
        <div className="flex items-center bg-[var(--surface-100)] px-4 py-2 rounded-full">
            <IconSearch stroke={2} color="#888888" />
            <Input
                type="text"
                placeholder="Search Stream"
                className="bg-transparent shadow-none border-none placeholder-gray-400 text-gray-700 flex-1 ml-1"
                value={search}
                onChange={setSearch}
            />
        </div>
    );
};

export default SearchBar;
