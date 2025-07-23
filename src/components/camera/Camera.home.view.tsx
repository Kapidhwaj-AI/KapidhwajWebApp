import { CameraStreamCardController } from "@/controllers/camera/Camera.stream.card.controller";
import { Camera } from "@/models/camera";
import { useTranslations } from "next-intl";
import React from "react";

export const CameraHomeView = ({ cameras }: { cameras: Camera[] }) => {
  const t = useTranslations()
  return (
    <div className="flex-1 overflow-y-auto  scrollbar-hide">

      {cameras.length === 0 ? <div className='flex items-center  justify-center h-full w-full'>{t('home.no_favourites')}</div> :
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-min">
          {cameras.map((camera, index) => (
            <CameraStreamCardController key={index} camera={camera} />
          ))}
        </div>
      }

    </div>
  );
};
