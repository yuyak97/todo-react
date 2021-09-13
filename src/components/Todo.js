import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const Todo = ({todo, toggleStatus, deleteTodo}) => {
	console.log(todo)

	return (
		<div className='todo-card'>
			<section className='todo-card-main'>
				<h2>{todo.todoName}</h2>
				<div className='todo-status-input'>
					<input
						type='checkbox'
						onChange={() => toggleStatus(todo)}
						checked={todo.inProgress}
						className={todo.inProgress ? 'todo-done' : 'todo-wip'}
					/>
					<p>{todo.inProgress ? 'Done' : 'WIP'}</p>
				</div>
			</section>
			<section onClick={() => deleteTodo(todo)} className='todo-trashIcon'>
				<FontAwesomeIcon icon={faTrash} className='sns-icon' />
			</section>
		</div>
	)
}

export default Todo
