import styled from 'styled-components'
import Image from './images/background.jpg'


export const Body= styled.div`
    background-image: url(${Image});//"url(" + image + ")";
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
`;