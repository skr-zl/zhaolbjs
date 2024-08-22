import React, { useState, useEffect, useTransition, useDeferredValue } from 'react';
import Header from './components/Head/index.jsx'; // 假设Header是一个函数组件或类组件
import List from './components/List/index.jsx'; // 假设List是一个函数组件或类组件
import Footer from './components/Footer/index.jsx'; // 假设Footer是一个函数组件或类组件
import HeadButton from './components/HeadButton/index.jsx'; // 假设HeadButton是一个函数组件或类组件
import './App.css';
import {touristRoutes} from './mocks/handlers.js';

function App() {
    // 初始化状态
    const [todos, setTodos] = useState([
        { id: '001', name: '理财通用组件梳理', done: true },
        { id: '002', name: '前端开发IDE以及插件调研', done: true },
        { id: '003', name: 'React17,18版本比较', done: false },
        { id: '004', name: 'wasm加密调研', done: false }
    ]);
	const deferredtodos = useDeferredValue(todos);

    // 使用useTransition
    const [isPending, startTransition] = useTransition();


	useEffect(() => {
		fetch('/api/touristRoutes/56oXedy54Ze4P9bUmktRM').then(async res => {
		  console.log(res)
		  if (res.ok) {
			const data = await res.json()
			console.log(data)
		  }
		})
	  }, [])

    // addTodo用于添加一个todo
    const addTodo = (todoObj) => {
        const newTodos = [todoObj, ...todos];
        startTransition(() => {
            setTodos(newTodos);
        });
    };

    // updateTodo用于更新一个todo对象
    const updateTodo = (id, done) => {
        const newTodos = todos.map(todoObj => {
            if (todoObj.id === id) return { ...todoObj, done };
            return todoObj;
        });
        setTodos(newTodos);
    };

    // deleteTodo用于删除一个todo对象
    const deleteTodo = (id) => {
        const newTodos = todos.filter(todoObj => todoObj.id !== id);
        setTodos(newTodos);
    };

    // checkAllTodo用于全选
    const checkAllTodo = (done) => {
        const newTodos = todos.map(todoObj => ({ ...todoObj, done }));
        startTransition(() => {
            setTodos(newTodos);
        });
    };

    // clearAllDone用于清除所有已完成的
    const clearAllDone = () => {
        const newTodos = todos.filter(todoObj => !todoObj.done);
        setTodos(newTodos);
    };


    return (
        <div className="todo-container">
			<HeadButton/>
            <div className="todo-wrap">
                <Header addTodo={addTodo} />
                <List todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                <Footer todos={deferredtodos} checkAllTodo={checkAllTodo} clearAllDone={clearAllDone} />
				{isPending && <div>正在更新...</div>}
            </div>
        </div>
    );
}

export default App;