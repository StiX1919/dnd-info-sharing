import React from 'react'

import {DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'

const cardTarget = {
    canDrop(props) {
        return true
    },
    drop(props){
        return {name: props.ogPerson}
    }
}
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        conDrop: monitor.canDrop()
    }
}


function CardBin(props){
    const {canDrop, isOver, connectDropTarget} = props
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if(isActive){
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    return (connectDropTarget(<div style={{backgroundColor}}>{props.children}</div>))
}

export default DropTarget(ItemTypes.CARD, cardTarget, collect)(CardBin)