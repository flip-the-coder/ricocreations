import React from 'react';
import styled from 'styled-components';
import Gallery from './ImageGallery/Gallery';

const MainPage = () => {
    return (
      <MainContainer>
        <Gallery />
      </MainContainer>
    );
  };

  export default MainPage;
  
  const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
  `;