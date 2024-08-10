import React, { MouseEvent, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import SliderArrow, { SLIDER_ARROW_CLASS_NAME } from './SliderArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props extends Settings {
    nextArrow?: JSX.Element;
    prevArrow?: JSX.Element;
    height?: string;
    onClick?: (e: MouseEvent) => void;
    hideArrowsAtEnds?: boolean;
    totalSlides?: number; // Required with use of hideArrowsAtEnds
    slidesToShow?: any;
}

const Carousel: React.FC<Props> = (props) => {
    const slider = React.createRef<Slider>();
    const { nextArrow, prevArrow, height, slidesToShow, ...settingsProps } = props;

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const isAtEnd = props.hideArrowsAtEnds && props.totalSlides && currentImageIndex === props.totalSlides - 1;
    const isAtBeginning = props.hideArrowsAtEnds && currentImageIndex === 0;

    const settings: Settings = {
        ...settingsProps,
        infinite: false,
        speed: 400,
        slidesToShow: props.slidesToShow,
        slidesToScroll: props.slidesToShow,
        rows: 1,
        lazyLoad: 'ondemand',
        initialSlide: 0,
        nextArrow: props.nextArrow ? props.nextArrow : <SliderArrow direction={'right'} />,
        prevArrow: props.prevArrow ? props.prevArrow : <SliderArrow direction={'left'} />,
        beforeChange: (_, newIndex: number) => {
            setCurrentImageIndex(newIndex);
        }
    };

    return (
        <SliderContainer
            isAtEnd={!!isAtEnd}
            isAtBeginning={!!isAtBeginning}
            onClick={props.onClick}
            height={props.height}
        >
            <Slider ref={slider} {...settings}>
                {props.children}
            </Slider>
        </SliderContainer>
    );
};

export default Carousel;

const SliderContainer = styled.div<{ height?: string; isAtEnd: boolean; isAtBeginning: boolean }>`
    width: 100%;
    height: ${(props) => props.height || ''};

    .slick-slider {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        height: 100%;

        > div {
            scroll-behavior: smooth;
        }
    }

    .slick-track {
        display: flex;
        align-items: stretch;

        ${({ height }) =>
            height &&
            `
            height: ${height};
        `}
    }

    .slick-next:before,
    .slick-prev:before {
        content: none !important;
    }

    .slick-next {
        display: ${(props) => (props.isAtEnd ? 'none !important' : '')};
    }

    .slick-prev {
        display: ${(props) => (props.isAtBeginning ? 'none !important' : '')};
    }

    .${SLIDER_ARROW_CLASS_NAME} {
        display: block;
        opacity: 0.7;
    }

    @media only screen and (max-width: 720px) {
        .slick-arrow {
            position: fixed;
            background-color: #ffffff;
            display: block;
            opacity: 0.7;

            svg {
                fill: #000000;
            }
        }

        .slick-prev {
            left: 0px;
        }

        .slick-next {
            left: 100%;
        }
    }
`;
