import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



function GridCell(){
	var style = {
		width:20,
		height:20,
		border:'1px solid black',
		backgroundColor:'red'
	} 
	return(
		<div style={style}></div>
	);

}

function GridRow(){
	return(
		<div>
			<GridCell/>
			<GridCell/>
			<GridCell/>
		</div>
	);
}

export default GridRow;
