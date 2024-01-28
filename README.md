# 阅读 React 文档笔记
## 定义组件
React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数。
```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}

```
注意：
- 没有括号包裹的话，任何在 return 下一行的代码都 将被忽略！
- 组件可以渲染其他组件，但是 请不要嵌套他们的定义
## 导入导出组件
为了减少在默认导出和具名导出之间的混淆，一些团队会选择只使用一种风格（默认或者具名），或者禁止在单个文件内混合使用。这因人而异，选择最适合你的即可！

## 使用JSX
为什么使用 JSX？
随着 Web 的交互性越来越强，逻辑越来越决定页面中的内容，在 React 中，渲染逻辑和标签共同存在于同一个地方——组件。
这只是一种语法 与React 是独立的

### 将 HTML 转化为 JSX 
```html
<h1>海蒂·拉玛的待办事项</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>发明一种新式交通信号灯
    <li>排练一个电影场景
    <li>改进频谱技术
</ul>
```
```js
export default function TodoList() {
  return (
    <>
    <h1>海蒂·拉玛的待办事项</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    />
    <ul>
      <li>发明一种新式交通信号灯</li>
      <li>排练一个电影场景</li>
      <li>改进频谱技术</li>
    </ul>
    </>
  );
}

```
## JSX 规则
1. 只能返回一个根元素
    如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来。

    如果你不想在标签中增加一个额外的 `<div>`，可以用 `<>` 和 `</>` 元素来代替：
    这个空标签被称作 Fragment。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。

    为什么多个 JSX 标签需要被一个父元素包裹？
      
      JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。

2. 标签必须闭合
   JSX 要求标签必须正确闭合。

   像 `<img>` 这样的自闭合标签必须书写成 `<img />`

   像 `<li>oranges` 这样只有开始标签的元素必须带有闭合标签，需要改为 `<li>oranges</li>`

3.  使用驼峰式命名法给大部分属性命名！
    JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。
    
    在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。但 JavaScript 对变量的命名有限制。例如，变量名称不能包含 - 符号或者像 class 这样的保留字。 

    这就是为什么在 React 中，大部分 HTML 和 SVG 属性都用驼峰式命名法表示。例如，需要用 strokeWidth 代替 stroke-width。由于 class 是一个保留字，所以在 React 中需要用 className 来代替。这也是 DOM 属性中的命名。

    注意:由于历史原因，`aria-*` 和 `data-*` 属性是以带 - 符号的 HTML 格式书写的。

4. 使用 [JSX 转化器](https://transform.tools/html-to-jsx)

5. 在 JSX 中通过大括号使用 JavaScript
    JSX 引号内的值会作为字符串传递给属性。

    大括号让你可以将 JavaScript 的逻辑和变量带入到标签中。

    它们会在 JSX 标签中的内容区域或紧随属性的 = 后起作用。

    {{  }} 并不是什么特殊的语法：它只是包在 JSX 大括号内的 JavaScript 对象

## 将 Props 传递给组件
向组件传递 props
在这段代码中， Profile 组件没有向它的子组件 Avatar 传递任何 props ：
```jsx
export default function Profile() {
  return (
    <Avatar />
  );
}
```
你可以分两步给 Avatar 一些 props。

### 步骤 1: 将 props 传递给子组件 
```jsx
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```
这里的 {{}} 里面的内容会被解析成 JavaScript 对象，并作为 props 传递给 Avatar 组件。

### 步骤 2: 在子组件中使用这些 props
```jsx
function Avatar({ person, size }) {
  //在这里 person, size 是可访问的
}
```
props 正是 组件的唯一参数！ React 组件函数接受一个参数，一个 props 对象
通常你不需要整个 props 对象，所以可以将它解构为单独的 props。

### 给 prop 指定一个默认值
```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```
默认值仅在缺少 size prop 或 size={undefined} 时生效。 但是如果你传递了 size={null} 或 size={0}，默认值将 不 被使用。

### 使用 JSX 展开语法传递 props 
有时候，传递 props 会变得非常重复：
```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```
重复代码没有错（它可以更清晰）。但有时你可能会重视简洁。一些组件将它们所有的 props 转发给子组件，正如 Profile 转给 Avatar 那样。因为这些组件不直接使用他们本身的任何 props，所以使用更简洁的“展开”语法是有意义的：
```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```
**请克制地使用展开语法。** 如果你在所有其他组件中都使用它，那就有问题了。 通常，它表示你应该拆分组件，并将子组件作为 JSX 传递。 接下来会详细介绍！

## 条件渲染
```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```
## 列表渲染
```jsx
export default function Gallery() {
  const arr = [
    {
      src: "https://i.imgur.com/MK3eW3As.jpg",
      alt: "Katherine Johnson"
    },
    {
      src: "https://i.imgur.com/MK3eW3As.jpg",
      alt: "Katherine Johnson"
    },
    {
      src: "https://i.imgur.com/MK3eW3As.jpg",
      alt: "Katherine Johnson"
    },
    {
      src: "https://i.imgur.com/MK3eW3As.jpg",
      alt: "Katherine Johnson"
    }
  ]
  const profiles = arr.map(({src, alt}, index) => <Profile src={src} key={index} alt={alt}/>);
  return (
    <section>
      {profiles}
    </section>
  );
}

export function Profile({src, alt}) {
  return (
    <>
      <img
        src={src}
        alt={alt}
      />
    </>
  );
}
```
key 应该放到最外层
```jsx
import { recipes } from "./data.js";

export default function RecipeList() {
  let items = recipes.map(({ id, name, ingredients }) => {
    let lis = ingredients.map((item) => <li key={item}>{item}</li>);
    return (
      <div key={id}>
        <h2>{name}</h2>
        <ul>{lis}</ul>
      </div>
    );
  });

  return (
    <div>
      <h1>菜谱</h1>
      {items}
    </div>
  );
}
```

## 保持纯粹的组件
- 一个组件必须是纯粹的，就意味着：
    - 只负责自己的任务。 它不会更改在该函数调用前就已存在的对象或变量。
    - 输入相同，则输出相同。 给定相同的输入，组件应该总是返回相同的 JSX。
- 渲染随时可能发生，因此组件不应依赖于彼此的渲染顺序。
- 你不应该改变任何用于组件渲染的输入。这包括 props、state 和 context。通过 “设置” state 来更新界面，而不要改变预先存在的对象。
- 努力在你返回的 JSX 中表达你的组件逻辑。当你需要“改变事物”时，你通常希望在事件处理程序中进行。作为最后的手段，你可以使用 useEffect。
- 编写纯函数需要一些练习，但它充分释放了 React 范式的能力。

## 将UI视为树
- 树是表示实体之间关系的常见方式，它们经常用于建模 UI。
- 渲染树表示单次渲染中 React 组件之间的嵌套关系。
- 使用条件渲染，渲染树可能会在不同的渲染过程中发生变化。使用不同的属性值，组件可能会渲染不同的子组件。
- 渲染树有助于识别顶级组件和叶子组件。顶级组件会影响其下所有组件的渲染性能，而叶子组件通常会频繁重新渲染。识别它们有助于理解和调试渲染性能问题。
- 依赖树表示 React 应用程序中的模块依赖关系。
- 构建工具使用依赖树来捆绑必要的代码以部署应用程序。
- 依赖树有助于调试大型捆绑包带来的渲染速度过慢的问题，以及发现哪些捆绑代码可以被优化。

## 响应事件 
- 你可以通过将函数作为 prop 传递给元素如 `<button>` 来处理事件。
- 必须传递事件处理函数，而非函数调用！ onClick={handleClick} ，不是 onClick={handleClick()}。
- 你可以单独或者内联定义事件处理函数。
- 事件处理函数在组件内部定义，所以它们可以访问 props。
- 你可以在父组件中定义一个事件处理函数，并将其作为 prop 传递给子组件。
- 你可以根据特定于应用程序的名称定义事件处理函数的 prop。
- 事件会向上传播。通过事件的第一个参数调用 e.stopPropagation() 来防止这种情况。
- 事件可能具有不需要的浏览器默认行为。调用 e.preventDefault() 来阻止这种情况。
- 从子组件显式调用事件处理函数 prop 是事件传播的另一种优秀替代方案。

## state
- 当一个组件需要在多次渲染间“记住”某些信息时使用 state 变量。
- State 变量是通过调用 useState Hook 来声明的。
- Hook 是以 use 开头的特殊函数。它们能让你 “hook” 到像 state 这样的 React 特性中。
- Hook 可能会让你想起 import：它们需要在非条件语句中调用。调用 Hook 时，包括 useState，仅在组件或另一个 Hook 的顶层被调用才有效。
- useState Hook 返回一对值：当前 state 和更新它的函数。
- 你可以拥有多个 state 变量。在内部，React 按顺序匹配它们。
- State 是组件私有的。如果你在两个地方渲染它，则每个副本都有独属于自己的 state。

Hook 只能在组件函数的顶层调用。这里，第一个 isSent 定义遵循这个规则，但是 message 的定义位于一个条件语句中。
保证对 Hook 的所有调用都发生在第一个 return 前，这很重要
```jsx
import { useState } from "react";

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    // eslint-disable-next-line
    const [message, setMessage] = useState("");
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Sending: "${message}"`);
          setIsSent(true);
        }}
      >
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}

```
## state 如同一张快照
- 设置 state 请求一次新的渲染。
- React 将 state 存储在组件之外，就像在架子上一样。
- 当你调用 useState 时，React 会为你提供该次渲染 的一张 state 快照。
- 变量和事件处理函数不会在重渲染中“存活”。每个渲染都有自己的事件处理函数。
- 每个渲染（以及其中的函数）始终“看到”的是 React 提供给这个 渲染的 state 快照。
- 你可以在心中替换事件处理函数中的 state，类似于替换渲染的 JSX。
- 过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值。

** React 会等到事件处理函数中的 所有 代码都运行完毕再处理你的 state 更新。**

## 为什么在 React 中不推荐直接修改 state？ 
有以下几个原因：

- 调试：如果你使用 console.log 并且不直接修改 state，你之前日志中的 state 的值就不会被新的 state 变化所影响。这样你就可以清楚地看到两次渲染之间 state 的值发生了什么变化
- 优化：React 常见的 优化策略 依赖于如果之前的 props 或者 state 的值和下一次相同就跳过渲染。如果你从未直接修改 state ，那么你就可以很快看到 state 是否发生了变化。如果 prevObj === obj，那么你就可以肯定这个对象内部并没有发生改变。
- 新功能：我们正在构建的 React 的新功能依赖于 state 被 像快照一样看待 的理念。如果你直接修改 state 的历史版本，可能会影响你使用这些新功能。
- 需求变更：有些应用功能在不出现任何修改的情况下会更容易实现，比如实现撤销/恢复、展示修改历史，或是允许用户把表单重置成某个之前的值。这是因为你可以把 state 之前的拷贝保存到内存中，并适时对其进行再次使用。如果一开始就用了直接修改 state 的方式，那么后面要实现这样的功能就会变得非常困难。
- 更简单的实现：React 并不依赖于 mutation ，所以你不需要对对象进行任何特殊操作。它不需要像很多“响应式”的解决方案一样去劫持对象的属性、总是用代理把对象包裹起来，或者在初始化时做其他工作。这也是为什么 React 允许你把任何对象存放在 state 中——不管对象有多大——而不会造成有任何额外的性能或正确性问题的原因。
- 在实践中，你经常可以“侥幸”直接修改 state 而不出现什么问题，但是我们强烈建议你不要这样做，这样你就可以使用我们秉承着这种理念开发的 React 新功能。未来的贡献者甚至是你未来的自己都会感谢你的！

## 更新 state 中的对象
- 将 React 中所有的 state 都视为不可直接修改的。
- 当你在 state 中存放对象时，直接修改对象并不会触发重渲染，并会改变前一次渲染“快照”中 state 的值。
- 不要直接修改一个对象，而要为它创建一个 新 版本，并通过把 state 设置成这个新版本来触发重新渲染。
- 你可以使用这样的 {...obj, something: 'newValue'} 对象展开语法来创建对象的拷贝。
- 对象的展开语法是浅层的：它的复制深度只有一层。
- 想要更新嵌套对象，你需要从你更新的位置开始自底向上为每一层都创建新的拷贝。
- 想要减少重复的拷贝代码，可以使用 Immer。
## 更新 state 中的数组
- 你可以把数组放入 state 中，但你不应该直接修改它。
- 不要直接修改数组，而是创建它的一份 新的 拷贝，然后使用新的数组来更新它的状态。
- 你可以使用 [...arr, newItem] 这样的数组展开语法来向数组中添加元素。
- 你可以使用 filter() 和 map() 来创建一个经过过滤或者变换的数组。
- 你可以使用 Immer 来保持代码简洁。

## 使用 context 深层传递参数
- Context 使组件向其下方的整个树提供信息。
- 传递 Context 的方法:
  1. 通过 export const MyContext = createContext(defaultValue) 创建并导出 context。
  2. 在无论层级多深的任何子组件中，把 context 传递给 useContext(MyContext) Hook 来读取它。
  3. 在父组件中把 children 包在 <MyContext.Provider value={...}> 中来提供 context。
- Context 会穿过中间的任何组件。
- Context 可以让你写出 “较为通用” 的组件。
- 在使用 context 之前，先试试传递 props 或者将 JSX 作为 children 传递。

## 使用 ref 引用值
当你希望组件“记住”某些信息，但又不想让这些信息 触发新的渲染 时，你可以使用 ref 。
- ref 是一种脱围机制，用于保留不用于渲染的值。 你不会经常需要它们。
- ref 是一个普通的 JavaScript 对象，具有一个名为 current 的属性，你可以对其进行读取或设置。
- 你可以通过调用 useRef Hook 来让 React 给你一个 ref。
- 与 state 一样，ref 允许你在组件的重新渲染之间保留信息。
- 与 state 不同，设置 ref 的 current 值不会触发重新渲染。
- 不要在渲染过程中读取或写入 ref.current。这使你的组件难以预测。

## 使用ref 操作DOM
- Refs 是一个通用概念，但大多数情况下你会使用它们来保存 DOM 元素。
- 你通过传递 <div ref={myRef}> 指示 React 将 DOM 节点放入 myRef.current。
- 通常，你会将 refs 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素。
- 默认情况下，组件不暴露其 DOM 节点。 您可以通过使用 forwardRef 并将第二个 ref 参数传递给特定节点来暴露 DOM 节点。
- 避免更改由 React 管理的 DOM 节点。
- 如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分

## 使用Effect 同步
```jsx
function MyComponent() {
  useEffect(() => {
    // 每次渲染后都会执行此处的代码
  });
  return <div />;
}
```
useEffect 会把这段代码放到屏幕更新渲染之后执行。

一般来说，Effect 会在  每次 渲染后执行，而以下代码会陷入死循环中：
```jsx
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
```
## 指定 Effect 依赖

一般来说，Effect 会在 每次 渲染时执行。但更多时候，并不需要每次渲染的时候都执行 Effect。
    - 有时这会拖慢运行速度。因为与外部系统的同步操作总是有一定时耗，在非必要时可能希望跳过它。例如，没有人会希望每次用键盘打字时都重新连接聊天服务器。
    - 有时这会导致程序逻辑错误。例如，组件的淡入动画只需要在第一轮渲染出现时播放一次，而不是每次触发新一轮渲染后都播放。
为了演示这个问题，我们在前面的示例中加入一些 console.log 语句和更新父组件 state 的文本输入。请注意键入是如何导致 Effect 重新运行的：

将 依赖数组 传入 useEffect 的第二个参数，以告诉 React 跳过不必要地重新运行 Effect。在上面示例的第 14 行中传入一个空数组 []：
```jsx
  useEffect(() => {
    // ...
  }, []);
```
你会发现 React 报错：React Hook useEffect has a missing dependency: 'isPlaying'：
```jsx
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('调用 video.play()');
      ref.current.play();
    } else {
      console.log('调用 video.pause()');
      ref.current.pause();
    }
  }, []); // 这将产生错误

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```
问题出现在 Effect 中使用了 isPlaying prop 以控制逻辑，但又没有直接告诉 Effect 需要依赖这个属性。为了解决这个问题，将 isPlaying 添加至依赖数组中：
```jsx
  useEffect(() => {
    if (isPlaying) { // isPlaying 在此处使用……
      // ...
    } else {
      // ...
    }
  }, [isPlaying]); // ……所以它必须在此处声明！
```
指定 [isPlaying] 会告诉 React，如果 isPlaying 在上一次渲染时与当前相同，它应该跳过重新运行 Effect。

没有依赖数组作为第二个参数，与依赖数组位空数组 [] 的行为是不一致的：
```jsx
useEffect(() => {
  // 这里的代码会在每次渲染后执行
});

useEffect(() => {
  // 这里的代码只会在组件挂载后执行
}, []);

useEffect(() => {
  //这里的代码只会在每次渲染后，并且 a 或 b 的值与上次渲染不一致时执行
}, [a, b]);
```

## 为什么依赖数组中可以省略 ref?
下面的 Effect 同时使用了 ref 与 isPlaying prop，但是只有 isPlaying 被声明为了依赖项：
```jsx
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
}
```
这是因为 ref 具有 稳定 的标识：React 保证 每轮渲染中调用 useRef 所产生的引用对象时，获取到的对象引用总是相同的，即获取到的对象引用永远不会改变，所以它不会导致重新运行 Effect。因此，依赖数组中是否包含它并不重要。当然也可以包括它，这样也可以：
```jsx
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying, ref]);
  }
```
useState 返回的 set 函数 也有稳定的标识符，所以也可以把它从依赖数组中忽略掉。如果在忽略某个依赖项时 linter 不会报错，那么这么做就是安全的。

但是，仅在 linter 可以“看到”对象稳定时，忽略稳定依赖项的规则才会起作用。例如，如果 ref 是从父组件传递的，则必须在依赖项数组中指定它。这样做是合适的，因为无法确定父组件是否始终是传递相同的 ref，或者可能是有条件地传递几个 ref 之一。因此，你的 Effect 将取决于传递的是哪个 ref。

## 按需添加清理（cleanup）函数 

```jsx
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []);
```
每次重新执行 Effect 之前，React 都会调用清理函数；组件被卸载时，也会调用清理函数。让我们看看执行清理函数会做些什么：
某些 API 可能不允许连续调用两次。例如，内置的 <dialog> 元素的 showModal 方法在连续调用两次时会抛出异常，此时实现清理函数并使其关闭对话框：
```jsx
useEffect(() => {
  const dialog = dialogRef.current;
  dialog.showModal();
  return () => dialog.close();
}, []);
```
在开发环境中，Effect 将调用 showModal()，然后立即调用 close()，然后再次调用 showModal()。这与调用只一次 showModal() 的效果相同。也正如在生产环境中看到的那样。

## Effect 订阅事件
如果 Effect 订阅了某些事件，清理函数应该退订这些事件：
```jsx
useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```
在开发环境中，Effect 会调用 addEventListener()，然后立即调用 removeEventListener()，然后再调用相同的 addEventListener()，这与只订阅一次事件的 Effect 等效；这也与用户在生产环境中只调用一次 addEventListener() 具有相同的感知效果。

触发动画

如果 Effect 对某些内容加入了动画，清理函数应将动画重置：

```jsx
useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // 触发动画
  return () => {
    node.style.opacity = 0; // 重置为初始值
  };
}, []);
```
摘要
- 与事件不同，Effect 是由渲染本身，而非特定交互引起的。
- Effect 允许你将组件与某些外部系统（第三方 API、网络等）同步。
- 默认情况下，Effect 在每次渲染（包括初始渲染）后运行。
- 如果 React 的所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect。
- 不能随意选择依赖项，它们是由 Effect 内部的代码决定的。
- 空的依赖数组（[]）对应于组件“挂载”，即添加到屏幕上。
- 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试。
- 如果 Effect 因为重新挂载而中断，那么需要实现一个清理函数。
- React 将在下次 Effect 运行之前以及卸载期间这两个时候调用清理函数。

## 你可能不需要使用 Effect
如何移除不必要的 Effect？
- 你不必使用 Effect 来转换渲染所需的数据
- 你不必使用 Effect 来处理用户事件

根据 props 或 state 来更新 state
如果一个值可以基于现有的 props 或 state 计算得出，不要把它作为一个 state，而是在渲染期间直接计算这个值

缓存昂贵的计算
```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 避免：多余的 state 和不必要的 Effect
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```
```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ 如果 getFilteredTodos() 的耗时不长，这样写就可以了。
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```
这会告诉 React，除非 todos 或 filter 发生变化，否则不要重新执行传入的函数。

如何判断计算是昂贵的？
一般来说只有你创建或循环遍历了成千上万个对象时才会很耗费时间。如果你想确认一下，可以添加控制台输出来测量某一段代码的执行时间：
```jsx
console.time('筛选数组');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('筛选数组');
```
useMemo 不会让 第一次 渲染变快。它只是帮助你跳过不必要的更新。
