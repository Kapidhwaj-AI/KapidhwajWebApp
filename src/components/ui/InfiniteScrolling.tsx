import { useEffect } from "react";

interface InfiniteScrollingProp<T> {
    setIsLoading: (val: boolean) => void;
    setHasMore: (val: boolean) => void;
    hasMore: boolean;
    isLoading: boolean;
    fetchData: ( offSet: number) => Promise<T[]>;
    setData: (val: T[]) => void;
    divRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    offset: number;
    setOffset: (val: number) => void;
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
    isLoading
}: InfiniteScrollingProp<T>) {
    useEffect(() => {
        const loadItems = async () => {
            setIsLoading(true);
            try {
                const newData = await fetchData(offset);
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
    }, [offset]);

    useEffect(() => {
        const target = divRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !isLoading) {
                    setOffset(offset + 10);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [divRef, hasMore, isLoading, offset, setOffset]);

    return children;
}

export default InfiniteScrolling;
