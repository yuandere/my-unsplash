import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import './App.css';

function App() {
	const [imageLocations, setImageLocations] = useState([])

	const fetcher = async () => {
		axios.get('http://localhost:5000/fetchgallery')
		.then((res) => {
			console.log(res.data)
			setImageLocations(res.data)
		})
	}

  const handleUpload = () => {
    console.log(uploadInput.files[0])
  }

	useEffect(() => {
		const uploadInput = document.getElementById('uploadInput');
		if (!uploadInput) {
			return;
		}
		const uploadBtn = document.getElementById('uploadBtn');
		uploadBtn.addEventListener(
			'click',
			() => {uploadInput.click();}
		);
    uploadInput.addEventListener('change', handleUpload);
		return function cleanup() {
			uploadBtn.removeEventListener(
				'click',
				() => {uploadInput.click();}
			);
      uploadInput.removeEventListener('change', handleUpload);
		};
	});


	return (
		<div className="App">
			<div className="container">
				<nav>
					<div className="nav-left">
						<div className="nav-logo">
							<span className="material-icons">try</span>
							<div className="nav-logo-text">
								<h3>My Unsplash</h3>
								<p>devchallenges.io</p>
							</div>
						</div>
						<div className="nav-search">
							<span className="material-icons">search</span>
							<input placeholder="Search by name" size="16"></input>
						</div>
					</div>
					<input
						type="file"
						style={{ display: 'none' }}
						id="uploadInput"
						accept='image/*'
					></input>
					<button id="uploadBtn" className="nav-upload">
						Add a photo
					</button>
				</nav>
				<div className="gallery-container">
					<button onClick={fetcher}>FETCH TEST</button>
				</div>
				<Card></Card>
			</div>
		</div>
	);
}

export default App;
