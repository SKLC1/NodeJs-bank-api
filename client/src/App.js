
import React, { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
     
	if (loggedIn) {
		return (
		<div>
			hello
    </div>
  );
  } else {
		return(
			<div>
				<h1>login</h1>
				<label>Name</label>
				<input></input>
				<label>Password</label>
				<input></input>
			</div>
		)
	}
}

export default App;
