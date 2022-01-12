import React, { FC } from 'react'
import { Calendar } from 'antd'
import { IEvent } from '../models/IEvent'
import { Moment } from 'moment';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
	events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
	function dateCellRender(value: Moment) {
		const formatedDate = formatDate(value.toDate())
		const currentDayEvents = events.filter(ev => ev.date === formatedDate)
		return (
			<div>
				{currentDayEvents.map((event, index) => (
					<div key={`${index}_${event.author}`}>{event.description}</div>
				))}
			</div>
		)
	}

	return (
		<Calendar
			dateCellRender={dateCellRender}
		/>
	)
}

export default EventCalendar
