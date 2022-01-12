import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import { Moment } from 'moment'
import React, { FC } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { formatDate } from '../utils/date'
import { rules } from '../utils/rules'

interface EventFormProps {
	guests: IUser[]
	submit: (e: IEvent) => void
}

const EventForm: FC<EventFormProps> = ({ guests, submit }) => {
	const [event, setEvent] = React.useState<IEvent>({
		author: '',
		guest: '',
		description: '',
		date: '',
	} as IEvent)
	const { user } = useTypedSelector(state => state.auth)

	const SelectDate = (date: Moment | null) => {
		if (date) {
			setEvent({ ...event, date: formatDate(date.toDate()) })
		}
	}

	const submitForm = () => {
		submit({ ...event, author: user.username })

	}


	return (
		<Form onFinish={submitForm}>
			<Form.Item
				label='Описание события'
				name='description'
				rules={[rules.required('Обязательное поле!')]}
			>
				<Input
					value={event.description}
					onChange={(e) =>
						setEvent({ ...event, description: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item
				label='Дата события'
				name='date'
				rules={[rules.required('Обязательное поле!')]}
			>
				<DatePicker onChange={(date) => SelectDate(date)} />
			</Form.Item>
			<Form.Item
				label='Выбрать гостя'
				name='guest'
				rules={[rules.required('Обязательное поле!')]}
			>
				<Select
					onChange={(guest: string) => setEvent({ ...event, guest })}
				>
					{guests.map((guest) => (
						<Select.Option
							key={guest.username}
							value={guest.username}
						>
							{guest.username}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Row justify='end'>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Создать
					</Button>
				</Form.Item>
			</Row>
		</Form>
	)
}

export default EventForm
