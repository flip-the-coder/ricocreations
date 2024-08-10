import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { Container } from './InfiniteScrollPagination.style';

interface InfiniteScrollPaginationProps {
    loadMore: () => void;
    children: ReactNode;
    className?: string;
    hasMore: boolean;
    isLoading: boolean;
}

const InfiniteScrollPagination = ({
    loadMore,
    children,
    className,
    hasMore,
    isLoading
}: InfiniteScrollPaginationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const loadData = useCallback(() => {
        if (hasMore && !isLoading) {
            loadMore();
        }
    }, [hasMore, isLoading, loadMore]);

    const isScrolledToBottom = (target: HTMLElement): boolean => {
        const scrollValue = target.scrollHeight - target.scrollTop;
        const clientHeight = target.clientHeight;
        return Math.ceil(scrollValue) === clientHeight || Math.floor(scrollValue) === clientHeight;
    };

    const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.scrollTop && isScrolledToBottom(target)) {
            loadData();
        }
    };

    useEffect(() => {
        const containerElement = containerRef.current;
        if (containerElement && containerElement.scrollHeight === containerElement.clientHeight) {
            loadData();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Container ref={containerRef} onScroll={onScroll} onTouchMove={onScroll} className={className}>
            {children}
        </Container>
    );
};

export default InfiniteScrollPagination;
