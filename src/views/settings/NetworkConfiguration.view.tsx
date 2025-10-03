import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/CustomeSwitch";
import { useTranslations } from "next-intl";
import { NetworkData, NetworkViewProps } from "@/models/settings";
import Spinner from "@/components/ui/Spinner";
import IPv4Input from "@/components/ui/IPv4Input";
import SelectField from "@/components/ui/Select.field";
import { filterButtonClassname } from "@/styles/tailwind-class";



export default function NetworkConfigurationView({ networkData, loading, handleSave, nic, nicsData, setNic, status }: NetworkViewProps) {
    const [newData, setNewData] = useState<NetworkData | undefined>(networkData)
    const t = useTranslations()
    useEffect(() => {
        if (networkData) {
            setNewData(networkData);
        }
        else {
            setNewData((prev) => ({ ...prev, mode: "dhcp" }))
        }
    }, [networkData]);

    useEffect(() => {
        console.log("newData updated:", newData);
    }, [newData]);
    console.log(networkData, "netw")
    return (
        <div className="flex flex-col gap-6">
            <div className={filterButtonClassname} >
                {dot(status?.isInternetConnected ? "bg-green-500" : "bg-red-500", status?.isInternetConnected ? "Internet Connected" : "Internet Disconnected")}
                {dot(status?.isSocketConnected ? "bg-green-500" : "bg-red-500", status?.isSocketConnected ? "Socket Connected" : "Socket Disconnected")}
                {dot(status?.isTunnelAlive ? "bg-green-500" : "bg-red-500", status?.isTunnelAlive ? "Tunnel Alive" : "Tunnel Down")}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(newData) }} className="space-y-5 md:w-[40rem] w-full self-center p-6 bg-[var(--surface-200)] dark:bg-gray-800 flex flex-col py-3 px-4 rounded-2xl border">
                <SelectField value={nic} setValue={setNic} data={nicsData.map((item) => ({ id: item.id, name: item.id }))} label={t('settings.select_type')} placeholder={'Select Network interface'} />
                <div className="flex justify-between items-center py-3 px-4 rounded-2xl border ">
                    <span className="font-medium">{t('settings.network.dhcp')}</span>
                    <Switch
                        enabled={newData?.mode === "dhcp"}
                        onChange={() => {
                            setNewData((prev) => ({ ...prev, mode: prev?.mode === "dhcp" ? "static" : "dhcp" }))
                            setNewData((prev) => ({ ...prev, autoDns: prev?.mode === "dhcp" ? true : false }))
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
                            ipv4: { ...prev?.ipv4, subnetMask: val },
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
        </div>
    );
}


const dot = (color: string, name: string) => (
    <span title={name} className={`h-3 w-3 ${color} rounded-full inline-block mr-2`}></span>
);