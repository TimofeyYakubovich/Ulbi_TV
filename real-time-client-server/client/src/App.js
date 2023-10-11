import './App.css';
import EventSourcing from './EventSourcing';
import LongPulling from './LongPulling';
import WebSock from './WebSock';
// npm i axios
function App() {
  return (
    <div className="App">
      {/* <LongPulling/> */}
      {/* <EventSourcing/> */}
      <WebSock/>
    </div>
  );
}

export default App;
