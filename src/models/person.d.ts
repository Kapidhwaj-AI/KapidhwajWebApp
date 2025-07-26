import {Alert} from './alert';
import {Camera} from './camera';
import {Category} from './category';
import {Organization} from './organization';
import { PersonFormaData } from './settings';

export interface Person {
  id: number;
  name: string ;
  dob: string | Date;
  category_id: number;
  gcp_image_path?: string;
  frame_url?: string;
  organization_id?: number;
  is_active?: number;
  gender?: string;
  category?: Category;
  organization?: Organization;

  alerts?: Alert[];

  createdAt?: Date;
  updatedAt?: Date;
  timestamp?: number;
  camera?: Camera;
}

export interface ManagePeopleProps {
  selectedId: string;
  setAddPersonModalOpen: (val: boolean) => void;
  setSelectedId:(val: string) => void;
  setAddCategoryModalOpen: (val: boolean) => void;
  isLoading: boolean;
  mySites:Organization[];
  sharedWithMe: Organization[];
  people: Person[];
  handleEditePerson: (val: Person) => void;
  setPersonId: (val: number) => void;
  setIsPersonDelete: (val: boolean) => void;
  categories: Category[]
  getAge:(val: Date) => number;
  handleEditCategory: (val: Category) => void;
  setIsCateDelete: (val: boolean) => void;
  setCatId: (val: number) => void;
  setIsPersonEdit: (val: boolean) => void;
  setFormData:(val:PersonFormaData) => void;
  formData: PersonFormaData;
  isAddPersonModalOpen: boolean;
  isPersonEdit: boolean;
  isSaving: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: string;
  isAddCategoryModalOpen: boolean;
  isCatEdit: boolean;
  categoryData: {
    name: string;
    colorCode: string;
  };
  setCategoryData: React.Dispatch<React.SetStateAction<{
    name: string;
    colorCode: string;
  }>>;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDelete: (val: number|string) => void;
  catId: number; 
  personId: number;
  isCatDelete: boolean;
  isPersonDelete: boolean;
  setIsCatEdit: (val: boolean) => void;
  handleCatSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
} 