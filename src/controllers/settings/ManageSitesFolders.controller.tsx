'use client'
import { DeleteDialog } from '@/components/dialogue/DeleteDialog'
import SiteFolderModal from '@/components/dialogue/SiteFolderModal'
import ManageSitesFolderView from '@/views/settings/ManageSitesFolder.view'
import { protectApi } from '@/lib/protectApi'
import { Folders, Organization } from '@/models/organization'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useState } from 'react'

const ManageSitesFoldersController = () => {
    const [sites, setSites] = useState<Organization[]>([])
    const [folders, setFolders] = useState<Folders[]>([])
    const [subFolders, setSubFolders] = useState<Folders[]>([])
    const [isSiteLoading, setIsSiteLoading] = useState(false)
    const [isOrg, setIsOrg] = useState(false)
    const [isFolder, setIsFolder] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [orgId, setOrgId] = useState('')
    const [folderId, setFolderId] = useState(NaN)
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [id, setId] = useState<number | string>()
    const [isEdit, setIsEdit] = useState(false)
    const t = useTranslations()
    const fetchSites = async () => {
        setIsSiteLoading(true)
        try {
            const res = await protectApi<{ organization: Organization }[]>('/organizations')
            if (res.status === 200) {
                const sites = res.data.data?.map(
                    (item) => item.organization,
                );
                setSites(sites)
            }
        } catch (error) {
            console.error("err:", error)
        } finally {
            setIsSiteLoading(false)
        }
    }
    useEffect(() => {
        fetchSites()
    }, [])
    const handleNavigate = useCallback(
        (id: string | number, type: 'org' | 'folder') => {
            if (type === 'org') {
                setOrgId(id as string);
                setId(id)
                const org = sites.find((item) => item.id === id);
                setFolders(org?.folders ?? []);
            } else if (type === 'folder') {
                setId(id)
                setFolderId(id as number);
                const folder = folders.find((item) => item.id === id);
                setSubFolders(folder?.child_folders ?? []);
            }
        },
        [sites, folders]
    );
    useEffect(() => {
        if (orgId && sites.length) {
            handleNavigate(orgId, 'org');
        }
    }, [orgId, sites]);

    useEffect(() => {
        if (folderId && folders.length) {
            handleNavigate(folderId, 'folder');
        }
    }, [folderId, folders]);
    const handleSubmit = async () => {
        setIsSaving(true)
        const isOrgId = isNaN(id as number);
        try {
            let url = '';
            if (isOrgId && !isFolder) {
                url = '/organizations/';
            } else if (isFolder) {
                url = isEdit ? `/folders/${id}?action=update` : '/Folders?action=add';
            } else {
                url = isEdit ? `/folders/${id}?action=update` : `/Folders/${folderId}?action=add`;
            } const payload: {
                name: string;
                organizationId?: string;
                parent_id?: number | null;
            } = {
                name,
            };
            if (isEdit) {
                if (isOrgId) {
                    payload.organizationId = id as string;
                } else if (!isOrgId && id) {
                    payload.parent_id = folderId; 
                   
                }
            } else {
                if (!isOrg) {
                    payload.organizationId = orgId;
                    payload.parent_id = isFolder ? null : folderId;
                }
            }
            const method = isEdit ? 'PUT' : 'POST';
            const res = await protectApi<unknown, typeof payload>(url, method, payload);
            if (res.status === 201 || res.status === 200) {

                setIsOpen(false)
                setIsEdit(false)
                setName('')
                await fetchSites()
                if (isOrg && orgId) {
                    handleNavigate(orgId, 'org')
                } else if (!isOrg && folderId) {
                    handleNavigate(folderId, 'folder')
                }
                setIsOrg(false)
                setIsFolder(false)
            }

        } catch (err) {
            console.error("Err:", err)
        } finally {
            setIsSaving(false)
        }
    }
    const handleDelete = async (id: number | string) => {
        const isOrgId = isNaN(id as number);
        const url = isOrgId ? `/organizations/` : `/folders/${id}?action=remove`;
        const res = await protectApi<unknown, { organizationId?: string }>(url, 'DELETE', {
            organizationId: isOrgId ? id.toString() : undefined,
        });

        if (res.status === 200) {
            setIsDelete(false);
            await fetchSites();

            if (isOrgId) {
                setOrgId('');
                setFolders([]);
                setFolderId(0);
                setSubFolders([]);
            } 
        }
    };

    return (
        <>
            <ManageSitesFolderView setIsEdit={setIsEdit} setName={setName} setId={setId} setIsOpen={setIsOpen} folderId={folderId} orgId={orgId} subFolders={subFolders} folders={folders} setIsDelete={setIsDelete} isSiteLoading={isSiteLoading} sites={sites} setIsFolder={setIsFolder} setIsOrg={setIsOrg} handleNavigate={handleNavigate} />
            {isOpen && <SiteFolderModal isEdit={isEdit} handleSubmit={handleSubmit} isLoading={isSaving} setName={setName} name={name} isFolder={isFolder} isSite={isOrg} onClose={() => { setIsOpen(false); setName(''); setIsEdit(false) }} />}
            {isDelete && <DeleteDialog title={t(isOrg ? 'settings.delete_site' : isFolder ? 'settings.delete_folder' :'settings.delete_subfolder')} data={id} handleDelete={handleDelete} onClose={() => setIsDelete(false)} />}
        </>
    )
}

export default ManageSitesFoldersController