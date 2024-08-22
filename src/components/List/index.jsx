import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'
import { useState } from 'react'
 
export default class List extends Component {
 
	//对接收的props进行：类型、必要性的限制
	static propTypes = {
		todos:PropTypes.array.isRequired,
		updateTodo:PropTypes.func.isRequired,
		deleteTodo:PropTypes.func.isRequired,
	}
	componentDidUpdate(prevProps) {
		// if (prevProps.todos !== this.props.todos) {
		// 	let k = 0;
		// 	for (let i = 0; i <= 2000000000; i += 1) {
		// 	  k = i;
		// 	}
		// }
	  }
	render() {
		const {todos,updateTodo,deleteTodo} = this.props
		return (
			<ul className="todo-main">
				{
					todos.map( todo =>{
						return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
					})
				}
			</ul>
		)
	}
}