import styled, { keyframes } from 'styled-components';
function blinkingEffect() {
    return keyframes`
      50% {
        opacity: 0;
      }
    `;
}

export const AnimatedComponent = styled.div`
    animation: ${blinkingEffect} 5s linear infinite;
`