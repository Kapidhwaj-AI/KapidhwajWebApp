'use client';

import { useEffect, useState } from 'react';
import { IconUserPlus, IconCategory2, IconCake, IconGenderMale, IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { AddNewPersonDialogue } from '@/components/dialogue/AddNewPersonDialogue';
import { AddNewCategoryDialogue } from '@/components/dialogue/AddNewCategoryDialogue';
import { Button } from '@/components/ui/button';
import { Organization } from '@/models/organization';
import { protectApi } from '@/lib/protectApi';
import { getLocalStorageItem } from '@/lib/storage';
import Spinner from '@/components/ui/Spinner';
import { Person, PersonFormaData } from '@/models/settings';
import { GOOGLE_KPH_BUCKET_URL } from '@/services/config';
import { Category } from '@/models/category';
import { DeleteDialog } from '@/components/dialogue/DeleteDialog';
import { useTranslations } from 'next-intl';

GOOGLE_KPH_BUCKET_URL

export default function ManagePeoplePage() {
    const [isAddPersonModalOpen, setAddPersonModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [mySites, setMySites] = useState<Organization[]>([])
    const [sharedWithMe, setSharedWithMe] = useState<Organization[]>([])
    const [sites, setSites] = useState<Organization[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [people, setPeople] = useState<Person[]>([])
    const [formData, setFormData] = useState<PersonFormaData>({
        name: '',
        dob: undefined,
        gender: '',
        category: '',
        file: undefined
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const [categories, setCategories] = useState<Category[]>([])
    const userDetails = JSON.parse(getLocalStorageItem('user') ?? '{}')
    const [categoryData, setCategoryData] = useState({
        name: '',
        colorCode: ''
    })
    const [isCatEdit, setIsCatEdit] = useState(false)
    const [isCatDelete, setIsCateDelete] = useState(false)
    const [catId, setCatId] = useState(NaN)
    const [personId, setPersonId] = useState(NaN)
    const [isPersonEdit, setIsPersonEdit] = useState(false)
    const [isPersonDelete, setIsPersonDelete] = useState(false);
    const t = useTranslations()
    const fetchSites = async () => {
        setIsLoading(true)
        try {
            const res = await protectApi<{ organization: Organization }[]>('/organizations')
            if (res.status === 200) {
                const sitesData = res.data.data?.map(
                    (item: any) => item.organization,
                );
                setSites(sitesData)
                setMySites(sitesData.filter((site) => site.owner === userDetails?.id))
                setSharedWithMe(sitesData.filter((site) => site.owner !== userDetails?.id))
            }
        } catch (error) {
            console.error('Err:', error)

        } finally {
            setIsLoading(false)
        }
    }
    const fetchCat = async () => {
        try {
            const res = await protectApi<Category[]>(`/category?organizationId=${selectedId}`)
            setCategories(res.data.data)
        } catch (error) {
            console.error("Err", error)
        }
    }
    useEffect(() => {
        fetchSites()
    }, [])
    const handleOnSiteSelect = async () => {
        setIsLoading(true)
        try {
            const res = await protectApi<Person[]>(`/person?organizationId=${selectedId}`)
            if (res.status === 200) {
                setPeople(res.data.data)
            }
        } catch (error) {
            console.error('Err:', error)

        } finally {
            setIsLoading(false)
        }
    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev, file: file
            }))
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true)
        try {
            const url = isPersonEdit ? `/person?action=manage&personId=${personId}&personName=${formData.name}&categoryId=${formData.category}&organizationId=${selectedId}&dob=${formData.dob}&gender=${formData.gender}` : `/gcp/image?action=manage&personName=${formData.name}&categoryId=${formData.category}&organizationId=${selectedId}&dob=${formData.dob}&gender=${formData.gender}`
            const imageData = new FormData();
            if (formData.file) {
                imageData.append('image', formData?.file)
            }
            const res = await protectApi(url, isPersonEdit ? 'PUT' : 'POST', !selectedImage?.startsWith("https://") ? imageData : undefined, !selectedImage?.startsWith("https://") ? 'multipart/form-data' : undefined)
            if (res.status === 200) {
                setAddPersonModalOpen(false)
                setFormData({ name: '', category: '', dob: undefined, file: undefined, gender: '' })
                setSelectedImage('')
                await handleOnSiteSelect()
                setIsPersonEdit(false)
                setPersonId(NaN)
            }
        } catch (er) {
            console.error("Err: ", er)
        } finally {
            setIsSaving(false)
        }
    }
    const handleCatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true)
        try {
            const res = await protectApi<unknown, { colorCode: string; organizationId: string; categoryId?: number; name?: string; newName?: string }>('/category?action=manage', !isCatEdit ? 'POST' : 'PUT', { name: !isCatEdit ? categoryData.name : undefined, newName: isCatEdit ? categoryData.name : undefined, colorCode: categoryData.colorCode, categoryId: isCatEdit ? catId : undefined, organizationId: selectedId });
            if (res.status === 200) {
                setAddCategoryModalOpen(false)
                fetchCat()
                setCategoryData({ name: '', colorCode: '' })
                setIsCatEdit(false)
                setCatId(NaN)
            }
        } catch (er) {
            console.error("Err: ", er)
        } finally {
            setIsSaving(false)
        }
    }
    useEffect(() => {
        if (selectedId) {
            handleOnSiteSelect()
            fetchCat()
        }
    }, [selectedId])

    const handleEditCategory = (cat: Category) => {
        setIsCatEdit(true);
        setAddCategoryModalOpen(true)
        setCategoryData({ name: cat.name, colorCode: cat.color_code })
        setCatId(cat.id)
    };
    const handleEditePerson = (person: Person) => {
        setIsPersonEdit(true)
        setAddPersonModalOpen(true)
        setPersonId(person.id)
        setFormData({ name: person.name, gender: person.gender, category: person.category_id.toString(), dob: new Date(person.dob), file: undefined })
        setSelectedImage(GOOGLE_KPH_BUCKET_URL + person.gcp_image_path)
    }
    const getAge = (date: Date): number => {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();

        const m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
            age--;
        }

        return age;

    }
    const handleDelete = async () => {
        if (isPersonDelete && personId) {
            try {
                const res = await protectApi(`/person?personId=${personId}&organizationId=${selectedId}`, 'DELETE')
                if (res.status === 200) {
                    await handleOnSiteSelect();


                }
            } catch (e) {
                console.error("Err: ", e)
            }
        }
        else if (catId && isCatDelete) {
            try {
                const res = await protectApi(`/category?action=manage&categoryId=${catId}&organizationId=${selectedId}`, 'DELETE')
                if (res.status === 200) {

                    await fetchCat()
                }
            } catch (e) {
                console.error("Err: ", e)
            }
        }
        setIsCateDelete(false);
        setIsPersonDelete(false)
    }
    return (
        <div className="h-full flex flex-col gap-3 min-h-0 px-2 md:px-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 ">
                <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold whitespace-nowrap">
                    {selectedId.length === 0 ? t('managePeople.header') : t('managePeople.manage_people')}
                </h1>
                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
                    <button title={selectedId.length === 0 ? 'Please Selecet any organization' : undefined}
                        onClick={() => setAddPersonModalOpen(true)}
                        className={filterButtonClassname}
                        disabled={selectedId.length === 0}
                    >
                        <IconUserPlus stroke={1.5} size={20} />
                        <span className="hidden sm:inline">{t('managePeople.add_person.modal_title')}</span>
                    </button>
                    <button title={selectedId.length === 0 ? 'Please Selecet any organization' : undefined}
                        onClick={() => setAddCategoryModalOpen(true)}
                        disabled={selectedId.length === 0}
                        className={filterButtonClassname}
                    >
                        <IconCategory2 stroke={1.5} size={20} />
                        <span className="hidden sm:inline">{t('managePeople.categories')}</span>
                    </button>
                </div>
            </div>
            {isLoading ? <Spinner /> : selectedId.length === 0 ? <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='bg-[var(--surface-100)] scrollbar-hide rounded-2xl md:rounded-4xl flex flex-col gap-3  md:p-6 p-3 h-[79vh] max-h-[79vh]'>
                    <h2 className="text-lg font-bold">{t('managePeople.my_sites')}</h2>
                    {
                        mySites.length === 0 ? <div className='text-center h-full flex items-center justify-center'>{t('managePeople.no_sites_found')}</div> :
                            mySites.map((site) => (

                                <button onClick={() => setSelectedId(site.id)} key={site.id} className='flex items-center justify-between gap-1 w-full rounded-full bg-white dark:bg-[var(--surface-200)] py-2 px-5'>
                                    <span className='dark:text-white'>{site.name}</span>
                                    <span className='dark:text-white'>{site.owner}</span>
                                    <IconChevronRight size={18} className="text-gray-600" />
                                </button>
                            ))
                    }
                </div>
                <div className='bg-[var(--surface-100)] scrollbar-hide rounded-2xl md:rounded-4xl gap-3 flex flex-col md:p-6 p-3 h-[79vh] max-h-[79vh]'>
                    <h2 className="text-lg font-bold">{t('managePeople.shared_with_me')}</h2>
                    {
                        sharedWithMe.length === 0 ? <div className='text-center h-full flex items-center justify-center'>{t('managePeople.no_sites_found')}</div> :
                            sharedWithMe.map((site) => (

                                <button onClick={() => setSelectedId(site.id)} key={site.id} className='flex flex-col gap-1 w-full items-start rounded-full hover:bg-[var(--surface-300)] dark:bg-[var(--surface-200)] py-2 px-5'>
                                    <span className='dark:text-white'>{site.name}</span>
                                    <span className='dark:text-white'>{site.owner}</span>
                                </button>
                            ))
                    }
                </div>
            </div>
                :
                <div className='flex flex-col  w-full gap-3'>
                    <Button

                        variant="ghost"
                        className={`px-4 py-2 self-start rounded-full transition-all bg-[#2B4C88] text-white shadow-md`}
                        onClick={() => {
                            setSelectedId('');

                        }}
                    >
                        {t('settings.back_to_site')}
                    </Button>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        <div className="scrollbar-hide md:p-6 p-3 bg-[var(--surface-100)] md:col-span-2 rounded-2xl md:rounded-4xl  gap-4 h-[73vh] max-h-[73vh]  overflow-y-auto">
                            {people.length === 0 ? <div className='flex items-center justify-center h-full w-full'>{t('no_data_found')} </div> :
                                <div className='grid grid-cols-1  xl:grid-cols-2'>
                                    {people.map((person, index) => (
                                        <div
                                            key={index}
                                            className="bg-[var(--surface-200)] rounded-[24px] d w-full max-w-[465px] h-[140px] 2xl:h-[160px] 4xl:h-[199px] relative group hover:bg-[var(--surface-300)] transition-colors border border-[var(--surface-300)]"
                                        >
                                            <div className="flex h-full">
                                                {/* Image Container */}
                                                <div className="w-[106px] 2xl:w-[120px] 4xl:w-[151px] h-full flex-shrink-0">
                                                    <Image
                                                        src={person.gcp_image_path ? (GOOGLE_KPH_BUCKET_URL + person.gcp_image_path) : '/dummy-user.jpg'}
                                                        alt={person.name}
                                                        width={151}
                                                        height={199}
                                                        className="rounded-l-[24px] object-cover h-full w-full"
                                                    />
                                                </div>

                                                {/* Content Container */}
                                                <div className="flex-1 px-4 py-2 flex flex-col gap-1  ">
                                                    {/* Action Buttons - Aligned with name */}
                                                    <div className=" justify-end flex ">
                                                        <button onClick={() => handleEditePerson(person)} className="p-1.5 2xl:p-2 hover:bg-[var(--surface-400)] rounded-lg transition-colors">
                                                            <IconPencil size={18} className="text-gray-600" />
                                                        </button>
                                                        <button onClick={() => { setPersonId(person.id); setIsPersonDelete(true) }} className="p-1.5 2xl:p-2 hover:bg-[var(--surface-400)] rounded-lg transition-colors">
                                                            <IconTrash size={18} className="text-[#FF6868]" />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center gap-2 mb-1 dark:tect-white 2xl:mb-2">
                                                        <h3 className="text-base 2xl:text-lg font-medium">{person.name}</h3>
                                                        <div style={{ backgroundColor: categories.find((item) => item.id === person.category_id)?.color_code }} className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-red-500" />

                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1 2xl:mb-2">
                                                        <span className="flex items-center gap-1">
                                                            <IconCake size={14} className="2xl:w-4 2xl:h-4" />
                                                            {getAge(new Date(person.dob))} y/o
                                                        </span>

                                                        <span className="flex items-center gap-1">
                                                            <IconGenderMale size={14} className="2xl:w-4 2xl:h-4" />
                                                            {person.gender.slice(0, 1).toUpperCase() + person.gender.slice(1,)}</span>
                                                    </div>
                                                    <div className="text-sm flex gap-1 items-center text-gray-500">
                                                        <IconCategory2 size={14} className="2xl:w-4 2xl:h-4" />
                                                        {categories.find((item) => item.id === person.category_id)?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className='flex flex-col md:p-6 p-3 gap-2 scrollbar-hide bg-[var(--surface-100)] md:col-span-1 h-full rounded-2xl md:rounded-4xl'>
                            {categories.length === 0 ? <div className='text-center h-full flex items-center justify-center'> {t('no_data_found')}</div> : categories.map((category) => (
                                <div key={category.id} className="flex items-center p-3 bg-white dark:bg-[var(--surface-200)] hover:bg-gray-50 dark:hover:bg-[var(--surface-300)] rounded-[12px] transition-colors">
                                    <div style={{ backgroundColor: category.color_code }} className={`w-[44px] h-[44px] text-white  rounded-lg flex items-center justify-center`}>
                                        <IconCategory2 />
                                    </div>
                                    <div className="ml-2.5 flex-1">
                                        <h3 className="text-sm font-medium">{category.name}</h3>

                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditCategory(category)}
                                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                        >
                                            <IconPencil size={24} className="text-gray-600 dark:text-gray-400" />
                                        </button>
                                        <button
                                            onClick={() => { setIsCateDelete(true); setCatId(category.id) }}
                                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                        >
                                            <IconTrash size={24} className="text-[#FF6868]" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {/* Add New Person Dialog */}
            {selectedId && isAddPersonModalOpen && <AddNewPersonDialogue
                handleOnSubmit={handleOnSubmit}
                isEdit={isPersonEdit}
                isLoading={isSaving}
                handleImageUpload={handleImageUpload}
                selectedImage={selectedImage}
                categories={categories.map((item) => ({
                    id: item.id.toString(), name: item.name,
                }))}
                setFormData={setFormData}
                formData={formData}
                isOpen={isAddPersonModalOpen}
                onClose={() => { setAddPersonModalOpen(false); setIsPersonEdit(false); setFormData({ file: undefined, name: '', dob: undefined, category: '', gender: '' }) }}
            />}

            {/* Add New Category Dialog */}
            {selectedId && isAddCategoryModalOpen && <AddNewCategoryDialogue
                colors={[
                    '#b80000',
                    '#fccb00',
                    '#008b02',
                    '#43C5C3',
                    '#6E7FD5',
                    '#A66DD4',
                    '#F06595',
                ]}
                isEdit={isCatEdit}
                isLoading={isSaving}
                categoryData={categoryData}
                setCategoryData={setCategoryData}
                handleOnSubmit={handleCatSubmit}
                onClose={() => { setAddCategoryModalOpen(false); setIsCatEdit(false); setCategoryData({ name: '', colorCode: '' }) }}
            />}
            {(isCatDelete || isPersonDelete) && <DeleteDialog title={isCatDelete ? t('managePeople.manage_categories.delete_modal.message') : t('managePeople.delete_modal.message')} onClose={() => { setIsCateDelete(false); setIsPersonDelete(false) }} data={isCatDelete ? catId : personId} handleDelete={handleDelete} />}
            <style jsx global>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
}
const filterButtonClassname = "bg-[var(--surface-500)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1";    
