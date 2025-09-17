import { useMemo } from 'react';
import { AccessLevel } from '@/models/settings';
import clsx from 'clsx';
import { Organization } from '@/models/organization';
import StreamsCard from '@/views/settings/StreamsCard';
import Spinner from '../ui/Spinner';
import { useTranslations } from 'next-intl';
import SelectField from '../ui/Select.field';
import { InputField } from '../ui/Input.field';
import dynamic from 'next/dynamic';
const IconX = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconX),
    { ssr: false });
const IconCheck = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconCheck),
    { ssr: false });
const IconSearch = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconSearch),
    { ssr: false });
const Popover = dynamic(() => import("@/components/ui/popover").then((mod) => mod.Popover),
    { ssr: false });
const PopoverContent = dynamic(() => import("@/components/ui/popover").then((mod) => mod.PopoverContent),
    { ssr: false });
const PopoverTrigger = dynamic(() => import("@/components/ui/popover").then((mod) => mod.PopoverTrigger),
    { ssr: false });
const Checkbox = dynamic(() => import("@/components/ui/checkbox").then((mod) => mod.Checkbox),
    { ssr: false });
    
interface AddNewUserDialogueProps {
    isOpen: boolean;
    onClose: () => void;
    accessLevels: AccessLevel[];
    setUsername: (val: string) => void;
    username: string;
    selectedAccess: number;
    setSelectedAccess: (val: number) => void;
    searchedUsers: { name: string, userId: string }[]
    setSelectedUser: (val: { name: string, userId: string } | null) => void;
    open: boolean;
    selectedUser: { name: string, userId: string } | null;
    setOpen: (val: boolean) => void;
    handleSelectUser: (val: { name: string, userId: string }) => void
    popoverRef: React.RefObject<HTMLDivElement | null>;
    selectedTab: string;
    setSelectedTab: (val: string) => void;
    organizations: Organization[];
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    selectedStreams: Set<string>;
    setSelectedStreams: React.Dispatch<React.SetStateAction<Set<string>>>;
    handleSave: () => void;
    isLoading: boolean;
    isEdit: boolean
}

export function AddNewUserDialogue({ isOpen, isEdit, isLoading, onClose, searchQuery, setSearchQuery, selectedStreams, handleSave, setSelectedStreams, accessLevels, selectedTab, setSelectedTab, organizations, selectedUser, popoverRef, handleSelectUser, username, setUsername, selectedAccess, setSelectedAccess, setSelectedUser, searchedUsers, open, setOpen }: AddNewUserDialogueProps) {
    const allCameras = organizations.flatMap(org => org.cameras);
    const selectedOraganizationsFolders = organizations.find((item) => item.id === selectedTab)?.folders
    const getVisibleStreamIds = (): string[] => {
        const visibleStreams: string[] = [];
        filteredStreams.forEach(stream => {
            visibleStreams.push(stream.camera_id);
        });

        selectedOraganizationsFolders?.forEach(folder => {
            folder.cameras.forEach(camera => {
                if (searchQuery === '' || camera.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    visibleStreams.push(camera.camera_id);
                }
            });
            folder.child_folders?.forEach(child => {
                child.cameras.forEach(camera => {
                    if (searchQuery === '' || camera.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        visibleStreams.push(camera.camera_id);
                    }
                });
            });
        });

        return visibleStreams;
    };
    const toggleStreamSelection = (streamId: string) => {
        setSelectedStreams((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(streamId)) newSet.delete(streamId);
            else newSet.add(streamId);
            return newSet;
        }
        );
    };
    const filteredStreams = useMemo(() => {
        return allCameras.filter((camera) => {
            const matchesSearch = searchQuery === '' || camera.name.toLowerCase().includes(searchQuery.toLowerCase());
            if (selectedTab === 'all') {
                return matchesSearch;
            }
            const matchesOrg = camera.organization_id === selectedTab;
            const isRootLevel = camera.folder_id === null;

            return matchesSearch && matchesOrg && isRootLevel;
        });
    }, [allCameras, selectedTab, searchQuery]);
    const filteredChildFolders = useMemo(() => {
        if (selectedTab === 'all') return [];

        const selectedOrg = organizations.find((org) => org.id === selectedTab);
        if (!selectedOrg) return [];

        return selectedOrg.folders.flatMap((folder) =>
            folder.child_folders.map((child) => ({
                ...child,
                cameras: child.cameras.filter((cam) =>
                    cam.name.toLowerCase().includes(searchQuery.toLowerCase())
                ),
            }))
        ).filter((child) => child.cameras.length > 0);
    }, [organizations, selectedTab, searchQuery]);
    const filteredOrganizationFolders = useMemo(() => {
        if (selectedTab === 'all') return [];

        const selectedOrg = organizations.find((org) => org.id === selectedTab);
        if (!selectedOrg) return [];

        return selectedOrg.folders.map((folder) => ({
            ...folder,
            cameras: folder.cameras.filter((cam) =>
                cam.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        })).filter((folder) => folder.cameras.length > 0);
    }, [organizations, selectedTab, searchQuery]);
    const handleSelectAll = () => {
        const visibleStreamIds = getVisibleStreamIds();

        const allVisibleSelected = visibleStreamIds.every((id) => selectedStreams.has(id));

        const newSet = new Set(selectedStreams);
        if (allVisibleSelected) {
            visibleStreamIds.forEach((id) => newSet.delete(id));
        } else {
            visibleStreamIds.forEach((id) => newSet.add(id));
        }

        setSelectedStreams(newSet);
    };

    const allVisibleSelected = getVisibleStreamIds().every(id => selectedStreams.has(id));
    const t = useTranslations()
    console.log(searchedUsers.length>0,"searchedUser")
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50 p-3">
            <div className="bg-white dark:bg-gray-800 rounded-[32px] w-[98%] h-[90vh] shadow-xl flex flex-col">
                <div className="grid md:grid-cols-7 grid-cols-1 h-full">
                    <div className="w-full md:col-span-2 p-6  flex flex-col border-b  border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-medium dark:text-white">{isEdit ? t('update_user') : t('add_new_user')}</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden flex"
                            >
                                <IconX size={20} className="text-red-500" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <div className="mb-4">
                                <Popover open={open && !isEdit && searchedUsers.length > 0} onOpenChange={setOpen} >
                                    <PopoverTrigger className='w-full'>
                                        <InputField
                                            placeholder={t('settings.enter_username')}
                                            value={username}
                                            disabled={isEdit}
                                            setValue={(e) => {
                                                setUsername(e);
                                                setSelectedUser(null);
                                            }}
                                            label={t('settings.username')}
                                        />
                                    </PopoverTrigger>

                                    {open && <PopoverContent className="p-0 w-full" ref={popoverRef} sideOffset={5}>
                                        <ul className="max-h-64 overflow-y-auto py-1 w-full divide-y divide-gray-200">
                                            {searchedUsers.length === 0 && (
                                                <li className="text-sm text-muted-foreground px-4 py-2">
                                                    No Users found.
                                                </li>
                                            )}
                                            {searchedUsers.map((user) => (
                                                <li
                                                    key={user.userId}
                                                    className={clsx(
                                                        "cursor-pointer px-4 py-2 hover:bg-accent hover:text-accent-foreground",
                                                        selectedUser?.userId === user.userId && "bg-accent font-medium"
                                                    )}
                                                    onClick={() => handleSelectUser(user)}
                                                >
                                                    <div className="flex flex-col">
                                                        <span>{user.name}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </PopoverContent>}
                                </Popover>
                            </div>

                            {/* Access Field */}
                            <div className="mb-6">
                                <SelectField label={t('settings.access')} placeholder={t('settings.select_access')} data={accessLevels} value={selectedAccess} setValue={(e) => setSelectedAccess(Number(e))} />

                            </div>

                            <button type='submit'
                                disabled={isLoading}
                                className="w-full h-[45px] flex items-center justify-center gap-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base transition-colors"
                                onClick={handleSave}
                            >
                                {isLoading ? <Spinner /> :
                                    <>
                                        <IconCheck size={16} /><span>{isEdit ? t('update') : t('save')}</span>
                                    </>
                                }

                            </button>

                        </div>

                        {/* Action Buttons */}
                    </div>

                    {/* Right Section - Streams */}
                    <div className="w-full md:col-span-5 lg:rounded-r-[32px] px-6  py-3 lg:py-6 overflow-hidden flex flex-col">
                        {/* Tabs */}
                        <div className='flex items-center  mb-5 justify-between'>
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                <button

                                    onClick={() => setSelectedTab('all')}
                                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedTab === 'all'
                                        ? 'bg-[#2B4C88] text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    All Streams
                                </button>
                                {organizations.map((area) => (
                                    <button
                                        key={area.id}
                                        onClick={() => setSelectedTab(area.id)}
                                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedTab === area.id
                                            ? 'bg-[#2B4C88] text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {area.name}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hidden md:flex"
                            >
                                <IconX size={20} className="text-red-500" />
                            </button>
                        </div>

                        {/* Search and Select All */}
                        <div className='p-5 flex-1 overflow-y-auto scrollbar-hide bg-[#F6F6F6] dark:bg-gray-900 rounded-4xl'>

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={allVisibleSelected && filteredStreams.length > 0}
                                        onCheckedChange={handleSelectAll}
                                        className='data-[state=checked]:bg-[#2B4C88] data-[state=checked]:border-[#2B4C88]'
                                    />
                                    <span className="text-sm dark:text-gray-300">Select all</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t('streams.search_placeholder')}
                                        className="h-[35px] w-[200px] pl-9 pr-4 text-sm bg-white dark:bg-gray-800 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#2B4C88] dark:text-white"
                                    />
                                    <IconSearch size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                                </div>
                            </div>

                            {/* Streams Grid */}
                            <div className="flex-1 overflow-y-auto scrollbar-hide">
                                <div className="grid grid-cols-1 p-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                    {filteredStreams.map((stream) => (
                                        <StreamsCard key={stream.camera_id} stream={stream} selectedStreams={selectedStreams} toggleStreamSelection={toggleStreamSelection} />
                                    ))}

                                </div>


                                {filteredOrganizationFolders?.map((folder) => (
                                    <div key={folder.id} className='flex flex-col ms-4 gap-2'>
                                        <span>{organizations.find((item) => item.id === selectedTab)?.name}{" > "} {folder.name}</span>
                                        <div className="grid grid-cols-1 p-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {folder.cameras.map((stream) => (
                                                <StreamsCard key={stream.camera_id} stream={stream} selectedStreams={selectedStreams} toggleStreamSelection={toggleStreamSelection} />
                                            )
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {filteredChildFolders?.map((child) => (
                                    <div key={child.id} className='flex flex-col ms-4 gap-2'>
                                        <span>
                                            {organizations.find((item) => item.id === selectedTab)?.name}{" > "} {child.name}
                                        </span>
                                        <div className="grid grid-cols-1 p-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {child.cameras.map((stream) => (
                                                <StreamsCard
                                                    key={stream.camera_id}
                                                    stream={stream}
                                                    selectedStreams={selectedStreams}
                                                    toggleStreamSelection={toggleStreamSelection}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
} 