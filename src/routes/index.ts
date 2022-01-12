import React from 'react'
import Event from '../pages/Event'
import Login from '../pages/Login'

export interface IRoute {
	path: string
	component: React.ComponentType
	exact?: boolean
}

export enum RoutesName {
	LOGIN = '/login',
	EVENT = '/',
}

export const publicRoute: IRoute[] = [
	{ path: RoutesName.LOGIN, exact: true, component: Login },
]

export const privateRoute: IRoute[] = [
	{ path: RoutesName.EVENT, exact: true, component: Event },
]
