/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<div>
			<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
				<div className='container-fluid'>
					<Link className='navbar-brand' to={'/'}>
						Notepad Application
					</Link>
					<Link className='btn btn-outline-light' to='/addtask'>
						{' '}
						Add Task
					</Link>
				</div>
			</nav>
		</div>
	);
}
