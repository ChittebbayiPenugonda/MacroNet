import './App.css';
import Header from './components/Header';
import InputSpace from './components/Input';
import GlobeComponent from './components/GlobeComponent';
function App() {
  return (
    <div className="App">
      <Header />
      {/* <InputSpace />
      <div style={{ paddingTop: '20px' }}> Add spacing here */}
        <GlobeComponent />
      </div>
    // </div>
  );
}

export default App;
