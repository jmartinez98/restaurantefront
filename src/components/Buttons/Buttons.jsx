import React from 'react'
import {BtnPrimary,BtnSecodary, BtnWaring} from './style'
export function PrimaryBtn(props) {
    return (
        <BtnPrimary {...props}>
            {props.children}
        </BtnPrimary>
    )
}


export function SecondaryBtn(props){
    return(
        <BtnSecodary {...props}>
            {props.children}
        </BtnSecodary>
    )
}

export function WaringBtn(props){
    return(
        <BtnWaring {...props}>
            {props.children}
        </BtnWaring>
    )
}