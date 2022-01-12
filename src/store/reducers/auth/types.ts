import { IUser } from '../../../models/IUser'

export interface AuthState {
	isAuth: boolean
	user: IUser
	isLoading: boolean
	error: string
}

export enum AuthActionEmun {
	SET_AUTH = 'SET_AUTH',
	SET_ERROR = 'SET_ERROR',
	SET_USER = 'SET_USER',
	SET_IS_LOADING = 'SET_IS_LOADING',
}

interface SetAuthAction {
	type: AuthActionEmun.SET_AUTH
	payload: boolean
}
interface SetErrorAction {
	type: AuthActionEmun.SET_ERROR
	payload: string
}
interface SetUserAction {
	type: AuthActionEmun.SET_USER
	payload: IUser
}
interface SetIsLoadingAction {
	type: AuthActionEmun.SET_IS_LOADING
	payload: boolean
}

export type AuthAction =
	| SetAuthAction
	| SetErrorAction
	| SetUserAction
	| SetIsLoadingAction
