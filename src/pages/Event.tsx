import { Button, Layout, Modal, Row } from 'antd'
import React, { FC, useEffect } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../models/IEvent'

const Event: FC = () => {
	const [modalVisible, setModalVisible] = React.useState(false)
	const { fetchGuest, createEvent, fetchEvents } = useActions()
	const { guests, events } = useTypedSelector((state) => state.event)
	const { user } = useTypedSelector((state) => state.auth)

	useEffect(() => {
		fetchGuest()
		fetchEvents(user.username)
	}, [])

	const AddNewEvent = (e: IEvent) => {
		setModalVisible(false)
		createEvent(e)
	}

	return (
		<Layout>
			<Row justify='center'>
				<Button onClick={() => setModalVisible(true)}>
					Добавить событие
				</Button>
			</Row>
			<EventCalendar events={events} />

			<Modal
				title='Добавить событие'
				visible={modalVisible}
				footer={null}
				onCancel={() => setModalVisible(false)}
			>
				<EventForm
					submit={AddNewEvent}
					guests={guests}
				/>
			</Modal>
		</Layout>
	)
}

export default Event
