import React from 'react'
import './button.css'

export default function Button(props) {
    return (
        <button title={props.title} style={props.style} className={`reuse-button ${props.class}`} onClick={props.buttFunc}>{props.children}</button>
    )
}