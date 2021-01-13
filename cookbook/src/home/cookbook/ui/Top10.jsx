import React, { Component } from 'react'
import {Top10Style} from './StyleCookBook'

export default class Top10 extends Component {
  render() {
    return (
      <Top10Style>
        <h1>热门菜品</h1>
        <ul>
          <li>
            <div>
              <img src='https://scpic.chinaz.net/files/pic/pic9/202101/hpic3453.jpg' alt=""/>
            </div>
            <div>
              <p>喜庆泡脚包由于</p>
              <p>
                <span>10000收场</span>
                <span>10000查看</span>
              </p>
            </div>
          </li>
          <li>
            <div>
              <img src='https://scpic.chinaz.net/files/pic/pic9/202101/hpic3453.jpg' alt=""/>
            </div>
            <div>
              <p>喜庆泡脚包由于</p>
              <p>
                <span>10000收场</span>
                <span>10000查看</span>
              </p>
            </div>
          </li>
          <li>
            <div>
              <img src='https://scpic.chinaz.net/files/pic/pic9/202101/hpic3453.jpg' alt=""/>
            </div>
            <div>
              <p>喜庆泡脚包由于</p>
              <p>
                <span>10000收场</span>
                <span>10000查看</span>
              </p>
            </div>
          </li>
        </ul>
      </Top10Style>
    )
  }
}
