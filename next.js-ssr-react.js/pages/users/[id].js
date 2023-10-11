// создаем сдесь функцию эта будет наша копанента
import { useRouter } from "next/router"
import styles from '../../styles/User.module.scss'
import MainContainer from "../../components/MainContainer"

export default function User({user}) {
// что бы получать id пользователя из URL используем хук useRouter
// const router = useRouter() // из хука useRouter получаем router
// console.log(router) // id лежит в поле query делаем дструктуризацию сразу достаем query
const {query} = useRouter()

    return (
        <MainContainer keywords={user.name}>
            <div className={styles.user}>
                <h1>Пользователь с id {query.id}</h1>
                <div>Имя пользователя - {user.name}</div>
            </div>
        </MainContainer>
    )
}

// при переходе на профиль конкретного пользователя используем для запроса опять функцию getStaticProps
// получаем ошибку лучше использовать функцию getStaticPaths
// export async function getStaticProps(context) {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//     const user = await response.json() // приводим ответ к джейсону
//     return {
//         props: {user}, //will be passed to the page component as props
//     }
// }

// используем для запроса на профиль конкретного пользователя getServerSideProps 
// эта функия праметром принимает context выведем его в логи так как эта функция выполняется на сервере логи получаем в терминале
// в context тоже есть поле params: { id: '1' }, и query: { id: '1' }, из каторых можно выцепить id достаем диструктуризацией
// export async function getServerSideProps(context) {
export async function getServerSideProps({params}) {
    // console.log(context)
    // console.log(params)
    // в конец строки запроса добовляем id пользователя что бы получить его конкретно
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
    const user = await response.json() // приводим ответ к джейсону
    return {
    props: {user}, // will be passed to the page component as props
    }
}