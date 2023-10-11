import React, {useEffect} from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { RootState } from './store/store';
import { userSlice } from './store/reducers/UserSlice';
import { fetchUsers } from './store/reducers/ActionCreators';
import PostContainer from './components/PostContainer';
import PostContainer2 from './components/PostContainer2';
import PostJsonContainer from './components/PostJsonContainer';
// продвинутый Redux расмотрим Redux Toolkit в связке с TypeScript расмотрим модуль RTK query

// npx create-react-app . --template typescript
// подключаем Redux Toolkit к проекту npm install @reduxjs/toolkit react-redux @types/react-redux
// npm i axios

function App() {
  // const {} = useSelector(state => state.) // в данном случае мы не знаем какова типа у нас state какие есть редьюсеры какие в них поля
  // const {} = useSelector((state: RootState) => state.) // что бы TypeScript эти поля подхватил надо явно указать тип стейта
  // const {count} = useAppSelector(state => state.userReducer) // при использовании типизированного селектора будут подхватываться все редьюсеры и поля в них

  // слайс содержит в себе екшенкриеаторы и редьюсер достаем екшенкреатор increment
  // тоесть ни екшены ни екшенкреаторы ни типы для екшенов не создаеются в ручную все это делает Redux Toolkit
  // const {increment} = userSlice.actions;
  // остается только созданный с помощью Redux Toolkit екшенкреатор задиспатчить
  const dispatch = useAppDispatch()

  // console.log(increment(5))


  const {users, error, isLoading} = useAppSelector(state => state.userReducer)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className="App">
      {/* <h1>{count}</h1>
      <button onClick={() => dispatch(increment(10))}>INCREMENT</button> */}
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users, null, 2)}
      <br/>
      <br/>
      <div style={{display: 'flex'}}>
        <PostContainer/>
        <PostContainer2/>
      </div>
      <PostJsonContainer/>
      
    </div>
  );
}

export default App;


// что бы использовать мутации создавать новые данные обновлять их удалять jsonplaceholder для этого уже не подойдет там такие операции не 
// реализованы в должной мере установим json-server npm install -g json-server с помощью каторого можно быстро поднять сервер
// на катором уже будет своего рода бд все данные будут сохроняться в файлик db.json
// json-server --watch db.json --port 5000 поднимаем сервер на 5000 порту