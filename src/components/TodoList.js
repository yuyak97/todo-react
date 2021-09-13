import React, {useState} from 'react'
import {db} from '../config/firebase_config'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import Todo from './Todo'

const TodoList = () => {
	const [todoInput, setTodoInput] = useState('')

	const todosRef = db.collection('todos')
	const query = todosRef.orderBy('createdAt').limit(25)
	const [todos, loading, error] = useCollectionData(query, {idField: 'id'})
	// console.log(todos)

	const addTodo = async (e) => {
		e.preventDefault()

		if (todoInput) {
			await todosRef.add({
				todoName: todoInput,
				inProgress: false,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			})
		}

		setTodoInput('')
	}

	const toggleStatus = async (todo) => {
		await todosRef.doc(todo.id).update({
			inProgress: !todo.inProgress,
		})
	}

	const deleteTodo = async (todo) => {
		await todosRef.doc(todo.id).delete()
	}

	return (
		<div
			className='todoList'
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				maxWidth: '400px',
			}}>
			<h1 className='todoList-title'>Todo list</h1>
			<input
				placeholder='Write a new todo'
				value={todoInput}
				onChange={(e) => setTodoInput(e.target.value)}
				className='todo-input'
			/>
			<button onClick={addTodo} className='todo-addButton'>
				ADD TODO
			</button>
			{loading && <h2 className='loading-message'>loading todos ...</h2>}
			{todos?.map((todo) => (
				<Todo
					todo={todo}
					toggleStatus={toggleStatus}
					deleteTodo={deleteTodo}
					key={todo.id}
				/>
			))}
		</div>
	)
}

export default TodoList
