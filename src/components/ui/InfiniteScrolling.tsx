import { useEffect } from "react";

interface InfiniteScrollingProp<T> {
    setIsLoading: (val: boolean) => void;
    setHasMore: (val: boolean) => void;
    hasMore: boolean;
    isLoading: boolean;
    fetchData: (offSet: number, serviceType?: string | null) => Promise<T[]>;
    serviceType?: string | null;
    setData: (val: T[]) => void;
    divRef: React.RefObject<HTMLDivElement | null>;
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
    serviceType
}: InfiniteScrollingProp<T>) {
    useEffect(() => {
        const loadItems = async () => {
            setIsLoading(true);
            try {
                const newData = await fetchData(offset, serviceType);
                if (newData.length === 0) {
                    setHasMore(false);
                } else {
                    setData([...data, ...newData]);
                }
            } catch (error) {
                console.error('Failed to fetch:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (offset > 0) loadItems();
    }, [offset, serviceType]);

    useEffect(() => {
        const target = divRef.current;
        console.log(target,"target")
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !isLoading) {
                    setOffset((prev) => prev + 10);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [divRef, hasMore, isLoading, offset, setOffset]);

    return <>{children}</>;
}

export default InfiniteScrolling;
