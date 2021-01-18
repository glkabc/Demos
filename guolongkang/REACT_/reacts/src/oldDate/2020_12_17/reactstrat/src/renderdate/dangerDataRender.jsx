import React from 'react'

export default class dangerDate extends React.Component {
    state = {
        data: '<h1>World</h1>'
    }
    render() {
        return (
            <>
                <div
                dangerouslySetInnerHTML={{__html: this.state.data}}
                ></div>
                <div>{this.state.data}</div>
                
                <label htmlFor="abc">
                    abc<input type="text"/>
                </label>
            </>
            
        )
    }
}