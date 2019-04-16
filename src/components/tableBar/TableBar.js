import React, {Component} from 'react'
import {connect} from 'react-redux'

import TableModel from './TableModel'
import Button from '../toolComponents/Button'
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
        return (
            <div className='tables-bar'>
                {this.props.tables[0] &&
                    <div>
                        <Button style={style}/>
                        
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