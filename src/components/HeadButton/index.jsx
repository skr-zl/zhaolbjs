import React, { useState, useTransition, useDeferredValue } from 'react';
import '../../App.css'

function HeadButton() {
    // 使用useTransition
	const [isPending, startTransition] = useTransition();
	const [isChinese, setIsChinese] = useState(1);
	const [isEnglish, setIsEnglish] = useState(0);
	const [isOrigin, setIsOrigin] = useState(0);



	const handleChinese = () => {
		setIsChinese(1)
		setIsEnglish(0)
		setIsOrigin(0)
	}

	const handleOrigin = () => {
		startTransition(() => {
			setIsOrigin(1)
			setIsEnglish(0)
			setIsChinese(0)
		})
	}

	const constModifyEnglish = () => {
		// var r=0
		// for (let index = 0; index < 20000; index++){
		// 	r=r+1
		// 	console.log(r);
		// }
		setIsChinese(0)
		setIsEnglish(1)
		setIsOrigin(0)
	}


	const handleEnglish = () => {
			constModifyEnglish()
	}

    return (
        <div >
			<div className="transition">
				<button onClick={handleChinese} className="btn btn-danger">前端基建</button>
				<button onClick={handleEnglish} className="btn btn-danger ffdp">FFDP</button>
				<button onClick={handleOrigin} className="btn btn-danger React18New">React18新特性</button>
			</div>
			<div className="spanItems">
				<span className={isEnglish ? "spanItem" : ""} >{isEnglish ? "FFDP" : ""}</span>
				<span className={isChinese ? "spanItem" : ""}>{isChinese ? "前端基建" : ""}</span>
				{ isOrigin  ? <SlowPosts/> : null}
			</div>
        </div>
    );
}

export default HeadButton;

function SlowPost({ index }){
	let startTime = performance.now( );
	while (performance.now() - startTime < 10){
	// Do nothing for 1 ms per item to emulate extremely slow code
	}
	return (
		<li className="item">{"Reactive18-" + (index +1)}</li>
	)
}

function SlowPosts({ index }){
	const data = [];
	var r=0
		for (let index = 0; index < 300; index++){
			r=r+1
			data.push(r);
		}
	return (
		<ul className='ulItem'>{data.map( (item,index) => <SlowPost index={index} key={index}/>)} </ul>
	)
} 