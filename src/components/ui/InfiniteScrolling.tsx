import { useEffect, useRef } from "react";
interface InfiniteScrollingProp<T> {
    setIsLoading: (val: boolean) => void;
    setHasMore: (val: boolean) => void;
    hasMore: boolean;
    isLoading: boolean;
    fetchData: (offSet: number, serviceType?: string | null, startTime?:number, endTime?: number) => Promise<T[]>;
    serviceType?: string | null;
    startTime?:number;
    endTime?:number;
    setData: (val: T[]) => void;
    divRef: React.RefObject<HTMLDivElement | null>;
    topRef?: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>
    data: T[];
}
function InfiniteScrolling<T>({
    setIsLoading,
    setHasMore,
    setData,
    children,
    divRef,
    fetchData,
    offset,
    hasMore,
    setOffset,
    data,
    isLoading,
    serviceType,
    startTime,
    endTime,
    topRef
}: InfiniteScrollingProp<T>) {
    const offsetRef = useRef(offset);
    offsetRef.current = offset;
    let botLastY = 0;
    let lastY = 0;
    useEffect(() => {
        const target = divRef.current;
        console.log(target,"target")
        if (!target) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (topRef !== undefined) {
                    const currentY = entry.boundingClientRect.y;

                    if (entry.isIntersecting && currentY < botLastY
                        && hasMore && !isLoading) {
                        setOffset((prev) => prev + 10);
                    }
                    botLastY = currentY;
                } else {
                    if (entry.isIntersecting
                        && hasMore && !isLoading) {
                        setOffset((prev) => prev + 10);
                    }
                }
            },

            { threshold: 0.5 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [divRef, hasMore, isLoading]);
    useEffect(() => {
        const target = topRef?.current;
        if (!target || offset <= 0) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentY = entry.boundingClientRect.y;
                if (entry.isIntersecting && currentY > lastY &&
                    !isLoading
                ) {
                    setOffset((prev) => Math.max(prev - 10, 0));
                }
                lastY = currentY;
            },
            { threshold: 0.5 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [topRef, isLoading]);
    useEffect(() => {
        const loadItems = async () => {
            setIsLoading(true);
            try {
                const newData = await fetchData(offset, serviceType, startTime, endTime);
                if (newData.length <= 0) {
                    setHasMore(false);
                } else {
                    if (topRef !== undefined) {
                        setData(newData);
                    } else {
                        if (offset
                            > 0
                        ) {
                            setData([...data, ...newData])
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to fetch:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!isLoading && data.length > 0) loadItems();
    }, [offset, serviceType]);
    return <>{children}</>;
}

export default InfiniteScrolling;
