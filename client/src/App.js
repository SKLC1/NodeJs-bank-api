
import React, { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
   
	useEffect(() => {
		async function getData(){
			const data = await axios.get('http://localhost:5000/users')
			console.log(data);
			setState(data)
		}
		getData()
	}, [])
 
	const [state, setState] = useState('')
  return (
    <div>
  	Home
  	<p>{JSON.stringify(state)}</p>
    </div>
  );
}

export default App;
