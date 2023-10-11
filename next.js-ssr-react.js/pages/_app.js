// файл _app.js это зарезервированное название 
// компанента своего рода обертка над всем приложением

// сюда подключаем глобальные стили
import '../styles/global.css'
// This default export is required in a new pages/_app.j
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}