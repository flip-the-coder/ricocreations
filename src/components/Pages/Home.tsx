import { observer } from 'mobx-react-lite';
import React from 'react';
import Gallery from '../ImageGallery/Gallery';
import styled from 'styled-components';

const Dispensary: React.FC = () => {
    return (
        <MainContainer>
          <Gallery />
        </MainContainer>
      );
};

export default observer(Dispensary);

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
  `;