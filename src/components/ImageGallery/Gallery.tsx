import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
`;

const ImageCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  background-color: #f0f0f0;

  @media (max-width: 768px) {
    width: 100%;  /* Full width on mobile */
    height: 200px; /* Reduced height on mobile */
  }

  @media (max-width: 480px) {
    height: 150px; /* Further reduced height on smaller devices */
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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

  return (
    <CarouselContainer>
      <LeftButton onClick={handlePrevClick} disabled={photos.length <= 1}>
        &#8249;
      </LeftButton>
      <ImageCard>
        <Image src={photos[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      </ImageCard>
      <RightButton onClick={handleNextClick} disabled={photos.length <= 1}>
        &#8250;
      </RightButton>
    </CarouselContainer>
  );
};

export default Gallery;
