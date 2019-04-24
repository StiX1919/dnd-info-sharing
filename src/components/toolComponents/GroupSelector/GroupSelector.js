import React from 'react'
import './groupSelector.css'

export default function GroupSelector(props) {
    return (
        <button title={props.title} style={props.style} className={`group-selector ${ props.class }`} onClick={() => props.buttFunc(props.index)}>{props.children}</button>
    )
}