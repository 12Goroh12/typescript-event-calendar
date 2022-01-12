import { AuthActionCreate } from './auth/action-create'
import { EventActionCreators } from './event/action-creators'

export const allActionCreators = {
	...AuthActionCreate,
	...EventActionCreators,
}
