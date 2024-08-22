## React 18新特性

### 1. Render API

为了更好的管理`root节点`，`React 18` 引入了一个新的 `root API`，新的 `root API` 还支持并发模式的渲染，它允许用户进入`concurrent mode`（并发模式）。

```tsx
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')!;

ReactDOM.render(<App />, root);

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(<App />);
```

### 2. setState 自动批处理

`React 18` 通过在默认情况下执行批处理来实现了开箱即用的性能改进。

批处理是指为了获得更好的性能，在数据层，将`多个状态更新`批量处理，合并成`一次更新`（在视图层，将`多个渲染`合并成`一次渲染`）。

	#### 2.1 在 React 18之前：

在`React 18之前`，我们只在 `React 事件处理函数` 中进行批处理更新。默认情况下，在`promise`、`setTimeout`、`原生事件处理函数`中、或`任何其它事件内`的更新都不会进行批处理：

 ```tsx
 // 情况一：React 事件处理函数
 
 import React, { useState } from 'react';
 
 // React 18 之前
 const App: React.FC = () => {
   console.log('App组件渲染了！');
   const [count1, setCount1] = useState(0);
   const [count2, setCount2] = useState(0);
   return (
     <button
       onClick={() => {
         setCount1(count => count + 1);
         setCount2(count => count + 1);
         // 在React事件中被批处理
       }}
     >
       {`count1 is ${count1}, count2 is ${count2}`}
     </button>
   );
 };
 
 export default App;
 
 //情况二：setTimeout
 
 import React, { useState } from 'react';
 
 // React 18 之前
 const App: React.FC = () => {
   console.log('App组件渲染了！');
   const [count1, setCount1] = useState(0);
   const [count2, setCount2] = useState(0);
   return (
     <div
       onClick={() => {
         setTimeout(() => {
           setCount1(count => count + 1);
           setCount2(count => count + 1);
         });
         // 在 setTimeout 中不会进行批处理
       }}
     >
       <div>count1： {count1}</div>
       <div>count2： {count2}</div>
     </div>
   );
 };
 
 export default App;
 
 // 情况三：原生js事件
 
 import React, { useEffect, useState } from 'react';
 
 // React 18 之前
 const App: React.FC = () => {
   console.log('App组件渲染了！');
   const [count1, setCount1] = useState(0);
   const [count2, setCount2] = useState(0);
   useEffect(() => {
     document.body.addEventListener('click', () => {
       setCount1(count => count + 1);
       setCount2(count => count + 1);
     });
     // 在原生js事件中不会进行批处理
   }, []);
   return (
     <>
       <div>count1： {count1}</div>
       <div>count2： {count2}</div>
     </>
   );
 };
 
 export default App;
 ```

在情况一，中渲染次数和更新次数是一样的，即使我们更新了两个状态，每次更新组件也只渲染一次；在情况二、三中，每次点击更新两个状态，组件都会渲染两次，不会进行批量更新。

#### 2.2 在 React 18中：

在 `React 18` 上面的三个例子只会有一次 `render`，因为所有的更新都将自动批处理。

### 总结：

- 在 `React 18` 之前，只有在react事件处理函数中，才会自动执行批处理，其它情况会多次更新
- 在 `React 18` 之后，任何情况都会自动执行批处理，多次更新始终合并为一次

### 3. Concurrent（并发） 模式

`Concurrent` 模式是一组 `React` 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整，该模式通过使渲染可中断来修复阻塞渲染限制。在 `Concurrent` 模式中，`React` 可以同时更新多个状态。

通常，当我们更新 `state` 的时候，我们会期望这些变化立刻反映到屏幕上。我们期望应用能够持续响应用户的输入，这是符合常理的。但是，有时我们会期望更新延迟响应在屏幕上。在 `React` 中实现这个功能在之前是很难做到的。`Concurrent` 模式提供了一系列的新工具使之成为可能。

#### 3.1 Transition

在 `React 18` 中，引入的一个新的 API `startTransition`，主要为了能在大量的任务下也能保持 UI 响应。这个新的 API 可以通过将特定更新标记为“过渡”来显着改善用户交互。

```js
import { startTransition } from 'react';

// 紧急：显示输入的内容
setInputValue(input);

// 标记回调函数内的更新为非紧急更新
startTransition(() => {
  setSearchQuery(input);
});

```

简单来说，就是被 `startTransition` 回调包裹的 `setState` 触发的渲染被标记为不紧急渲染，这些渲染可能被其他紧急渲染所抢占。

一般情况下，我们需要通知用户后台正在工作。为此提供了一个带有 `isPending` 转换标志的 `useTransition`，`React` 将在状态转换期间提供视觉反馈，并在转换发生时保持浏览器响应。

该 `isPending` 值在转换挂起时为 `true`，这时可以在页面中放置一个加载器。

普通情况下：

![5.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a25327e5f6a4ff2a4a509adf4165477~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

使用 `useTransition` 表现：

![6.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d8f5d745d4d4b37a24bea01e0f47129~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们可以使用 `startTransition` 包装任何要移至后台的更新，通常，这些类型的更新分为两类：

1. **渲染缓慢**：这些更新需要时间，因为 `React` 需要执行大量工作才能转换 UI 以显示结果
2. **网络慢**：这些更新需要时间，因为 `React` 正在等待来自网络的一些数据。这个方式与 `Suspense` 紧密集成

网络慢场景：一个列表页，当我们点击 “下一页”，现存的列表立刻消失了，然后我们看到整个页面只有一个加载提示。可以说这是一个“不受欢迎”的加载状态。**如果我们可以“跳过”这个过程，并且等到内容加载后再过渡到新的页面，效果会更好**。

##### 3.1.1 把 `Transition` 融合到应用的设计系统

`useTransition` 是非常常见的需求。几乎所有可能导致组件挂起的点击或交互操作都需要使用 `useTransition`，以避免意外隐藏用户正在交互的内容。

这可能会导致组件存在大量重复代码。通常**建议把 `useTransition` 融合到应用的设计系统组件中**。例如，我们可以把 `useTransition` 逻辑抽取到我们自己的 `<Button>` 组件：

```js
function Button({ children, onClick }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      onClick();
    });
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      {children} {isPending ? '加载中' : null}
    </button>
  );
}
```

#### 3.2 useDeferredValue

返回一个延迟响应的值，这通常用于在具有基于用户输入立即渲染的内容，以及需要等待数据获取的内容时，保持接口的可响应性。

```js
import { useDeferredValue } from 'react';

const deferredValue = useDeferredValue(value);
```

从介绍上来看 `useDeferredValue` 与 `useTransition` 是否感觉很相似呢？

- 相同：`useDeferredValue` 本质上和内部实现与 `useTransition` 一样都是标记成了延迟更新任务。
- 不同：`useTransition` 是把更新任务变成了延迟更新任务，而 `useDeferredValue` 是产生一个新的值，这个值作为延时状态。