import { protectApi } from '@/lib/protectApi'
import { showToast } from '@/lib/showToast'
import React, { useEffect, useState } from 'react'
import SelectField from '../ui/Select.field';
import Spinner from '../ui/Spinner';
import { Bar, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart),
    { ssr: false });

const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid),
    { ssr: false });

const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer),
    { ssr: false });

interface OccupancyTrendsData {
    label: string;
    in: number;
    fullLabel?: string;
    out: number;
}
const OccupancyTrends = ({ camera_id, setLoading, loading, }: { camera_id: string, setLoading: (val: boolean) => void; loading: boolean }) => {
    const [filter, setFilter] = useState<'minute' | 'hour' | 'day' | 'week' | 'month'>('minute')
    const [range, setRange] = useState<'3' | '4' | '6' | '12' | '15' | '18' | '24' | '7' | '30' | '45' | '90'>('15')
    const [rangeList, setRangeList] = useState<{ id: '3' | '4' | '6' | '12' | '15' | '18' | '24' | '7' | '30' | '45' | '90', name: string }[]>([{ id: '15', name: 'Last 15 minutes' }, { id: '30', name: 'Last 30 minutes' }, { id: '45', name: 'Last 45 minutes' }])
    const [data, setData] = useState<OccupancyTrendsData[]>([])
    const [totalIn, setTotalIn] = useState(0)
    const [totalOut, setTotalOut] = useState(0)
    const fetchOccupancyTrends = async () => {
        setLoading(true);
        try {
            const res = await protectApi<
                {
                    camera_id: string;
                    bucket_start: number;
                    bucket_end: number;
                    in_count: number | string;
                    out_count: number | string;
                }[]
            >(`/alert/footfall?cameraId=${camera_id}&bucket=${filter}&range=${range}`, "GET");

            if (res.status === 200) {
                const data = res.data.data;
                setTotalIn(res.data.total_in_count ?? 0);
                setTotalOut(res.data.total_out_count ?? 0);
                let sorted: typeof data = [];
                let formattedData: { label: string; in: number; out: number }[] = [];
                if (filter === "hour") {
                    sorted = [...data].sort(
                        (a, b) =>
                            a.bucket_start -
                            b.bucket_start
                    );
                    formattedData = sorted.map((item) => {
                        const istDate = new Date(item.bucket_start * 1000);
                        const label = istDate.toLocaleTimeString("en-IN", { hour: "2-digit", hour12: true });
                        return {
                            label,
                            in: Number(item.in_count),
                            out: -Number(item.out_count),
                        };
                    });
                } else if (filter === "minute") {
                    sorted = [...data].sort(
                        (a, b) => a.bucket_start - b.bucket_start);
                    formattedData = sorted.map((item) => {
                        const istDate = new Date(item.bucket_end * 1000);
                        const label = istDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }); return { label, in: Number(item.in_count), out: -Number(item.out_count), };
                    });
                } else if (filter === "week") {
                    sorted = [...data].sort(
                        (a, b) => a.bucket_start - b.bucket_start); formattedData = sorted.map((item) => {
                            const date = new Date(item.bucket_end * 1000);
                            const week = `W${Math.ceil(date.getDate() / 7)}`;
                            return {
                                label: week,
                                in: Number(item.in_count),
                                out: -Number(item.out_count),
                            };
                        });
                }


                else if (filter === "day") {
                    sorted = [...data].sort(
                        (a, b) =>
                            a.bucket_start -
                            b.bucket_start
                    );
                    formattedData = sorted.map((item) => {
                        const date = new Date(item.bucket_end * 1000);
                        const weekdayFull = date.toLocaleDateString("en-US", { weekday: "long" })
                        return {
                            label: weekdayFull,
                            in: Number(item.in_count),
                            out: -Number(item.out_count),
                        };
                    });
                } else if (filter === "month") {
                    formattedData = [...data].map((item) => {
                        const date = new Date(item.bucket_start ?? "");
                        const month = date.toLocaleDateString("en-US", {
                            month: "short",
                        });
                        return {
                            label: month,
                            in: Number(item.in_count),
                            out: -Number(item.out_count),
                        };
                    });
                }

                setData(formattedData);
            }
        } catch (error: any) {
            showToast(error?.response?.data?.message ?? "Something went wrong", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOccupancyTrends();
    }, [filter, range]);
    const CustomDayTick = ({ x, y, payload }: any) => {
        const isSunday = payload.value === "Sunday";
        const value = filter === 'day' ? payload.value.charAt(0) : payload.value;
        console.log(value, 'value')
        return (
            <g transform={`translate(${x},${y + 10})`}>

                <text
                    x={0}
                    y={0}
                    dy={10}
                    textAnchor="middle"
                    fill="#555"
                    fontSize={12}
                    fontWeight="bold"
                    style={
                        isSunday ? { fill: 'red' } : {}
                    }
                >
                    {value}
                </text>

            </g>
        );
    };
    return (
        <div className='flex flex-col gap-2'>
            <div className='self-end flex flex-col justify-end items-end gap-2'>
                <div className='flex gap-2'>
                    <SelectField value={filter} setValue={(val: typeof filter) => {
                        setFilter(val); setData([]); setTotalIn(0); setTotalOut(0);
                        if (val === 'day') {
                            setRange('7')
                            setRangeList([{ id: '7', name: 'Last 7 days' }, { id: '30', name: 'Last 30 days' }, { id: '90', name: 'Last 90 days' }])
                        }
                        else if (val === 'minute') {
                            setRange('15')
                            setRangeList([{ id: '15', name: 'Last 15 minutes' }, { id: '30', name: 'Last 30 minutes' }, { id: '45', name: 'Last 45 minutes' }])
                        }
                        else if (val === 'hour') {
                            setRange('6')
                            setRangeList([{ id: '6', name: 'Last 6 hours' }, { id: '12', name: 'Last 12 hours' }, { id: '18', name: 'Last 18 hours' }, { id: '24', name: 'Last 24 hours' }])
                        } else if (val === 'week') {
                            setRange('4')
                            setRangeList([{ id: '3', name: 'Last 3 weeks' }, { id: '4', name: 'Last 4 weeks' }])
                        } else if (val === 'month') {
                            setRange('3')
                            setRangeList([{ id: '3', name: 'Last 3 months' }, { id: '4', name: 'Last 4 months' }])
                        }
                    }} data={[{ id: 'minute', name: 'Minute' }, { id: 'hour', name: 'Hourly' }, { id: 'day', name: 'Day' }]} placeholder={'Select Time'} />
                    <SelectField value={range} setValue={(val: typeof range) => { setRange(val); setData([]); setTotalIn(0); setTotalOut(0) }} data={rangeList} placeholder={'Select Time'} />
                </div>

                <div className='flex gap-2'>
                    <span>Total In Count: {totalIn}</span>
                    <span>Total Out Count: {totalOut}</span>
                </div>
            </div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Traffic</h2>
            </div>

            {loading ? (
                <Spinner />
            ) : data.length === 0 ? (
                <span className="text-center">No data found</span>
            ) : (
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            stackOffset="sign"
                            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                            <XAxis dataKey="label" stroke="#555" tick={<CustomDayTick />} />
                            <YAxis domain={["dataMin", "dataMax"]} stroke="#555" tickFormatter={(value) => Math.abs(value).toString()} />
                            <Legend
                                formatter={(value) =>
                                    value === "in" ? "In" : value === "out" ? "Out" : value
                                }
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                    borderRadius: 6,
                                }}
                                formatter={(value: number, name: string) =>
                                    [
                                        Math.abs(value),
                                        name
                                    ]}
                            />

                            <Bar
                                dataKey="out"
                                stackId="a"
                                fill="#ef4444"
                                name="Out"
                                radius={[10, 10, 0, 0]}
                            />
                            <Bar
                                dataKey="in"
                                stackId="a"
                                fill="#22c55e"
                                name="In"
                                radius={[10, 10, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}

export default OccupancyTrends