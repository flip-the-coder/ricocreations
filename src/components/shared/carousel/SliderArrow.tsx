import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ChevronLeftIcon } from '../../../icons/keyboard_arrow_left-24px.svg';
import { ReactComponent as ChevronRightIcon } from '../../../icons/keyboard_arrow_right-24px.svg';

export const SLIDER_ARROW_CLASS_NAME = 'slide-show-arrow';

interface Props {
    direction: 'right' | 'left';
    onClick?: any;
}

const SliderArrow: React.FC<Props> = (props) => {
    const className = `${SLIDER_ARROW_CLASS_NAME} slider-arrow-${props.direction}`;

    return (
        <SliderArrowButton className={className} onClick={props.onClick}>
            <IconContainer>{props.direction === 'right' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconContainer>
        </SliderArrowButton>
    );
};

export default SliderArrow;

const IconContainer = styled.div`
    transition: transform 300ms ease-in-out;
`;

const SLIDER_ARROW_SIZE = 80;

const SliderArrowButton = styled.div`
    position: absolute;
    top: 50%;
    height: 40px;
    width: ${SLIDER_ARROW_SIZE}px;
    border-radius: 150px 150px 0 0;
    background-color: #000000;
    opacity: 0;
    z-index: 9;
    display: block;
    cursor: pointer;

    &.slider-arrow-right {
        right: -${SLIDER_ARROW_SIZE}px;
        transform: translate(-75%, -50%) rotate(-90deg);

        svg {
            transform: rotate(90deg) translate(10px, -60%);
        }
    }

    &.slider-arrow-left {
        left: 0;
        transform: translate(-25%, -50%) rotate(90deg);

        svg {
            transform: rotate(-90deg) translate(-10px, 70%);
        }
    }

    svg {
        fill: #ffffff;
        width: 35px;
        height: 35px;
    }

    &:hover {
        color: #ffffff;
        outline: none;
        background: #000000 0% 0% no-repeat padding-box;

        ${IconContainer} {
            transform: translateY(3px);
        }
    }

    @media only screen and (max-width: 720px) {
        display: block;
        opacity: 0.7;

        &.slider-arrow-right {
            right: ${-SLIDER_ARROW_SIZE}px;
        }

        &.slider-arrow-left {
            left: 0;
        }
    }
`;
