import React from 'react'
import {connect} from 'react-redux'
import {loadDataAsync} from '../actionCreator'

import CookBookUi from '../ui/CookBookUI'

@connect((state) => {
  // return {
  //   list: state.cookbook.list
  // }
},
(dispatch) => ({
  loadData() {
    dispatch(loadDataAsync())
  }
}))
class CookBooks extends React.Component {
  render () {
    return (
      <CookBookUi></CookBookUi>
    )
  }

  componentDidMount() {
    this.props.loadData()
  }
}

export default CookBooks