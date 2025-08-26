"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/CustomeSwitch"; // adjust import to your Switch
import { InputField } from "@/components/ui/Input.field"; // your custom input
import { useTranslations } from "next-intl";
import { NetworkData, NetworkViewProps } from "@/models/settings";
import Spinner from "@/components/ui/Spinner";
import IPv4Input from "@/components/ui/IPv4Input";



export default function NetworkConfigurationView({ networkData, loading, handleSave }: NetworkViewProps) {
    const [newData, setNewData] = useState<NetworkData | undefined>(networkData)
    const t = useTranslations()
    useEffect(() => {
        setNewData(networkData);
    }, [networkData]);

    useEffect(() => {
        console.log("newData updated:", newData);
    }, [newData]);

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(newData) }} className="space-y-5 md:w-[40rem] w-full self-center p-6 bg-white flex flex-col py-3 px-4 rounded-2xl border">
            <div className="flex justify-between items-center py-3 px-4 rounded-2xl border ">
                <span className="font-medium">{t('settings.network.dhcp')}</span>
                <Switch
                    enabled={newData?.mode === "dhcp"}
                    onChange={() => {
                        setNewData((prev) =>
                            prev
                                ? { ...prev, mode: prev.mode === "dhcp" ? "static" : "dhcp" }
                                : undefined
                        )
                        setNewData((prev) =>
                            prev
                                ? { ...prev, autoDns: prev.mode === "dhcp" ? true : false }
                                : undefined
                        )
                    }
                    }
                    trackColor='bg-gray-300'
                />
            </div>
            <IPv4Input
                disabled={newData?.mode === 'dhcp'}
                label={t('settings.network.ipv4')}
                value={newData?.ipv4?.address ?? ""}
                onChange={(val) =>
                    setNewData((prev) => ({
                        ...prev,
                        ipv4: { ...prev?.ipv4, address: val },
                    }))
                }
            />
            <IPv4Input
                disabled={newData?.mode === 'dhcp'}
                label={t('settings.network.default_gateway')}
                value={newData?.ipv4?.gateway ?? ""}
                onChange={(val) =>
                    setNewData((prev) => ({
                        ...prev,
                        ipv4: { ...prev?.ipv4, gateway: val },
                    }))
                }
            />
            <IPv4Input
                disabled={newData?.mode === 'dhcp'}
                label={t('settings.network.subnetmask')}
                value={newData?.ipv4?.subnetMask ?? ""}
                onChange={(val) =>
                    setNewData((prev) => ({
                        ...prev,
                        ipv4: { ...prev?.ipv4, mask: val },
                    }))
                }
            />
            <div className="flex justify-between items-center py-3 px-4 rounded-2xl border">
                <span className="font-medium">{t('settings.network.autDns')}</span>
                <Switch
                    disabled={newData?.mode === 'static'}
                    enabled={(newData?.autoDns !== undefined ? newData?.autoDns : newData?.mode === "dhcp") ?? false}
                    onChange={() =>
                        setNewData((prev) =>
                            prev
                                ? { ...prev, autoDns: !prev.autoDns }
                                : undefined
                        )
                    }
                    trackColor='bg-gray-300'
                />
            </div>
            <IPv4Input
                disabled={newData?.autoDns !== undefined ? newData?.autoDns : newData?.mode === 'dhcp'}
                label={t('settings.network.pdns')}
                value={newData?.dns?.preferrd ?? ""}
                onChange={(val) =>
                    setNewData((prev) => ({
                        ...prev,
                        dns: { ...prev?.dns, primary: val },
                    }))
                }
            />
            <IPv4Input
                disabled={newData?.autoDns !== undefined ? newData?.autoDns : newData?.mode === 'dhcp'}
                label={t('settings.network.adns')}
                value={newData?.dns?.alternate ?? ""}
                onChange={(val) =>
                    setNewData((prev) => ({
                        ...prev,
                        dns: { ...prev?.dns, secondary: val },
                    }))
                }
            />
            <button type="submit" className="self-end h-[35px] sm:h-[40px] md:h-[45px] bg-[#2B4C88] hover:bg-blue-700 text-white text-sm sm:text-base rounded-full px-5 transition-colors"
            >{loading ? <Spinner /> : t('save')}</button>
        </form>
    );
}
