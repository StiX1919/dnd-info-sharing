import React, { Component } from 'react';

import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import CardHolder from './CardHolder'
import InfoCard from './infoCard'
import Card from './UserCard'

import './Table.css'


class Table extends Component {
  constructor(){
    super()
    this.state = {
      players: ['spencer', 'bob', 'POe', 'StiX', 'gAfy'],
      shareInfo: ['Invisible steak bites', "he's drunk", "worth no money", "Has 11 toes"]
    }
  }

  switch = (play1, play2) => {
    let players = this.state.players.slice()
    
    players[this.state.players.indexOf(play1)] = this.state.players[this.state.players.indexOf(play2)]
    players[this.state.players.indexOf(play2)] = this.state.players[this.state.players.indexOf(play1)]
    
    console.log(players, this.state.players)

    this.setState({players})
  }


  render() {
    const {players, shareInfo} = this.state
    let leftSide = players.map((person, i) => {
      if(i === 0 || i % 2 === 0){
        return <CardHolder key={i} ogPerson={person}><Card person={person} changePlace={this.switch}/></CardHolder>
      }
    })
    let rightSide = players.map((person, i) => {
      if(i % 2 === 1){
        return <CardHolder key={i} ogPerson={person}><Card person={person} changePlace={this.switch}/></CardHolder>
      }
    })

    let infoBits = shareInfo.map((info, i) => {
      return <InfoCard key={i} info={info}/>
    })


    return (
      <div className="App">
        <div className='player'>dm</div>
        <div className='playArea'>
          <div className='seats'>
            {leftSide}
          </div>
          <div className='table'>table</div>
          <div className='seats'>
            {rightSide}
          </div>
        </div>
        {infoBits}
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(Table) ;