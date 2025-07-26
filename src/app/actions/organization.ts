// 'use server'
// import axios from 'axios';
// import { apiBaseUrl } from '@/services/config';
// import { getLocalStorageItem } from '@/lib/storage';
// import { Organization } from '@/models/organization';
// interface ApiResponse<T> {
//     data: T;
//     status: number;
//     message?: string;
// }
// const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token

// export async function getOrganizations(organizationId?: string) {
//     type org = { organization: Organization }

//     try {
//         const response = await axios<ApiResponse<org>>({
//             method: 'GET',
//             url: organizationId
//                 ? `${apiBaseUrl}/organizations?organizationId=${organizationId}`
//                 : `${apiBaseUrl}/organizations`,
//             headers: { Authorization: `Bearer ${token}` },
//         });

//         if (organizationId) {
//             return [response.data.data?.organization];
//         }
//         return response.data.data?.map((item: any) => item.organization);
//     } catch (err) {
//         console.error('Error fetching organizations:', err);
//         throw err;
//     }
// } 