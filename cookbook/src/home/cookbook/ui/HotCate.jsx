import React, { Component } from 'react'
import {Grid, Icon} from 'antd-mobile'
import {HotCateWrap} from './StyleCookBook'

export default class HotCate extends Component {
  state = {
    HotCateList: [
      {
        icon: <Icon type='cross' />,
        title: 'name'
      },
      {
        icon: <Icon type='cross' />,
        title: 'name'
      },
      {
        icon: <Icon type='cross' />,
        title: 'name'
      },
      {
        icon: <Icon type='cross' />,
        title: 'name'
      },
      {
        icon: <Icon type='cross' />,
        title: 'name'
      },
      {
        icon: <Icon type='cross' />,
        title: 'name'
      },
      {
        icon: <Icon type='cross' />,
        title: 'name'
      },
      {
        icon: <Icon type='cross' />,
        title: 'name'
      },
    ]
  }
  render() {
    return (
      <HotCateWrap>
        <h1>热门分类</h1>
        <Grid data={this.state.HotCateList}
          columnNum={3}
          renderItem={dataItem => (
            <div style={{ padding: '12.5px' }}>
              <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
              <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                <span>{dataItem.title}</span>
              </div>
            </div>
          )}
        />
      </HotCateWrap>
    )
  }
}
