import React from 'react';
import styled from 'styled-components';

interface Props {
   width?: string;
   height?: string;
   spinnerSize?: string;
   isVisible?: boolean;
   showText?: boolean;
   loadingMessage?: string;
}

const Loader: React.FC<Props> = () => {
   return <Container isVisible={false} isIframe={false}></Container>;
};

export default Loader;

const Container = styled.div<{ isVisible: boolean; isIframe: boolean }>`
   width: 100%;
   height: 100%;
   position: fixed;
   top: ${(props) => (props.isIframe ? '0px' : '60px')};
   left: 0;
   display: inline-block;
   z-index: -1;
   opacity: 0;
   background-color: rgba(255, 255, 255, 0.75);

   ${({ isVisible }) =>
      isVisible &&
      `
        z-index: 9999;
        opacity: 1;
    `}

   @media only screen and (max-width: 1025px) {
      width: 100vw;
      height: 100vh;
      top: ${(props) => (props.isIframe ? '0px' : '50px')};
   }

   /* Landscape */
   @media only screen and (min-device-width: 200px) and (max-device-width: 900px) and (max-device-height: 1000px) and (orientation: landscape) and (min-aspect-ratio: 13/9) {
      top: 0px;
   }
`;
