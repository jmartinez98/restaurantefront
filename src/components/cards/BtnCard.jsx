import React from 'react'
import {ButtonCard} from './style'
export default function BtnCard(props) {
    return (
        <ButtonCard disabled={props.disabled} {...props}>
            {props.children}
        </ButtonCard>
    )
}
