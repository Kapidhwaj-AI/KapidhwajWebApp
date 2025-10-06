import { protectApi } from '@/lib/protectApi'
import { showToast } from '@/lib/showToast'
import { fi } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'
import SelectField from '../ui/Select.field';
import Spinner from '../ui/Spinner';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface OccupancyTrendsData {
    label: string;
    in: number;
    out: number;
}
const OccupancyTrends = ({ camera_id, setLoading, loading, }: { camera_id: string, setLoading: (val: boolean) => void; loading: boolean }) => {
    const [filter, setFilter] = useState<'hour' | 'day' | 'week' | 'month'>('hour')
    const [data, setData] = useState<OccupancyTrendsData[]>([])
    const [totalIn, setTotalIn] = useState(0)
    const [totalOut, setTotalOut] = useState(0)
    const fetchOccupancyTrends = async () => {
        setLoading(true);
        try {
            const res = await protectApi<
                {
                    camera_id: string;
                    day_start_local?: string;
                    hour_start_local?: string;
                    in_sum: number | string;
                    out_sum: number | string;
                }[]
            >(`/alert/footfall?cameraId=${camera_id}&bucket=${filter}`, "GET");

            if (res.status === 200) {
                const data = res.data.data;
                const totalIn = data.reduce((acc, item) => acc + Number(item.in_sum), 0);
                const totalOut = data.reduce((acc, item) => acc + Number(item.out_sum), 0);
                setTotalIn(totalIn);
                setTotalOut(totalOut);  
                let sorted: typeof data = [];
                let formattedData: { label: string; in: number; out: number }[] = [];
                console.log(data, "fetched data")
                if (filter === "hour") {
                    sorted = [...data].sort(
                        (a, b) =>
                            new Date(a?.hour_start_local ?? "").getTime() -
                            new Date(b?.hour_start_local ?? "").getTime()
                    );
                    formattedData = sorted.map((item) => {
                        const istDate = new Date(item.hour_start_local ?? "");

                        const label = istDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            hour12: true,
                        });
                        return {
                            label,
                            in: Number(item.in_sum),
                            out: -Number(item.out_sum),
                        };
                    });
                } else if (filter === "day") {
                    sorted = [...data].sort(
                        (a, b) =>
                            new Date(a?.day_start_local ?? "").getTime() -
                            new Date(b?.day_start_local ?? "").getTime()
                    );
                    formattedData = sorted.map((item) => {
                        const date = new Date(item.day_start_local ?? "");
                        const weekday = date.toLocaleDateString("en-US", {
                            weekday: "long",
                        });
                        return {
                            label: weekday,
                            in: Number(item.in_sum),
                            out: -Number(item.out_sum),
                        };
                    });
                } else if (filter === "month") {
                    formattedData = [...data].map((item) => {
                        const date = new Date(item.day_start_local ?? "");
                        const month = date.toLocaleDateString("en-US", {
                            month: "short",
                        });
                        return {
                            label: month,
                            in: Number(item.in_sum),
                            out: -Number(item.out_sum),
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
    }, [filter]);

    return (
        <div className='flex flex-col gap-2'>
            <div className='self-end flex flex-col justify-end items-end gap-2'>
                <SelectField value={filter} setValue={(val: typeof filter) => {setFilter(val); setData([]); setTotalIn(0); setTotalOut(0)}} data={[{ id: 'hour', name: 'Hourly' }, { id: 'day', name: 'Day' }]} placeholder={'Select Time'} />
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
                            <XAxis dataKey="label" stroke="#555" />
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