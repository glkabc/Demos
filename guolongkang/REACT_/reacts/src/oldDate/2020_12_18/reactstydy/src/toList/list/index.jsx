import React from 'react'
import PropTypes from 'prop-types'
import './indexList.css'

// export default class List extends React.Component {
//     render () {
//         return (
//             <div>
//                 List Component
//             </div>
//         )
//     }
// }

export default function List (props) {
    return (
        <ul className='indexList'>
            {
                props.list.map(value => {
                    return (
                        <div key={value.id}>
                            <li>{value.taskname}</li>
                            <button onClick={props.onDeleteList(value.id)}>删除</button>
                        </div>
                    )
                })
            }
        </ul>
    )
}

List.propTypes = {
    list: PropTypes.array
}