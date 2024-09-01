import styled from "styled-components";

interface EventHeaderProps {
  imageUrl?: string;
}

const EventContainer = styled.div`
  font-size: 1em;
  border: 1px solid #ccc;
  margin: 10px 0;
  padding: 0;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const EventHeader = styled.div<EventHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  ${props => !props.imageUrl && `
    height: auto;
    padding: 20px;
  `}

  @media (max-width: 768px) {
    height: 150px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    height: 120px;
    padding: 10px;
  }
`;

const EventName = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

const EventDetails = styled.div`
  margin-top: 10px;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 5px;
  }
`;

const WebsiteContainer = styled.div`
  gap: 5px;
  padding: 10px 0;
  text-align: center;

  a {
    text-decoration: none;
    color: blue;
    cursor: pointer;
    font-size: 1em;
  }

  @media (max-width: 768px) {
    gap: 5px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 5px;
  }

  a {
    font-size: 24px;
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;
  }

  a:hover {
    color: #007bff;
  }
`;

const EventStyles = {
  EventContainer,
  EventHeader,
  EventName,
  EventDetails,
  WebsiteContainer,
  SocialLinksContainer
};

export default EventStyles;
