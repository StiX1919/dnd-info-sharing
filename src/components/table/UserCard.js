import React from 'react'

import ItemTypes from './ItemTypes'
import {DragSource} from 'react-dnd'

const cardSource = {
    beginDrag(props) {
        return {
            name: props.person
        }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult()

        if(dropResult) {
            props.changePlace(item.name, dropResult.name)
            console.log('You dropped '+ item.name + ' into ' + dropResult.name)
        }
    }
}
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function UserCard(props) {
    const {isDragging, connectDragSource, person} = props
    const opacity = isDragging ? 0.5 : 1
    return connectDragSource(<div style={{opacity}} className='player' >{person}</div>)
}


export default DragSource(ItemTypes.CARD, cardSource, collect)(UserCard)