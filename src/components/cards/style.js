import styled from 'styled-components';

export const SCard = styled.div`
    padding-inline: 25px;
    padding-block: 30px;
    width: 100%;
    background-color: #ffffffd1;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px;
`;
export const ButtonCard = styled.button`
    padding-inline: 25px;
    padding-block: 30px;
    box-shadow: 0px 0px 2px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 3px;
    /* background-color: #99b8ff3d; */
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(253, 253, 253);
    width: 100%;
    height: 100%;
    :active{
        box-shadow: 0px 0px 0px 0px;
    };
`;

export const ItemC = styled.div`
    padding-inline: 10px;
    padding-block: 20px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 2px;
    box-shadow: 0px 0px 3px 0px;
`;
