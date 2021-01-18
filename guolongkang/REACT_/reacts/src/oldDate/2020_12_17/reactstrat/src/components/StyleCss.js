import {Component} from 'react'

import './StyleCss.css'
import DivContainer from './StyledCss'

const style = {
    fontSize: '50px',
    color: 'red'
}


class StyleCss extends Component {
    render() {
        return (
            <div style={{fontSize: '59px'}}>
                <div>hello</div>
                <div style={style}>world</div>
                <div className={'font'}>你好</div>
                
                {/**
                 * styled-components style
                 */}
                <DivContainer>
                    This is  style-components component
                </DivContainer>
            </div>
        )
    }
}

export default StyleCss