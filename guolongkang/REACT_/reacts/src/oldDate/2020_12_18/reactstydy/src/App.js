import TodoList from './toList'
import LifeCycle from './lifecycle'
import ConText from './context'
import ContextOne from './context/conter'

function App() {
  return (
    <div className="App">
      <TodoList/>
      <LifeCycle/>
      <ConText/>
      <hr/>
      <ContextOne/>
    </div>
  );
}

export default App;
