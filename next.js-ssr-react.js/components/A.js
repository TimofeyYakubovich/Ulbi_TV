// как подключать стили для отдельного копанента что бы не писать из внутри jsx разметки
// выносим ссылки в отдельный компанент A.js
/* что бы эти стиил применились к конкретному компаненту надо задать название файла по определенному шаблону A.module.css */
// стили можно писать внутри jsx и импортировать файлы со стилями но тогда нужно задать название файла по определенному шаблону
import styles from '../styles/A.module.css'

import Link from "next/link";

export default function A({text, href}) { // кстомная ссылка будет принимать пропсами текст ссылки и путь href
    return (
        <Link className={styles.link} href={href} legacyBehavior>
            <a className={styles.link}>{text}</a>
        </Link>
    )
}