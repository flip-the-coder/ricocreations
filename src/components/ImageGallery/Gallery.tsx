import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

const CarouselContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto;
    padding: 16px;
`;

const ImageCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    background-color: #f0f0f0;
    width: 240px;
    height: 240px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensures the entire image fits within the container */
`;

const Button = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;

    &:hover {
        background: rgba(0, 0, 0, 0.7);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        width: 24px;
        height: 24px;
        padding: 6px;
    }

    @media (max-width: 480px) {
        width: 20px;
        height: 20px;
        padding: 4px;
    }
`;

const LeftButton = styled(Button)`
    left: 10px;
`;

const RightButton = styled(Button)`
    right: 10px;
`;

interface GalleryProps {
    photos: string[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleNextClick,
        onSwipedRight: handlePrevClick,
        trackMouse: true // Enables swipe detection with mouse events as well
    });

    return (
        <CarouselContainer {...handlers}>
            <ImageCard>
                <LeftButton onClick={handlePrevClick} disabled={photos.length <= 1} aria-label="Previous Image">
                    &#8249;
                </LeftButton>
                <Image src={photos[currentIndex]} alt={`Image ${currentIndex + 1}`} />
                <RightButton onClick={handleNextClick} disabled={photos.length <= 1} aria-label="Next Image">
                    &#8250;
                </RightButton>
            </ImageCard>
        </CarouselContainer>
    );
};

export default Gallery;
