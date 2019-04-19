import React, {Component} from 'react'
import {connect} from 'react-redux'

import TableModel from './TableModel'
import Button from '../toolComponents/Button/Button'
import TableSelector from '../toolComponents/TableSelector/TableSelector'
import {getTables, addTable} from '../../ducks/reducers/tableReducer'

import './TableBar.css'


class TableBar extends Component {
    componentDidMount(){
        if(this.props.user) {
            this.props.getTables()
        }
    }

    render() {
        let style = {marginTop: '15px'}
        let tableButts = this.props.tables.map(table => {
            const {table_id, table_image, table_name} = table
            return <TableSelector key={table_id} style={'select'} title={table_name} style={{...style, backgroundImage: `url(${table_image ? table_image : 'https://png.pngtree.com/png_detail/18/09/10/pngtree-brown-wooden-table-png-clipart_1926718.jpg'})`}}/>
        })
        return (
            <div className='tables-bar'>
                {this.props.tables[0] &&
                    <div>
                        {tableButts}
                        
                        <h4 className='line-break'>________</h4>
                    </div>
                }

                <Button buttFunc={this.props.addTable} title='Add new Table' style={style}>+</Button>
            </div>
        )
    }
}


const mapStateToProps = state => ({...state.tableReducer, user: state.userReducer.user})

export default connect(mapStateToProps, {getTables, addTable})(TableBar)