import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import TableModel from './TableModel'
import Button from '../toolComponents/Button/Button'
import TableSelector from '../toolComponents/TableSelector/TableSelector'
import {getTables, addTable} from '../../ducks/reducers/tableReducer'

import './TableBar.css'


const DisplayBarTop = styled.div`
    height: ${props => props.index * 67}px;
    position: absolute;
    width: 100%;
    top: 0;
    transition: .25s;
`
const DisplayBarBottom = styled.div`
    height: calc( 100vh - 105px - ${props => 55 + (props.index * 67)}px);
    position: absolute;
    width: 100%;
    bottom: 0;
    transition: .25s;
`
const CurveTop = styled.div`
    margin-top: ${props => props.index * 67}px;
    position: absolute;
    width: 100%;
    top: 0;
    transition: .25s;
`
const CurveBottom = styled.div`
    margin-bottom: calc( 100vh - 105px - ${props => 55 + (props.index * 67)}px);
    position: absolute;
    width: 100%;
    bottom: 0;
    transition: .25s;
`



class TableBar extends Component {
    constructor(){
        super()
        this.state = {
            selectedTable: 0
        }
    }
    componentDidMount(){
        if(this.props.user) {
            this.props.getTables()
        }
    }

    selectTable = (index) => {
        this.setState({selectedTable: index})
    }

    render() {
        let {selectedTable} = this.state
        let style = {marginTop: '15px'}
        let tableButts = this.props.tables.map((table, i) => {
            const {table_id, table_image, table_name} = table
            return <TableSelector key={table_id} index={i} buttFunc={this.selectTable} class={this.state.selectedTable === i && 'select'} title={table_name} style={{...style, backgroundImage: `url(${table_image ? table_image : 'https://png.pngtree.com/png_detail/18/09/10/pngtree-brown-wooden-table-png-clipart_1926718.jpg'})`}}/>
        })
        return (
            <div className='tables-bar'>
                <DisplayBarTop index={selectedTable} className='selector' ></DisplayBarTop>
                <CurveTop index={selectedTable} className='selector top'></CurveTop>
                {this.props.tables[0] &&
                    <div className='tableButts'>
                        {tableButts}
                        
                        <h4 className='line-break'>________</h4>
                    </div>
                }

                <Button buttFunc={this.props.addTable} class='tableButts' title='Add new Table' style={style}>+</Button>
                <CurveBottom index={selectedTable} className='selector bottom'></CurveBottom>
                <DisplayBarBottom index={selectedTable} className='selector'></DisplayBarBottom>

                <div className='side-color'></div>
            </div>
        )
    }
}


const mapStateToProps = state => ({...state.tableReducer, user: state.userReducer.user})

export default connect(mapStateToProps, {getTables, addTable})(TableBar)