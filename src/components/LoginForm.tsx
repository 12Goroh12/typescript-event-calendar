import { Button, Form, Input } from 'antd'
import React, { FC, FormEvent, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { rules } from '../utils/rules'


const LoginForm: FC = () => {
	const { error, isLoading } = useTypedSelector(state => state.auth)
	const [username, setUserName] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { login } = useActions()

	const submit = (e: FormEvent<HTMLFormElement>) => {
		login(username, password)
	}

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			initialValues={{ remember: true }}
			onFinish={submit}
		>
			{error && <div style={{ color: 'red' }}>
				{error}
			</div>}
			<Form.Item
				label="Имя"
				name="username"
				rules={[rules.required('Пожалуйста введите имя пользователя!')]}
			>
				<Input value={username} onChange={(e) => setUserName(e.target.value)} />
			</Form.Item>
			<Form.Item
				label="Пароль"
				name="password"
				rules={[rules.required('Пожалуйста введите пароль!')]}
			>
				<Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit" loading={isLoading}>
					Войти
				</Button>
			</Form.Item>
		</Form>
	)
}

export default LoginForm
