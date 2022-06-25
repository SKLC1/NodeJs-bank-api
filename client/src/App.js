
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { stringify } from 'uuid';
import './index.css'

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [data, setData] = useState('')
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [pass, setPass] = useState('')
	const [action, setAction] = useState('')
	const [amount, setAmount] = useState('')
	const [loginName, setLoginName] = useState('')
	const [loginPass, setLoginPass] = useState('')
     
  async function getAll(){
		const {data} = await axios.get('http://localhost:5000/users')
		setData(data)
	}
  async function getOne(id){
		const {data} = await axios.get(`http://localhost:5000/users/${id}`)
		setData(data)
		console.log(data);
		console.log(`http://localhost:5000/users/${id}`);
	}
	async function createUser(){
		const {data} = await axios.post('http://localhost:5000/users',{name: name, password: pass})
		setData(data)
	}
	async function makeAction(){
		const {data} = await axios.post(`http://localhost:5000/users/${id}`,{action: action, amount: action})
		setData(data)
	}
	async function loginUser(){
		const {data} = await axios.post(`http://localhost:5000/login`,{name: loginName, password: loginPass})
		console.log(data);
		if (data === "logged in to admin") {
			setLoggedIn(true)
			console.log(loggedIn);
		} else {
			console.log('access denied');
		}
	}

	if (loggedIn) {
		return (
		<div>
			<h1>Logged in as Admin</h1>
			<button onClick={()=>getAll()}>Get all users</button>
			<button onClick={()=>getOne(id)}>Get specific user info</button>
			<button onClick={()=>createUser()}>add user</button>
			<button  onClick={()=>makeAction()}>make an action</button>
			<div className='cont'>
				<label>for finding user</label>
				<input type='text' placeholder='id' onChange={(e)=>setId(e.target.value)}></input>
				<label>for creating user</label>
				<input type='text' placeholder='name' onChange={(e)=>setName(e.target.value)}></input>
				<input type='text' placeholder='password' onChange={(e)=>setPass(e.target.value)}></input>
				<label>for action</label>
				<input type='text' placeholder='action' onChange={(e)=>setAction(e.target.value)}></input>
				<input type='text' placeholder='amount' onChange={(e)=>setAmount(e.target.value)}></input>
			</div>
			<div>
				data:
				{JSON.stringify(data)}
			</div>
    </div>
  );
  } else {
		return(
			<div>
			   <label>login</label>
				 <input type='text' placeholder='name' onChange={(e)=>setLoginName(e.target.value)}></input>
				<input type='text' placeholder='pass' onChange={(e)=>setLoginPass(e.target.value)}></input>
				<button onClick={()=>loginUser()}>login</button>
			</div>
		)
	}
}

export default App;
