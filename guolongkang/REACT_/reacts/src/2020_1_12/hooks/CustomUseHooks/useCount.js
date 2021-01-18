import {useState, useEffect} from 'react'

const UseCount = function (params) {
  let [list, setList] = useState([])

  useEffect(()=> {
    setTimeout(() => {
      params ===1 ? setList(['a', 'b', 'c']) : setList(['f', 's', 'e'])
    }, 3000);

    return () => {}
  }, [])

  return list
}

export default UseCount