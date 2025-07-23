"use client";

import { Switch } from "../ui/CustomeSwitch";
import {
  IconX,
  IconCheck,
  IconVideo,
  IconTreadmill,
  IconBounceRight,
  IconFriends,
  IconLicense,
} from "@tabler/icons-react";
import { useState } from "react";
import Modal from "../ui/Modal";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/lib/protectApi";
import { useTranslations } from "next-intl";

export function StreamSettingsDialogue({
  isOpen,
  onClose,
  recordings,
  intrusion,
  motion,
  people,
  license,
  handleAiStremToggle,
  handleMotionToggle,
  handleRecordingToggle
}: {
  isOpen: boolean;
  onClose: () => void;
  recordings: boolean;
  intrusion: boolean;
  motion: boolean;
  people: boolean;
  license: boolean;
  handleAiStremToggle: (key: 'intrusion_detection' | 'people_count' | 'license_plate_detection', toggleValue: boolean) => Promise<AxiosResponse<ApiResponse<any>, any>>;
  handleMotionToggle: (toggleValue: boolean) => Promise<AxiosResponse<ApiResponse<any>, any>>;
  handleRecordingToggle: (isRecord: boolean) => Promise<AxiosResponse<ApiResponse<any>, any>>

}) {
  const [settings, setSettings] = useState({
    recordings: recordings,
    motion: motion,
    intrusion_detection: intrusion,
    people_count: people,
    license_plate_detection: license,
  });



  const toggleSetting = async (key: keyof typeof settings, toggleValue: boolean) => {
    let res;
    if (key === 'recordings') {
      res = await handleRecordingToggle(toggleValue)
    }
    else if (key === 'motion') {
      res = await handleMotionToggle(toggleValue)
    }
    else {
      res = await handleAiStremToggle(key, toggleValue)
    }
    if (res.status === 200) {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };
  const t = useTranslations()
  if (isOpen) {
    return (
      <Modal onClose={onClose} title={t('streams.options.settings')}>
        {/* Settings List */}
        <div className="space-y-3">
          {/* Record All Videos */}
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-[#2B4C88] rounded-xl">
                <IconVideo stroke={2} color="white" />
              </div>
              <span> {t('record_all_videos')}</span>
            </div>
            <Switch
              enabled={settings.recordings}
              onChange={() => toggleSetting("recordings", !settings.recordings)}
              trackColor="bg-white"
            />
          </div>

          {/* Intrusion Detection */}
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-[#2B4C88] rounded-xl">
                <IconTreadmill stroke={2} color="white" />
              </div>
              <span>{t('intrusion_detection')}</span>
            </div>

            <Switch
              enabled={settings.intrusion_detection}
              onChange={() => toggleSetting("intrusion_detection", !settings.intrusion_detection)}
              trackColor="bg-white"
            />
          </div>

          {/* Motion Detection */}
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-[#2B4C88] rounded-xl">
                <IconBounceRight stroke={2} color="white" />
              </div>
              <span>{t('motion_detection')}</span>
            </div>
            <Switch
              enabled={settings.motion}
              onChange={() => toggleSetting("motion", !settings.motion)}
              trackColor="bg-white"
            />
          </div>

          {/* People Detection */}
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-[#2B4C88] rounded-xl">
                <IconFriends stroke={2} color="white" />
              </div>
              <span>{t('people_detection')}</span>
            </div>
            <Switch
              enabled={settings.people_count}
              onChange={() => toggleSetting("people_count", !settings.people_count)}
              trackColor="bg-white"
            />
          </div>

          {/* Audio */}
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex items-center gap-2">
              <div className="flex gap-4 items-center">
                <div className="p-2 bg-[#2B4C88] rounded-xl">
                  <IconLicense stroke={2} color="white" />
                </div>
                <span>{t('alerts.license_plate_detection')}</span>
              </div>
            </div>
            <Switch
              enabled={settings.license_plate_detection}
              onChange={() => toggleSetting("license_plate_detection", !settings.license_plate_detection)}
              trackColor="bg-white"
            />
          </div>
        </div>
      </Modal>
    );
  }
}
