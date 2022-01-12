import { IUser } from '../../../models/IUser'
import { AuthAction, AuthActionEmun, AuthState } from './types'

const initialState: AuthState = {
	isAuth: false,
	error: '',
	isLoading: false,
	user: {} as IUser,
}

export default function authReducer(
	state = initialState,
	action: AuthAction,
): AuthState {
	switch (action.type) {
		case AuthActionEmun.SET_AUTH:
			return {
				...state,
				isAuth: action.payload,
				isLoading: false,
			}
		case AuthActionEmun.SET_USER:
			return { ...state, user: action.payload }
		case AuthActionEmun.SET_IS_LOADING:
			return { ...state, isLoading: action.payload }
		case AuthActionEmun.SET_ERROR:
			return { ...state, error: action.payload, isLoading: false }
		default:
			return state
	}
}
