// отсюда экспортируем все екшенкреаторы одним объектом каторые будут во всем приложении 
// для того что бы 1 параметром передать эти екшенкреаторы в функцию bindActionCreators() в собственном хуке useActions.ts

import * as PlayActionCreators from '../actions-creators/player'

export default {
 ...PlayActionCreators
}