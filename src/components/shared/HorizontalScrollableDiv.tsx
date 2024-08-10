import { observer } from 'mobx-react-lite';
import React, { WheelEvent, useRef } from 'react';
import styled from 'styled-components';

interface ScrollableDivProps {
    children: React.ReactChild;
}

const HorizontalScrollableDiv: React.FC<ScrollableDivProps> = ({ children }: ScrollableDivProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const ele = containerRef.current!;
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const onWheel = (e: WheelEvent) => {
        if (containerRef?.current) {
            containerRef.current.scrollBy({
                left: e.deltaY,
                behavior: 'smooth'
            });
        }
    };

    const mouseDownHandler = function (e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    return (
        <Container ref={containerRef} onWheel={onWheel} onMouseDown={mouseDownHandler}>
            {children}
        </Container>
    );
};

export default observer(HorizontalScrollableDiv);

const Container = styled.div`
    overflow-x: scroll;
    /* Bottom padding is used to fix strange behavior of the bottom border dragging on scroll */
    padding-bottom: 1px;
    scrollbar-color: #fff0 #fff0; /* For Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
`;
