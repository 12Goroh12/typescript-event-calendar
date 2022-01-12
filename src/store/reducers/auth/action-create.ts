import { AppDispatch } from '../..'
import UserService from '../../../api/UserService'
import { IUser } from '../../../models/IUser'
import { AuthAction, AuthActionEmun } from './types'

export const AuthActionCreate = {
	setUser: (user: IUser): AuthAction => ({
		type: AuthActionEmun.SET_USER,
		payload: user,
	}),
	setIsAuth: (auth: boolean): AuthAction => ({
		type: AuthActionEmun.SET_AUTH,
		payload: auth,
	}),
	setIsLoading: (payload: boolean): AuthAction => ({
		type: AuthActionEmun.SET_IS_LOADING,
		payload,
	}),
	setError: (payload: string): AuthAction => ({
		type: AuthActionEmun.SET_ERROR,
		payload,
	}),
	login:
		(username: string, password: string) =>
		async (dispatch: AppDispatch) => {
			try {
				dispatch(AuthActionCreate.setIsLoading(true))
				setTimeout(async () => {
					const response = await UserService.getUsers()
					const mockUser = response.data.find(
						(user) =>
							user.username === username &&
							user.password === password,
					)
					if (mockUser) {
						localStorage.setItem('auth', 'true')
						localStorage.setItem('username', mockUser.username)
						dispatch(AuthActionCreate.setUser(mockUser))
						dispatch(AuthActionCreate.setIsAuth(true))
					} else {
						dispatch(
							AuthActionCreate.setError(
								'Некоректное имя или пароль',
							),
						)
					}
					dispatch(AuthActionCreate.setIsLoading(false))
				}, 1000)
			} catch (error) {
				dispatch(
					AuthActionCreate.setError('Произошла ошибка при логине!'),
				)
			}
		},
	logout: () => async (dispatch: AppDispatch) => {
		localStorage.removeItem('auth')
		localStorage.removeItem('username')
		dispatch(AuthActionCreate.setUser({} as IUser))
		dispatch(AuthActionCreate.setIsAuth(false))
	},
}
