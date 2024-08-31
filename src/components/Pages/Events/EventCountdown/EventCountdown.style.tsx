import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25vh;
  text-align: center;
`;

const Message = styled.div`
  font-size: 1.5rem;  /* Adjust font size as needed */
  margin-bottom: 1rem;
`;

const Timer = styled.div`
  font-size: 2rem;  /* Adjust font size as needed */
  font-weight: bold;
`;


const EventCountdownStyles = {
    Container, 
    Message, 
    Timer
}

export default EventCountdownStyles;