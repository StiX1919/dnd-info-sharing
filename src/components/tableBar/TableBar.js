import React, {Component} from 'react'

import Button from '../toolComponents/Button'

import './TableBar.css'


class TableBar extends Component {


    render() {
        let style = {marginTop: '10px'}
        return (
            <div className='tables-bar'>
                <Button title='Add new Table' style={style}>+</Button>
            </div>
        )
    }
}


export default TableBar