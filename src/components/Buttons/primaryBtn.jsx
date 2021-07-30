import React from 'react'
import {BtnPrimary} from './style'
export default function PrimaryBtn({children, type}) {
    return (
        <BtnPrimary type={type}>
            {children}
        </BtnPrimary>
    )
}
