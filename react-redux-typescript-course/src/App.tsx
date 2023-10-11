import React from 'react';
import UserList from './components/UserList';
import TodoList from './components/TodoList';
// npx create-react-app . --template typescript
// npm i @types/react-redux redux react-redux redux-thunk axios
const App = () => {
  return (
    <div>
      <UserList/>
      <hr/>
      <TodoList/>
    </div>
  );
};

export default App;