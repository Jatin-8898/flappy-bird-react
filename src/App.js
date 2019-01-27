import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



function GridCell(props){
	var style = {
		width:20,
		height:20,
		border:'1px solid black',
		backgroundColor:props.cell
	} 
	return(
		<div style={style}></div>
	);

}

function GridRow(props){
	var style={
		display:'flex'
	}
	return(
		<div style={style}>
			{
				props.row.map( (cell)  => {
					return <GridCell cell = {cell}/>
				})
			}
		</div>
	);
}


function Grid(props){
	return(
		<div>
			{
				props.grid.map( (row) => {
					return <GridRow row = {row}/>
				})
			}
		</div>
	)
}

class Game extends React.Component{
	constructor(props){
		super(props);

		var grid = [];
		for(let i=0; i<20; i++){
			grid.push(new Array(30).fill('red'));
		}

		var bird = {
			height:10,
			position:2
		}
		grid[bird.height][bird.position] = 'yellow'

		this.state = {
			grid:grid, 
			bird:bird
		};

		this.timerID = setInterval(() => {
			var gridCopy = [];
			for(let i=0; i<20; i++){
				gridCopy.push(new Array(30).fill('red'));
			}
			var birdCopy = this.state.bird;
			birdCopy.height++;
			
			gridCopy[birdCopy.height][birdCopy.position] = 'yellow'
			
			this.setState({
				grid:gridCopy,
				bird:birdCopy
			})
		}, 200);
	}
	render(){
		return(
			<Grid grid = {this.state.grid}/>
		);
	}
}
export default Game;
