"use client"

import React, { useState } from "react"
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false });
const ChartContainer = dynamic(() => import("@/components/ui/chart").then((mod) => mod.ChartContainer), { ssr: false });
const ChartStyle = dynamic(() => import("@/components/ui/chart").then((mod) => mod.ChartStyle), { ssr: false });    
import { StorageUsageViewProps } from "@/models/settings"
import Spinner from "@/components/ui/Spinner"
import dynamic from "next/dynamic";
import { ChartConfig } from "@/components/ui/chart";
import { Pie, Tooltip, Label } from "recharts";
export const description = "An interactive pie chart"
const chartConfig = {
    images: {
        label: "Alerts",
        color: "var(--chart-1)",
    },
    clips: {
        label: "Clips",
        color: "var(--chart-2)",
    },
    free: {
        label: "Free",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

const StorageView: React.FC<StorageUsageViewProps> = ({ storageUsage, loading }) => {
    const id = "pie-interactive"
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    if (!storageUsage) {
        return <div>Loading storage data...</div>
    }
    const storageData = [
        { type: "images", storage: parseInt(storageUsage?.imagesGB.toString()), fill: "var(--chart-1)" },
        { type: "clips", storage: parseInt(storageUsage?.clipsGB.toString()), fill: "var(--chart-2)" },
        { type: "free", storage: parseInt(storageUsage?.freeGB.toString()), fill: "var(--chart-3)" },
    ]
    return (
        <div className="p-4 h-full w-full">
            <div data-chart={id} className="flex flex-col h-full w-full bg-[var(--surface-400)] rounded-2xl p-2 border-0">
                {loading ? <Spinner /> : <>
                    <h1 className="flex-row items-start space-y-0 pb-0">
                        <div className="grid gap-1">
                            <h1 className="font-semibold leading-none tracking-tight">Storage Usage Details</h1>
                            <span className="text-sm text-muted-foreground">{storageUsage.sizeGB}GB</span>
                        </div>
                    </h1>
                    <div className="grid grid-cols-2 h-full w-full  pb-0">
                        <ChartStyle id={id} config={chartConfig} />
                        <ChartContainer
                            id={id}
                            config={chartConfig}
                            className="col-span-1 w-full h-full max-w-[410px]"
                        >
                            <PieChart width={400} height={400} onMouseMove={(e) => {
                                if (e && e.activeCoordinate) {
                                    setMousePos({ x: e.activeCoordinate.x, y: e.activeCoordinate.y })
                                }
                            }}
                            >
                                <Tooltip
                                    cursor={{ stroke: "#2B4C88", strokeWidth: 2 }}

                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const item = payload[0]
                                            console.log("Tooltip payload item:", item.payload.fill)
                                            const label = chartConfig[item?.name ?? ""]?.label || item.name
                                            return (
                                                <div
                                                    className="absolute pointer-events-none bg-background border border-muted rounded-md p-2 shadow-md text-sm"
                                                    style={{
                                                        left: mousePos.x,
                                                        top: mousePos.y,
                                                        position: "absolute",
                                                    }}
                                                >
                                                    <p className="font-semibold">{label}</p>
                                                    <p className="text-muted-foreground">{item.value}GB used</p>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Pie
                                    data={storageData}
                                    dataKey="storage"
                                    nameKey="type"
                                    innerRadius={120}
                                    strokeWidth={2}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-wrap  text-xl font-bold"
                                                        >
                                                            {Number(storageUsage?.usedGB).toFixed(2) + 'GB Used out of'}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            {storageUsage.sizeGB.toLocaleString() + 'GB'}
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                        <div className="col-span-0.5 h-full flex items-start gap-3 flex-col justify-center p-2">
                            <h2 className="border-b-2 border-[#2B4C88]  text-start">Storage Overview</h2>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col border-[#2B4C88] border-2 rounded-xl p-2">
                                    <span>Total Size:</span>
                                    <span>{storageUsage.sizeGB}GB</span>
                                </div>
                                <div className="flex flex-col border-[#2B4C88] border-2 rounded-xl p-2">
                                    <span>Used Size:</span>
                                    <span>{storageUsage.usedGB}GB</span>
                                </div>
                                <div className="flex gap-2 w-full">
                                    <div className="flex flex-col w-full border-[#2B4C88] border-2 rounded-xl p-2">
                                        <span>Alerts :</span>
                                        <span>{storageUsage.imagesGB}GB</span>
                                    </div>
                                    <div className="flex flex-col border-[#2B4C88] border-2 w-full rounded-xl p-2">
                                        <span>Clips Size:</span>
                                        <span>{storageUsage.clipsGB}GB</span>
                                    </div>
                                </div>
                                <div className="flex flex-col border-[#2B4C88] border-2 rounded-xl p-2">
                                    <span>Free Size:</span>
                                    <span>{storageUsage.freeGB}GB</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-col border-[#2B4C88] border-2 rounded-xl p-2">
                                        <span>Used Percent:</span>
                                        <span>{storageUsage.usedPercent}</span>
                                    </div>
                                    <div className="flex flex-col border-[#2B4C88] border-2 rounded-xl p-2">
                                        <span>Free Percent:</span>
                                        <span>{storageUsage.freePercent}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}
export default StorageView