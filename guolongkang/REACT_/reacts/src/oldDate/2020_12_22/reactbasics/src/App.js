import HOC from './Component/HocComponent'
import Protal from './Component/Portal'
import MyReduX from './Component/reduxs/selfstudx'
import IndexRedux from './Component/reduxs/redux/redux+react'
import ToDoList from './Component/reduxs/todoList'

function App() {
  return (
    <div>
      React Basics
      <HOC/>
      <Protal/>
      <MyReduX/>
      <IndexRedux/>
      <hr/>
      <ToDoList/>
    </div>
  );
}

export default App;
