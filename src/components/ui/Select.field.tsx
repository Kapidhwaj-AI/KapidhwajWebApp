import React from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import("./select").then((mod) => mod.Select),
    { ssr: false });
const SelectTrigger = dynamic(() => import("./select").then((mod) => mod.SelectTrigger),
    { ssr: false });
const SelectValue = dynamic(() => import("./select").then((mod) => mod.SelectValue),
    { ssr: false });

const SelectContent = dynamic(() => import("./select").then((mod) => mod.SelectContent),
    { ssr: false });
const SelectItem = dynamic(() => import("./select").then((mod) => mod.SelectItem),
    { ssr: false });

const SelectLabel = dynamic(() => import("./select").then((mod) => mod.SelectLabel),
    { ssr: false });
const SelectGroup = dynamic(() => import("./select").then((mod) => mod.SelectGroup),
    { ssr: false });
interface SelectFieldProps {
    value: string | number;
    setValue: (val: string) => void;
    data?: { id: string | number; name: string }[];
    label?: string;
    placeholder: string;
    required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
    value,
    setValue,
    data,
    label,
    placeholder,
    required
}) => {
    const t = useTranslations()
    console.log(data,"data")
    return (
        <Select required={required} value={value.toString()} onValueChange={(e) => setValue(e)}>
            <SelectGroup className='space-y-1.5 sm:space-y-2'>
                {label &&<SelectLabel className='flex gap-1 text-xs sm:text-sm text-black dark:text-white p-0'>
                    {label}
                   {required && <span className='text-red-500'>*</span>}
                </SelectLabel>}
                <SelectTrigger
                    className="w-full min-h-[35px] sm:min-h-[40px] md:min-h-[45px] bg-transparent  px-4  rounded-full focus:outline-none border-2 border-[#2B4C88] dark:text-gray-400">
                    <SelectValue className='text-gray-500 placeholder-gray-400 focus:placeholder-gray-600' placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {data?.length === 0 || !data ? <p className='text-center'>{t('no_data_found')}</p> : data?.map((type) => (
                            <SelectItem key={type.id} value={type.id.toString()}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </SelectGroup>
        </Select>

    );
};

export default SelectField;
