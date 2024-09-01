import styled from "styled-components";

const Container = styled.div`
  font-size: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 20px;
`;

const StyledParagraph = styled.p`
  margin: 0;
  font-size: 1em;
`;

const StyledLink = styled.a`
  color: #007bff; 
  text-decoration: none;
  margin: 0 5px; 
  cursor: pointer; /* Change the cursor to pointer for links */
  
  &:hover {
    text-decoration: underline;
  }
`;

export const MapLinkStyles = {
    Container, 
    StyledParagraph, 
    StyledLink
};
