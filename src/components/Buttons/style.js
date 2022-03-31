import styled from 'styled-components';

export const BtnPrimary= styled.button`
    
    padding-inline: 20px;
    padding-block: 7px;
    margin-inline: 5px;
    background: rgba( 255, 255, 255, 0.7 );
    box-shadow: 0 0px 10px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 16px );
    -webkit-backdrop-filter: blur( 16px );
    border-radius: 5px;
    border: 1px solid rgba( 0, 0, 0, 0.3 );
    :active{
        box-shadow: 0px 0px 0px 0px;
    };
`;

export const BtnSecodary= styled.button`
    border: 0px;
    border-radius: 5px;
    background-color: #292929;
    padding: 10px;
    margin-inline: 5px;
    box-shadow: 0px 0px 4px 0px;
    color: whitesmoke;
    :active{
        box-shadow: 0px 0px 0px 0px;
        background-color: #292929bd;
    };
`;

export const BtnWaring= styled.button`
    border: 1px solid #cf1f1f;
    border-radius: 2px;
    background-color: #c900003b;
    padding-inline: 20px;
    padding-block: 7px;
    margin-inline: 5px;
    box-shadow: 0px 0px 4px 0px;
    color: #1c1c1c;
    :active{
        box-shadow: 0px 0px 0px 0px;
        background-color: #ad000087;
    };
`;