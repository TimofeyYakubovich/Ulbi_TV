// импортируем все экшенкриеторы из фалов user и todo
import * as UserActionCreators from './user'
import * as TodoActionCreators from './todo'
// из ээтого файла экспортируем все экшенкриеторы из файлов user и todo
export default {
    ...UserActionCreators,
    ...TodoActionCreators
}