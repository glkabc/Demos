import styled from 'styled-components'

const SearchStyle = styled.div `
  padding: 1.1rem 1.1rem;
  > div {
    display: flex;
    height: 2.4rem;
    border: solid 1px #ee742f;
    border-radius: .2rem;
    justify-content: center;
    text-align: center;
    background-color: #fff;
    svg {
      width: 1.18rem;
      height: 2.18rem;
      margin-right: .2rem;
      fill: #ee742f;
    }
    span {
      color: #666;
      text-align: center;
      margin-top: 10px;
    }
  }
`

export {
  SearchStyle
}