# React 学习代码与笔记
## 描述UI
### 定义组件
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
### 导入导出组件
为了减少在默认导出和具名导出之间的混淆，一些团队会选择只使用一种风格（默认或者具名），或者禁止在单个文件内混合使用。这因人而异，选择最适合你的即可！

### 使用JSX
为什么使用 JSX？
随着 Web 的交互性越来越强，逻辑越来越决定页面中的内容，在 React 中，渲染逻辑和标签共同存在于同一个地方——组件。
这只是一种语法 与React 是独立的

#### 将 HTML 转化为 JSX 
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
### JSX 规则
1. 只能返回一个根元素
    - 如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来。
    - 如果你不想在标签中增加一个额外的 `<div>`，可以用 `<>` 和 `</>` 元素来代替：这个空标签被称作 Fragment。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。
    - 为什么多个 JSX 标签需要被一个父元素包裹？
      - JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。

2. 标签必须闭合
   JSX 要求标签必须正确闭合。像 `<img>` 这样的自闭合标签必须书写成 `<img />`，而像 `<li>oranges` 这样只有开始标签的元素必须带有闭合标签，需要改为 `<li>oranges</li>`

3.  使用驼峰式命名法给大部分属性命名！
    JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。但 JavaScript 对变量的命名有限制。例如，变量名称不能包含 - 符号或者像 class 这样的保留字。 这就是为什么在 React 中，大部分 HTML 和 SVG 属性都用驼峰式命名法表示。例如，需要用 strokeWidth 代替 stroke-width。由于 class 是一个保留字，所以在 React 中需要用 className 来代替。这也是 DOM 属性中的命名
注意:由于历史原因，`aria-*` 和 `data-*` 属性是以带 - 符号的 HTML 格式书写的。

4. 使用 [JSX 转化器](https://transform.tools/html-to-jsx)