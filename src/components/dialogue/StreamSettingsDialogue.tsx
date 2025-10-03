const Switch = dynamic(() => import("../ui/CustomeSwitch").then((mod) => mod.Switch),
  { ssr: false });
const IconBounceRight = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconBounceRight),
  { ssr: false });
const IconVideo = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconVideo),
  { ssr: false });
const IconFireExtinguisher = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconFireExtinguisher),
  { ssr: false });
const IconFriends = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconFriends),
  { ssr: false });
const IconLicense = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconLicense),
  { ssr: false });

const IconUserScan = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconUserScan),
  { ssr: false });
const IconTreadmill = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconTreadmill),
  { ssr: false });
import { useState } from "react";
import Modal from "../ui/Modal";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/lib/protectApi";
import { useTranslations } from "next-intl";
import Spinner from "../ui/Spinner";
import dynamic from "next/dynamic";
import LogoSpinner from "../ui/LogoSpinner";

export function StreamSettingsDialogue({
  isOpen,
  onClose,
  recordings,
  intrusion,
  motion,
  people,
  license,
  face,
  fireSmoke,
  handleAiStremToggle,
  handleMotionToggle,
  handleRecordingToggle,
  loading,
  handleToggleStream,
  isStream,
  peopleCountLine
}: {
  isOpen: boolean;
  onClose: () => void;
  recordings: boolean;
  intrusion: boolean;
  motion: boolean;
  people: boolean;
  license: boolean;
  face: boolean;
  fireSmoke: boolean;
  loading: boolean;
  handleAiStremToggle: (key: 'fire_smoke_detection' | 'face_detection' | 'intrusion_detection' | 'people_count' | 'license_plate_detection' | "footfall_count", toggleValue: boolean) => Promise<AxiosResponse<ApiResponse<unknown>, unknown>>;
  handleMotionToggle: (toggleValue: boolean) => Promise<AxiosResponse<ApiResponse<unknown>, unknown>>;
  handleRecordingToggle: (isRecord: boolean) => Promise<AxiosResponse<ApiResponse<unknown>, unknown>>
  handleToggleStream: (isStream: boolean) => void;
  isStream: boolean
  peopleCountLine: boolean;
}) {
  const [settings, setSettings] = useState({
    recordings: recordings,
    motion: motion,
    intrusion_detection: intrusion,
    people_count: people,
    license_plate_detection: license,
    face_detection: face,
    fire_smoke_detection: fireSmoke,
    footfall_count: peopleCountLine
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
        {loading ? <LogoSpinner /> : <div className="space-y-3 ">
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-[#2B4C88] rounded-xl">
                <IconVideo stroke={2} color="white" />
              </div>
              <span>{t('streams.title')}</span>
            </div>
            <Switch
              enabled={isStream}
              onChange={() => { handleToggleStream(!isStream); setSettings({ recordings: false, people_count: false, motion: false, intrusion_detection: false, license_plate_detection: false, face_detection: false, fire_smoke_detection: false, footfall_count: false }) }}
              trackColor="bg-white"
            />
          </div>
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
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-[#2B4C88] rounded-xl">
                <IconUserScan stroke={2} color="white" />
              </div>
              <span>{t('alerts.face_detection')}</span>
            </div>

            <Switch
              enabled={settings.face_detection}
              onChange={() => toggleSetting("face_detection", !settings.face_detection)}
              trackColor="bg-white"
            />
          </div>
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-[#2B4C88] rounded-xl">
                <IconFireExtinguisher stroke={2} color="white" />
              </div>
              <span>{t('alerts.fire_smoke_detection')}</span>
            </div>

            <Switch
              enabled={settings.fire_smoke_detection}
              onChange={() => toggleSetting("fire_smoke_detection", !settings.fire_smoke_detection)}
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
              <span>{t('alerts.people_count')}</span>
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
          <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
            <div className="flex items-center gap-2">
              <div className="flex gap-4 items-center">
                <div className="p-2 bg-[#2B4C88] rounded-xl">
                  <IconFriends stroke={2} color="white" />
                </div>
                <span>{t('alerts.footfall_count')}</span>
              </div>
            </div>
            <Switch
              enabled={settings.footfall_count}
              onChange={() => toggleSetting("footfall_count", !settings.footfall_count)}
              trackColor="bg-white"
            />
          </div>
        </div>}
      </Modal>
    );
  }
}
