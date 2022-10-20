import { useState } from 'react';
import Card from './Card';
import './App.css';

function App() {
	return (
		<div className="App">
			<div className="container">
				<nav>
          <div className='nav-left'>
            <div className='nav-logo'>
              <span className="material-icons">
               try
              </span>
              <div className='nav-logo-text'>
                <h3>My Unsplash</h3>
                <p>devchallenges.io</p>
              </div>
            </div>
            <div className='nav-search'>
              <span className="material-icons">
                search
              </span>
              <input placeholder='Search by name' size='16'></input>
            </div>
          </div>
          <button className='nav-upload'>
            Add a photo
          </button>
        </nav>
        <div className='gallery-container'></div>
				<Card></Card>
			</div>
		</div>
	);
}

export default App;
