'use client'
import ManagePeopleView from '@/views/settings/ManagePeople.view';
import { protectApi } from '@/lib/protectApi';
import { getLocalStorageItem } from '@/lib/storage';
import { Category } from '@/models/category';
import { Organization } from '@/models/organization';
import { Person } from '@/models/person';
import { PersonFormaData } from '@/models/settings';
import { GOOGLE_KPH_BUCKET_URL } from '@/services/config';
import React, { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns';

const ManagePeopleConroller = () => {
    const [isAddPersonModalOpen, setAddPersonModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [mySites, setMySites] = useState<Organization[]>([])
    const [sharedWithMe, setSharedWithMe] = useState<Organization[]>([])
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
    const [offset, setOffset] = useState(0)
    const divRef = useRef<HTMLDivElement>(null)
    const [hasMore, setHasMore] = useState(true)
    const [personLoading, setPersonLoading] = useState(false)
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
    const baseUrl = isValidHub ? remoteHub.id ? `http://turn.kapidhwaj.ai:${remoteHub.static_port}/` : `http://${localHub.id}.local:3000/` : GOOGLE_KPH_BUCKET_URL
    const fetchSites = async () => {
        setIsLoading(true)
        try {
            const res = await protectApi<{ organization: Organization }[]>('/organizations', undefined, undefined, undefined, true)
            if (res.status === 200) {
                const sitesData = res.data.data?.map(
                    (item) => item.organization,
                );

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
    const handleOnSiteSelect = async (offset: number) => {

        const res = await protectApi<Person[]>(`/person?organizationId=${selectedId}&offset=${offset}`)

        return res.data.data



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
            const dob = format(formData.dob ?? '', "yyyy-MM-dd")
            const url = isPersonEdit ? `/person?action=manage&personId=${personId}&personName=${formData.name}&categoryId=${formData.category}&organizationId=${selectedId}&dob=${dob}&gender=${formData.gender}` : `/gcp/image?action=manage&personName=${formData.name}&categoryId=${formData.category}&organizationId=${selectedId}&dob=${dob}&gender=${formData.gender}`
            const imageData = new FormData();
            if (formData.file) {
                imageData.append('image', formData?.file)
            }
            const res = await protectApi(url, isPersonEdit ? 'PUT' : 'POST', !selectedImage?.startsWith("https://") ? imageData : undefined, !selectedImage?.startsWith("https://") ? 'multipart/form-data' : undefined)
            if (res.status === 200) {
                setAddPersonModalOpen(false)
                setFormData({ name: '', category: '', dob: undefined, file: undefined, gender: '' })
                setSelectedImage('')
                setPeople(await handleOnSiteSelect(0))
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
        const loadData = async () => {

            if (selectedId) {
                setPeople(await handleOnSiteSelect(offset))
                await fetchCat()
            }
        }
        loadData()
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
        setFormData({ name: person.name, gender: person.gender ?? '', category: person.category_id.toString(), dob: new Date(person.dob), file: undefined })
        setSelectedImage(baseUrl + person.gcp_image_path)
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
                const res = await protectApi(`/gcp/image?action=manage&personId=${personId}&organizationId=${selectedId}`, 'DELETE', { personId })
                if (res.status === 200) {
                    setPeople(await handleOnSiteSelect(0))
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
        <ManagePeopleView hasMore={hasMore} setHasMore={setHasMore} personLoading={personLoading} setPersonLoading={setPersonLoading} handleSelectSite={handleOnSiteSelect} setPerson={setPeople} divRef={divRef} offset={offset} setOffset={setOffset} isAddCategoryModalOpen={isAddCategoryModalOpen} isAddPersonModalOpen={isAddPersonModalOpen} isCatDelete={isCatDelete} isCatEdit={isCatEdit} isLoading={isLoading} isPersonDelete={isPersonDelete} isPersonEdit={isPersonEdit} isSaving={isSaving} selectedId={selectedId} selectedImage={selectedImage ?? ''} setAddCategoryModalOpen={setAddCategoryModalOpen} setAddPersonModalOpen={setAddPersonModalOpen} setCatId={setCatId} setCategoryData={setCategoryData} setFormData={setFormData} formData={formData} setIsCatEdit={setIsCatEdit} setIsCateDelete={setIsCateDelete} setIsPersonDelete={setIsPersonDelete} setIsPersonEdit={setIsPersonEdit} setPersonId={setPersonId} setSelectedId={setSelectedId} sharedWithMe={sharedWithMe} catId={catId} categories={categories} categoryData={categoryData} mySites={mySites} people={people} personId={personId} handleCatSubmit={handleCatSubmit} handleDelete={handleDelete} handleEditCategory={handleEditCategory} handleEditePerson={handleEditePerson} handleImageUpload={handleImageUpload} handleOnSubmit={handleOnSubmit} getAge={getAge}
        />
    )
}

export default ManagePeopleConroller