import React from 'react'

import ItemTypes from './ItemTypes'
import {DragSource} from 'react-dnd'

const cardSource = {
    beginDrag(props) {
        return {
            info: props.info
        }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult()

        if(dropResult) {
            // props.changePlace(item.name, dropResult.name)
            console.log(dropResult.name + ' knows about ' + item.info)
        }
    }
}
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function InfoCard(props) {
    const {isDragging, connectDragSource, info} = props
    const opacity = isDragging ? 0.5 : 1
    return connectDragSource(<h1 style={{opacity}} >{info}</h1>)
}


export default DragSource(ItemTypes.CARD, cardSource, collect)(InfoCard)