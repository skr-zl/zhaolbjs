import React, { Component, useEffect, useState, useDeferredValue } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import './index.css'
 
function Header(props){
	const [text, setText] = useState('')
	const deferText = useDeferredValue(text)

	//监听打印
	// useEffect(() => {
	// 	console.log("deferText"+ deferText)
	// 	var r=0
	// 	for (let index = 0; index < 10000; index++){
	// 		r=r+1
	// 		console.log(r)
	// 	}
	// },[deferText])
	
	//键盘事件的回调
	const handleKeyUp = (event)=>{
		//解构赋值获取keyCode,target
		const {keyCode,target} = event
		// //判断是否是回车按键
		// if(keyCode !== 13) return
		// //添加的todo名字不能为空
		if(target.value.trim() === ''){
			// alert('输入不能为空')
			return
		}
		//准备好一个todo对象
		const todoObj = {id:nanoid(),name:target.value,done:false}
		//将todoObj传递给App
		props.addTodo(todoObj)
		//清空输入
	}
 
	return (
		<div className="todo-header">
			<input value={text} onKeyUp={handleKeyUp}  onChange={e => setText(e.target.value)}  type="text" placeholder="请输入你的任务名称，按回车键确认"/>
			<div>
				<p>{deferText}</p>
			</div>
		</div>
	)
}
export default Header;