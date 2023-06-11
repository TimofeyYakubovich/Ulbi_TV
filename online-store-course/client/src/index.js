import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';

// const user = new UserStore()

export const Context = createContext(null)
// export const Context = createContext({
//   user
// })
// console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore()
    // user
  }}>
      <App />
  </Context.Provider>
  // </React.StrictMode>
);
