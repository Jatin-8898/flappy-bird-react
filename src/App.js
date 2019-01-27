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

		var towers = [
			{position:3, height:5, upright:false},
			{position:7, height:8, upright:true},
			{position:10, height:7, upright:false},
			{position:14, height:9, upright:true},
			{position:18, height:3, upright:false},
			{position:22, height:5, upright:true},
			{position:26, height:8, upright:false},
			{position:29, height:9, upright:true},
		]

		this.state = {
			grid:grid, 
			bird:bird,
			towers:towers,
			crashed:false
		};

		this.timerID = setInterval(() => {
			if(this.state.crashed){
				return;
			}

			/* We just created a fresh new grid here and incremented the bird height by 1  */
			var gridCopy = [];
			for(let i=0; i<20; i++){
				gridCopy.push(new Array(30).fill('red'));
			}

			/* For generating the towers */
			var towersCopy = this.state.towers.slice();
			for(let i=0; i<towers.length; i++){
				for(let j=0; j < towersCopy[i].height; j++){
					if(towersCopy[i].upright)
						gridCopy[19-j][towersCopy[i].position] = 'blue';
					else
						gridCopy[j][towersCopy[i].position] = 'blue';
				}
			}

			/* For moving the towers one step behind feels like towers r moving ahead */
			for(let i=0; i<towersCopy.length; i++){
				towersCopy[i].position--;
				if(towersCopy[i].position < 0){ //if it goes behind the left side pop back to right side
					towersCopy[i].position = 29;
					/* Lets randomize the tower height and get min height of 3 */
					towersCopy[i].height = Math.floor(Math.random()*7) + 3;
				}
			}

			

			var birdCopy = this.state.bird;
			birdCopy.height++;

			var crashed  = false;

			/* If it goes above or below the screen */
			if(birdCopy.height > 19 || birdCopy.height < 0){
				birdCopy.height = 10;
				crashed = true;
			}

			for(let i=0; i< 20; i++){
				/* Coz bird is always in 2 col && if height matches collision is there */
				if(gridCopy[i][2] == 'blue' && birdCopy.height == i){
					birdCopy.height = 10;
					crashed  = true;
				}
			}

			if(crashed){
				this.setState({
					crashed:true
				})
			}

			gridCopy[birdCopy.height][birdCopy.position] = 'yellow'
			
			this.setState({
				grid:gridCopy,
				bird:birdCopy,
				towers:towersCopy
			})
			
		}, 200);
	}

	handleClick(){
		if(this.state.crashed){
			return;
		}
		var birdCopy = this.state.bird;
		birdCopy.height -= 3;	//Decr by 3 beacuse it should go up 
		this.setState({bird:birdCopy});
	}

	restart(){
		this.setState({
			crashed:false
		})
	}

	render(){
		return(
			<div onClick = { this.handleClick.bind(this) } >
				<Grid grid = {this.state.grid}/>
				{this.state.crashed? <button onClick = { this.restart.bind(this) }>Click Here to Restart</button> : null}
			</div>
		);
	}
}
export default Game;
