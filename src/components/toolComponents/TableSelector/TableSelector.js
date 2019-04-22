import React from 'react'
import './tableSelector.css'

export default function TableSelector(props) {
    return (
        <button title={props.title} style={props.style} className={`table-selector ${ props.class }`} onClick={() => props.buttFunc(props.index)}>{props.children}</button>
    )
}