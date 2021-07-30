import React from 'react'
import {AnimatedComponent} from './styles'
export default function BlinkingAnimation({children}) {
    return (
        <AnimatedComponent>
            {children}
        </AnimatedComponent>
    )
}
