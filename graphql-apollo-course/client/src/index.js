import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// импортируем из ApolloClient, ApolloProvider InMemoryCache из модуля @apollo/client
// функция InMemoryCache предназначена для кеширования
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({ // создаем объект клиента передаем объект опций
  uri: 'http://localhost:5000/graphql', // адрес сервера
  cache: new InMemoryCache() // создаем объект InMemoryCache
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // что бы отправлять запросы надо свзяать apollo/client с react приложением для этого используется ApolloProvider в каторый оборачиваем <App />
  // и пропсом передаем client
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    
);

// Apollo инструмент с помощью каторго можно отправлять запросы он под капотом их кеширует что бы избежать лишних запросов
// устанавливаем npm install @apollo/client graphql