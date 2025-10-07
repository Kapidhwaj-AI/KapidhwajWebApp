const AddNewCategoryDialogue = dynamic(() => import('@/components/dialogue/AddNewCategoryDialogue').then((mod) => mod.AddNewCategoryDialogue))
const AddNewPersonDialogue = dynamic(() => import('@/components/dialogue/AddNewPersonDialogue').then((mod) => mod.AddNewPersonDialogue))
const DeleteDialog = dynamic(() => import('@/components/dialogue/DeleteDialog').then((mod) => mod.DeleteDialog))
const Button = dynamic(() => import('@/components/ui/button').then((mod) => mod.Button))
import InfiniteScrolling from '@/components/ui/InfiniteScrolling'
import Spinner from '@/components/ui/Spinner'
import { getLocalStorageItem } from '@/lib/storage'
import { ManagePeopleProps, Person } from '@/models/person'
import { GOOGLE_KPH_BUCKET_URL } from '@/services/config'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const IconCake = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconCake))
const IconCategory2 = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconCategory2))
const IconChevronRight = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconChevronRight))
const IconGenderMale = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconGenderMale))
const IconPencil = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconPencil))
const IconTrash = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconTrash))
const IconUserPlus = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconUserPlus))

const ManagePeopleView: React.FC<ManagePeopleProps> = ({ offset, setHasMore, setPersonLoading, personLoading, hasMore, setOffset, divRef, setPerson, handleSelectSite, isAddCategoryModalOpen, handleCatSubmit, isAddPersonModalOpen, isCatDelete, isCatEdit, isPersonDelete, isPersonEdit, handleDelete, handleImageUpload, handleOnSubmit, selectedImage, setCategoryData, setFormData, setIsCatEdit, setIsPersonEdit, formData, catId, categoryData, personId, isSaving, selectedId, setCatId, setAddCategoryModalOpen, setAddPersonModalOpen, setIsCateDelete, setIsPersonDelete, setPersonId, setSelectedId, sharedWithMe, people, categories, isLoading, mySites, handleEditCategory, handleEditePerson, getAge,
}) => {
    const t = useTranslations()
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
    const baseUrl = isValidHub ? remoteHub.id ? `http://turn.kapidhwaj.ai:${remoteHub.static_port}/` : `http://${localHub.id}.local:3000/` : GOOGLE_KPH_BUCKET_URL
    return (
        <div className="h-full flex flex-col gap-3 min-h-0 px-2 md:px-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 ">
                <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold whitespace-nowrap">
                    {selectedId.length === 0 ? t('managePeople.header') : t('managePeople.manage_people')}
                </h1>
                {selectedId && <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
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
                </div>}
            </div>
            {isLoading ? <Spinner /> : selectedId.length === 0 ? <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='bg-[var(--surface-100)] scrollbar-hide rounded-2xl md:rounded-4xl flex flex-col gap-3  md:p-6 p-3 md:h-[79vh] h-[37vh] max-h-[37vh]  md:max-h-[79vh]'>
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
                <div className='bg-[var(--surface-100)] scrollbar-hide rounded-2xl md:rounded-4xl gap-3 flex flex-col md:p-6 p-3 md:h-[79vh] h-[37vh] max-h-[37vh]  md:max-h-[79vh]'>
                    <h2 className="text-lg font-bold">{t('managePeople.shared_with_me')}</h2>
                    {
                        sharedWithMe.length === 0 ? <div className='text-center h-full flex items-center justify-center'>{t('managePeople.no_sites_found')}</div> :
                            sharedWithMe.map((site) => (

                                <button onClick={() => setSelectedId(site.id)} key={site.id} className='flex items-center justify-between gap-1 w-full rounded-full bg-white dark:bg-[var(--surface-200)] py-2 px-5'>
                                    <span className='dark:text-white'>{site.name}</span>
                                    <span className='dark:text-white'>{site.owner}</span>
                                    <IconChevronRight size={18} className="text-gray-600" />
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
                            setOffset(0)
                        }}
                    >
                        {t('settings.back_to_site')}
                    </Button>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        <div className="scrollbar-hide md:p-6 p-3 bg-[var(--surface-100)] md:col-span-2 rounded-2xl md:rounded-4xl  gap-4 h-[73vh] max-h-[73vh]  overflow-y-auto">
                            {people.length === 0 ? <div className='flex items-center justify-center h-full w-full'>{t('no_data_found')} </div> :
                                <div className='flex flex-col'>
                                    <InfiniteScrolling<Person>
                                        setData={setPerson}
                                        fetchData={handleSelectSite}
                                        setHasMore={setHasMore}
                                        setIsLoading={setPersonLoading}
                                        setOffset={setOffset}
                                        offset={offset}
                                        isLoading={personLoading}
                                        data={people}
                                        divRef={divRef}
                                        hasMore={hasMore}
                                    >
                                        <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
                                            {people.map((person, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-[var(--surface-200)] rounded-[24px] d w-full max-w-[465px] h-[140px] 2xl:h-[160px] 4xl:h-[199px] relative group hover:bg-[var(--surface-300)] transition-colors border border-[var(--surface-300)]"
                                                >
                                                    <div className="flex h-full">
                                                        <Link href={{ pathname: "/person-details", query: { id:person.id }} } className="w-[106px] 2xl:w-[120px] 4xl:w-[151px] h-full flex-shrink-0">
                                                            <Image
                                                                src={person.gcp_image_path ? (baseUrl + person.gcp_image_path) : '/dummy-user.webp'}
                                                                alt={person.name}
                                                                width={151}
                                                                height={199}
                                                                className="rounded-l-[24px] object-cover h-full w-full"
                                                                priority={false}
                                                            />
                                                        </Link>

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
                                                                    {person.gender && (person?.gender?.slice(0, 1)?.toUpperCase() + person?.gender?.slice(1,))}</span>
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
                                        {people.length > 0 && <div ref={divRef} className="h-10" />}
                                    </InfiniteScrolling>
                                    {personLoading && <div className="text-center"><Spinner /></div>}
                                    {!personLoading && !hasMore && <p className="text-center">{t("no_more_data")}</p>}
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
                                    <div className="flex lg:flex-row sm:flex-col flex-row lg:gap-2">
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
        </div>
    )
}
const filterButtonClassname = "bg-[var(--surface-500)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1";

export default ManagePeopleView