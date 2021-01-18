import React from 'react'

export default class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: true,
            count: 0,
            list: ['a','b','c']
        }
    }

    render () {
        return (
            <>
                {
                    this.state.isShow ? <div>你好 {this.state.count}</div> : null
                }
                <ul>
                   {
                        this.state.list.map(item => {
                        return (
                            <li key={item}>{item}</li>
                        )
                    })
                   }
                </ul>
            </>
            
        )
    }

    componentDidMount() {
        // this.state.isShow = !this.state.isShow
        // this.setState({})

        // this.setState({
        //     isShow: !this.state.isShow
        // })

        // setTimeout(() => {
        //     this.setState(prevState => {
        //         return {
        //             isShow: !prevState.isShow,
        //             count: prevState.count + 1
        //         }
        //     })
        // }, 3000)

        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        }, () => {
            console.log(document.querySelector('#root').innerHTML)
        })
        console.log(document.querySelector('#root').innerHTML + "1111111")
        
    }
}

// export default class StateClass extends React.Component {
//     state = {
//         isShow: true
//     }
//     render() {
//         return (
//             <>
//                 {
//                     this.state.isShow && <div>helle</div>
//                 }
//             </>
//         )
//     }
// } 