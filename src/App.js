import logo from './logo.svg';
import './App.css';
import Form from './components/Forms/Form'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>

    <div>
      <Form />
    </div>

    </div>
  );
}

export default App;
