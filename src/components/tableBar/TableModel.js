import React, {Component} from 'react'

import {connect} from 'react-redux'
import {createTable, addTable} from '../../ducks/reducers/tableReducer'
import Button from '../toolComponents/Button/Button'

import './TableModel.css'

class TableModel extends Component {
    constructor() {
        super()
        this.state = {
            tableName: '',
            tableImage: ''
        }
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({[name]: value})
    }
    addDefaultImg = (e) => {
        e.target.src = 'https://png.pngtree.com/png_detail/18/09/10/pngtree-brown-wooden-table-png-clipart_1926718.jpg'
    }


    render() {
        console.log('table state', this.state)
        return (
            <div className='table-model'>
                <h1>New Table</h1>
                <input 
                    type='text' 
                    id='table-name-input' 
                    className='table-input t-name-text' 
                    placeholder='Table name' 
                    value={this.state.tableName}
                    name='tableName'
                    onChange={this.handleChange}/>
                <label htmlFor="username-input" className="table-name-label">Table Name</label>
                <input 
                    type='text' 
                    id='table-pic-input' 
                    className='table-input t-pic-text' 
                    placeholder='Table image'
                    value={this.state.tableImage}
                    name='tableImage'
                    onChange={this.handleChange}/>
                <label htmlFor="prof-pic-input" className="table-pic-label">Table Image</label>
                <img className='demo-t-pic' src={this.state.tableImage} onError={this.addDefaultImg} alt='old profile pic'/>

                <button onClick={() => this.props.createTable(this.state)}>Create Table</button>


                <Button buttFunc={this.props.addTable} style={{width: '20px', height: '20px'}} class='close-model'>X</Button>
            </div>
        )
    }
}

const mapStateToProps = state => state.tableReducer

export default connect(mapStateToProps, {createTable, addTable})(TableModel)