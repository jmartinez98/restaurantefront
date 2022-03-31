import styled from 'styled-components'
import Image from './images/background.jpg'


export const Body= styled.div`
    box-sizing: border-box;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    /* background-image: url(${Image});//"url(" + image + ")"; */
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    /* width: 100%; */
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden ;
    z-index:-2;
`;