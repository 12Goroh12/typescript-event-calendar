import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { privateRoute, publicRoute, RoutesName } from '../routes'



const AppRouter = () => {
	const { isAuth } = useTypedSelector(state => state.auth)

	return isAuth ? (
		<Switch>
			{privateRoute.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					exact={route.exact}
					component={route.component}
				/>
			))}
			<Redirect to={RoutesName.EVENT} />
		</Switch>
	) : (
		<Switch>
			{publicRoute.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					exact={route.exact}
					component={route.component}
				/>
			))}
			<Redirect to={RoutesName.LOGIN} />
		</Switch>
	)
}

export default AppRouter
