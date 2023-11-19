import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EditTask() {
	let navigate = useNavigate();

	const { id } = useParams();

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

	useEffect(() => {
		loadTask();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.put(`http://localhost:8081/task/${id}`, task);
		navigate('/');
	};

	const loadTask = async () => {
		const result = await axios.get(`http://localhost:8081/task/${id}`);
		const deadlineDate = new Date(result.data.deadline);
		setTask({ ...result.data, deadline: deadlineDate });
	};

	return (
		<div className='container'>
			<div className='rwo'>
				<div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
					<h2 className='text-center m-4'>Edit Task</h2>
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
