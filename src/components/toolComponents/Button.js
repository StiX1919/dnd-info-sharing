import React from 'react'
import './button.css'

export default function Button(props) {
    return (

        <button style={props.style} className='reuse-button' onClick={props.buttFunc}>{props.children}</button>
        
    )
}