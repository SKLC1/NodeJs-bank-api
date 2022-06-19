
import React, { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
   
	useEffect(() => {
  	axios.get('/users')
    	.then(res => setState(res.data))
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
