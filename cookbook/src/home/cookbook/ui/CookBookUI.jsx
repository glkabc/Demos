import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import {Container} from './StyleCookBook'

import Swiper from './swiper'
import Search from '@components/search'
import HotCate from './HotCate'
import Top10 from './Top10'

const CookBookUi = () => {
  return (
    <div>
        <Container>
           <header>
            <NavBar
              mode="orgine"
              icon={<Icon type="left" />}
              onLeftClick={() => console.log('onLeftClick')}
              // rightContent={[
              //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              //   <Icon key="1" type="ellipsis" />,
              // ]}
            >美食大全</NavBar>

            {/* <NavBar
              mode="dark"
              leftContent="Back"
              rightContent={[
                <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                <Icon key="1" type="ellipsis" />,
              ]}
            >NavBar</NavBar> */}
          </header>
        </Container>
        <Swiper></Swiper>
        <Search></Search>
        <HotCate></HotCate>
        <Top10></Top10>
      </div>
  )
}

export default CookBookUi