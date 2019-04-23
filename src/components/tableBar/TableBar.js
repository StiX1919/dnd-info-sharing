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
    height: calc( 100% - ${props => 80 + (props.index * 67)}px);
    /* height: 100% */
    position: inherit;
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
    margin-bottom: calc( ${props => (65 * (props.total + 1))}px - 70px - ${props => 55 + (props.index * 67)}px);
    /* margin-bottom: 100% */
    /* position: inherit; */
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
        console.log(document.getElementsByClassName('new-table-holder'))
        let {selectedTable} = this.state
        let style = {marginTop: '15px'}
        let tableButts = this.props.tables.map((table, i, arr) => {
            // if(i === arr.length - 1){
            //     style = {...style, marginBottom: '15px'}
            // }
            const {table_id, table_image, table_name} = table
            return <TableSelector key={table_id} index={i} buttFunc={this.selectTable} class={this.state.selectedTable === i && 'select'} title={table_name} style={{...style, zIndex: 1, backgroundImage: `url(${table_image ? table_image : 'https://png.pngtree.com/png_detail/18/09/10/pngtree-brown-wooden-table-png-clipart_1926718.jpg'})`}}/>
        })
        return (
            <div className={this.props.tables[0] ? 'tables-bar' : 'tables-bar empty'}>
                {this.props.tables[0] &&
                    <div className='tableButts'>
                        <div className='fancy-side-bar'>
                            {tableButts}
                            <DisplayBarTop index={selectedTable} className='selector' ></DisplayBarTop>
                            <CurveTop index={selectedTable} className='selector top'></CurveTop>
                            <div className="bottom-holder">
                                <CurveBottom index={selectedTable} total={this.props.tables.length} className='selector bottom'></CurveBottom>
                                <DisplayBarBottom index={selectedTable}  className='selector'></DisplayBarBottom>
                            </div>
                            <div className='side-color'></div>
                        </div>


                    </div>
                }



                <div className='new-table-holder'>
                    <h4 className='line-break'>________</h4>
                    <Button buttFunc={this.props.addTable}  title='Add new Table' style={style}>+</Button>
                </div>
                
            </div>
        )
    }
}


const mapStateToProps = state => ({...state.tableReducer, user: state.userReducer.user})

export default connect(mapStateToProps, {getTables, addTable})(TableBar)