import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTask() {
	let navigate = useNavigate();

	const [task, setTask] = useState({
		title: '',
		description: '',
		deadline: new Date(),
	});

	const { title, description, deadline } = task;

	const onInputChange = (e) => {
		setTask({ ...task, [e.target.name]: e.target.value });
	};

	const onDateChange = (date) => {
		setTask({ ...task, deadline: date });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:8081/task', task);
		navigate('/');
	};

	return (
		<div className='container'>
			<div className='rwo'>
				<div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
					<h2 className='text-center m-4'>Add Task</h2>
					<form onSubmit={(e) => onSubmit(e)}>
						<div className='mb-3'>
							<label htmlFor='Title' className='form-label'>
								Title
							</label>
							<input
								type={'text'}
								className='form-control'
								placeholder='Enter Title'
								name='title'
								value={title}
								onChange={(e) => onInputChange(e)}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='Description' className='form-label'>
								Description
							</label>
							<input
								type={'text'}
								className='form-control'
								placeholder='Enter Description'
								name='description'
								value={description}
								onChange={(e) => onInputChange(e)}
							/>
						</div>

						<div className='mb-3'>
							<label htmlFor='Deadline' className='form-label'>
								Deadline
							</label>
							<DatePicker
								selected={deadline}
								onChange={onDateChange}
								className='form-control'
								placeholderText='Choose Deadline'
								name='deadline'
							/>
						</div>
						<button type='submit' className='btn btn-outline-primary'>
							Submit
						</button>
						<Link className='btn btn-outline-danger mx-2' to='/'>
							Cancel
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
