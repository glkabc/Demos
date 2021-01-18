import logo from './logo.svg';
import './App.css';
import Header from './components/Nest'
import StyleCss from './components/StyleCss'
// import DivContainer from './components/StyledCss'

import DataMount from './props/DataMount'
import States from './props/State'
import Parent from './uplifting/Parent'

import DangerDateRender from './renderdate/dangerDataRender'
import EventComponent from './eventComponent/event'
import Form from './form/form'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Header />
        <StyleCss />
        <DataMount></DataMount>
        <hr/>
        <States/>
        <span>变量提升</span>
        <Parent/>
        <span>danger data render</span>
        <DangerDateRender/>
        <span>event component</span>
        <EventComponent />
      </header>
      <Form/>
    </div>
  );
}

export default App;
