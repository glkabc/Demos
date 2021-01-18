import React from 'react'

export default class Form extends React.Component {
    state = {
        textValue: '',
        textAreaValue: '',
        selectValue: []
    }
    handleChange = () => {
        return (e) => {
            console.log(e.target)
            this.setState({
                textValue: e.target.value
            })
        }
    }
    handleAreaChange = () => {
        return (e) => {
            console.log(e.target)
            this.setState({
                textAreaValue: e.target.value
            })
        }
    }
    handleSelectChange = () => {
        return (e) => {
            // console.log(e.target.value)
            if (!e.target.multiple) {
                console.log(1111)
                this.setState({
                    selectValue: e.target.value
                })
            } else {
                console.log(this.state.selectValue.indexOf(e.target.value))
                if (this.state.selectValue.indexOf(e.target.value) !== -1) {
                    this.state.selectValue.forEach((item, index) => {
                        if (item === e.target.value) {
                            let list = [...this.state.selectValue];
                            list.splice(index, 1);
                            console.log(list + "   11111")
                            this.setState({
                                selectValue: list
                            })
                        }
                    })
                } else {
                    let list = [...this.state.selectValue];
                    list.push(e.target.value);
                    console.log(list + "   222222")
                    this.setState({
                        selectValue: list
                    })
                }
            }
        }
    }
    handleSubmit = () => {
        return (e) => {
            e.preventDefault();
            console.log('提交了');
            console.log(this.state);
        }
    }
    render () {
        return (
            <form action="" onSubmit={this.handleSubmit()}>
                <input 
                type="text" 
                value={this.state.textValue} 
                onChange = {this.handleChange()}
                />
                <br/>
                <textarea name="" id="" cols="30" rows="10"
                value={this.state.textAreaValue}
                onChange={this.handleAreaChange()}
                ></textarea>
                <br/>
                <select name="see" id="keu"
                multiple   // 多选
                value={this.state.selectValue}
                onChange={this.handleSelectChange()}
                >
                    <option value="0">北极光</option>
                    <option value="1">太极扇</option>
                    <option value="2">捞上来</option>
                </select>
                <br/>
                <input type="submit" value="提交"/>
            </form>
        )
    }
}