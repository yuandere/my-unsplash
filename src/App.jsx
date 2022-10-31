import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import './App.css';

function App() {
	const [imageLocations, setImageLocations] = useState([]);

	const fetcher = async () => {
		axios.get('http://localhost:5000/fetchgallery')
		.then((res) => {
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

	// useEffect(() => {
	// 	const mainId = document.getElementById('gallery-container');
	// 	if (!mainId) {
	// 		return
	// 	}
	// 	const cardIdentifier = '#gallery-container .card-container';
	// 	let card = document.querySelector(cardIdentifier);
	// 	let parentWidth = card.parentNode.getBoundingClientRect().width;
	// 	let cardWidth = card.getBoundingClientRect().width + parseFloat(getComputedStyle(card).marginLeft) + parseFloat(getComputedStyle(card).marginRight);
	// 	let columnWidth = Math.round((1 / (cardWidth / parentWidth)));

	// 	let arrayOfItems = Array.prototype.slice.call(document.querySelectorAll(cardIdentifier) );
	// 	let trackHeights = {};

	// 	arrayOfItems.forEach((item, i) => {
	// 		let thisColumn = i % columnWidth;
	// 		if (typeof trackHeights[thisColumn] == 'undefined') {
	// 			trackHeights[thisColumn] = 0;
	// 		}
	// 		trackHeights[thisColumn] += item.getBoundingClientRect().height + parseFloat(getComputedStyle(item).marginBottom);

	// 		if (i - columnWidth >= 0) {
	// 			let getItemAbove = document.querySelector(`${cardIdentifier}:nth-of-type(${i - columnWidth + 1})`);
	// 			let previousBottom = getItemAbove.getBoundingClientRect().bottom;
	// 			let currentTop = item.getBoundingClientRect().top - parseFloat(getComputedStyle(item).marginBottom);
	// 			item.style.top = `-${currentTop - previousBottom}px`;
	// 		}
	// 	})

	// 	let max = Math.max(...Object.values(trackHeights));
	// 	document.getElementById(mainId).style.height = `${max}px`
	// })


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
				<button onClick={fetcher}>FETCH TEST</button>
				<div id="gallery-container">
					{/* {imageLocations.map((location, i) => {
					return <Card url={location} key={i}></Card>
				})} */}
				<Card url='./testphotos/abigail-clarke-DJqq1joT0S8-unsplash.jpg' tag='unodos tres'></Card>
				<Card url='./testphotos/eugene-golovesov-cG0sK2W6qw0-unsplash.jpg' tag='unodos tres'></Card>
				<Card url='./testphotos/mahdi-bafande-QztDBCtOVLQ-unsplash.jpg' tag='unodos tres'></Card>
				<Card url='./testphotos/max-harlynking-vi0pHtiYjuo-unsplash.jpg' tag='unodos tres'></Card>
				<Card url='./testphotos/parrish-freeman-7wuGwjDYvPU-unsplash.jpg' tag='unodos tres'></Card>
				<Card url='./testphotos/pramod-tiwari-r49BEjNs3uQ-unsplash.jpg' tag='unodos tres'></Card>
				<Card url='./testphotos/axp-photography-82ytaqqwIpw-unsplash.jpg' tag='unodos tres'></Card>
				</div>
			</div>
		</div>
	);
}

export default App;
