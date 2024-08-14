import React from 'react';
import styled from 'styled-components';

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const Gallery = () => (
  <ImageGrid>
    <Image src="http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851469-YBAVZ06F9FZRYOSPMMG9/yasmin.jpg" alt="Yasmin" />
    <Image src="http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851005-O22SCLM2200NXLL0COL6/LOVELY+LAVENDER.jpg" alt="Lovely Lavender" />
    <Image src="http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575849912-ZY71UJ5LWTNRBTZKZR8J/lolita.jpg" alt="Lolita" />
    <Image src="http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575848050-XIMEV1ZFE18J155X2CN9/CITRUS+ISLAND.jpg" alt="Citrus Island" />
  </ImageGrid>
);

export default Gallery;
