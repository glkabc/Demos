import styled from 'styled-components'

const Container = styled.div `
  header {
    height: 50px
  }
`

const HotCateWrap = styled.div `
  h1 {
    height: 3.5rem;
    padding-left: .5rem;
    color: #666;
    font-size: 16px;
    line-height: 3.5rem;
    font-weight: normal;
    background-color: #fff;
    margin: 0;
  }
`

const Top10Style = styled.div `
  h1 {
    height: 3.5rem;
    padding-left: .5rem;
    color: #666;
    font-size: 16px;
    line-height: 3.5rem;
    font-weight: normal;
    background-color: #fff;
  }
  ul {
    display: felx;
    flex-wrap: wrap;
    padding-left: 15px;
    padding-top: 15px;
    background-color: #fff;
    li {
      width: 50%;
      padding-right: 15px;
      img {
        width: 100%
      }
      > div:last-child {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
        padding: 10px 15px;
        > p:first-child {
          margin: 5px 0px;
          font-size: 16px;
        }
        > p:last-child {
          margin: 0;
          font-size: 14px
          color: #666;
        }
      }
    }
  }
`

export {
  Container,
  HotCateWrap,
  Top10Style
}