import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { useTranslations } from 'next-intl'
import { Organization } from '@/models/organization';
import { Checkbox } from '../ui/checkbox';
import { Category } from '@/models/category';


const StartLicense = ({ onClose, isEdit, sites, categories }: { onClose: () => void; isEdit: boolean; sites: Organization[]; categories: Category[] }) => {
  const t = useTranslations()
  const [selectedStartCameras, setSelectedStartCameras] = useState<Set<string>>(
    new Set(),
  );
  const [selectedEndCameras, setSelectedEndCameras] = useState<Set<string>>(
    new Set(),
  );
  const renderCams = (org: Organization, isStart: boolean): React.ReactNode => {
    const topLevelCameras = org?.cameras || [];
    return (
      <div key={org.id}>
        {topLevelCameras?.map((cam) => {
          const isStartSelected = selectedStartCameras.has(cam.camera_id);
          const isEndSelected = selectedEndCameras.has(cam.camera_id)
          return (
            <div className='flex items-center gap-2'>
              <Checkbox
                disabled={(isStart && isEndSelected) || (!isStart && isStartSelected)}
                checked={(isStartSelected && isStart) || (isEndSelected && !isStart)}
                onCheckedChange={() => {
                  if (isStart) {
                    setSelectedStartCameras((prev) => {
                      const newSet = new Set(prev);
                      if (isStartSelected) {
                        newSet.delete(cam.camera_id);
                      } else {
                        newSet.add(cam.camera_id);
                      }
                      return newSet;
                    });
                  }
                  else {
                    setSelectedEndCameras((prev) => {
                      const newSet = new Set(prev);
                      if (isEndSelected) {
                        newSet.delete(cam.camera_id);
                      } else {
                        newSet.add(cam.camera_id);
                      }
                      return newSet;
                    })
                  }
                }}
                className='data-[state=checked]:bg-[#2B4C88] data-[state=checked]:border-[#2B4C88]'
              />
              <span className="text-sm dark:text-gray-300">{cam.name}</span>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <Modal onClose={onClose} title={t('custom_services.license')}>
      <div className='flex flex-col gap-2'>
        <span className='text-md dark:text-gray-300'>Select Entry Cameras</span>
        {sites.map(item => renderCams(item, true))}
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-md dark:text-gray-300'>Select Exit Cameras</span>
        {sites.map(item => renderCams(item, false))}
      </div>
    </Modal>
  )
}

export default StartLicense