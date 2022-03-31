import React from 'react'
import {ItemC, ButtonCard, SCard} from './style'
export function ItemCard(props) {
    return (
        <ItemC {...props}>
            {props.children}
        </ItemC>
    )
}

export function BtnCard(props) {
    return (
        <ButtonCard disabled={props.disabled} {...props}>
            {props.children}
        </ButtonCard>
    )
}

export function SimpleCard (props){
    return(
        <SCard {...props}>
            {props.children}
        </SCard>
    )
}