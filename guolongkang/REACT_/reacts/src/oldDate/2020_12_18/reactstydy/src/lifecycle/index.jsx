import React from 'react'
/**
 * 只有类组件才有生命周期函数，类组件没有
 */
export default class LifeCycle extends React.Component {
    // 最先执行， 只执行一次， 一定会执行
    constructor(props) {
        super(props)
        this.state = {
            name: 'liming'
        }
    }
    // mounting 即将在18.x废弃此钩子 建议添加 UNSAFE_ 前缀使用
    // componentWillMount() {}
    UNSAFE_ponentWillMount() {
        console.log(11111)
    }
    shouldComponentUpdate(nextProps, nextstate) {
        // 判断 component 是否需要重新渲染
        // 如果使用PureComponent来创建组件这个钩子最好不要使用了
        return false
    }
    //componentWillUpdate() {}

    static getDerivedStateFromProps(props, state) {
        // getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
        return null
    }
    getSnapshotBeforeUpdate() {
        return null
    }
    componentDidUpdate() {}

    render () {
        // 父组件的 render 执行 则子组件的 render 一定会执行
        return (
            <div>
                Life Cycle Component
            </div>
        )
    }
    // 渲染完成后执行
    componentDidMount() {}

    // updating 即将在18.x废弃此钩子 建议添加 UNSAFE_ 前缀使用
    // componentWillReceiveProps() {}
    // 17.x的严格模式下已经不能使用这个钩子
    // UNSAFE_componentWillReceiveProps() {}
    //componentWillReceiveProps() {
        // 只有当传过来的数据发生变化 才会触发这个钩子
        //console.log(3333)
    //}
    // 组件将要remove时调用
    componentWillUnmount() {}
    
}