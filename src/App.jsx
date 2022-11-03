import { useState, useEffect } from 'react';
import axios from 'axios';
import useOnclickOutside from 'react-cool-onclickoutside';
import Card from './components/Card';
import UploadModal from './components/UploadModal';
import './App.css';

function App() {
	const [imageLocations, setImageLocations] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageLabel, setImageLabel] = useState('');
	const [imageURL, setImageURL] = useState('');
	const modalRef = useOnclickOutside(() => {
		setIsModalOpen(false);
	});

	const fetcher = async () => {
		axios.get('http://localhost:5000/fetchgallery').then((res) => {
			setImageLocations(res.data);
			console.log(res.data);
		});
	};

	const handleUpload = () => {
		console.log(uploadInput.files[0]);
	};

	const submitPhoto = async () => {
		axios
			.post('http://localhost:5000/images', {
				// FormData({ form: 'data' }), {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				data: {
					tag: imageLabel,
					url: imageURL,
				},
			})
			.then((res) => {
				console.log('success:', res.data);
			})
			.catch((err) => {
				console.log('error:', err);
			});
	};

	useEffect(() => {
		if (!isModalOpen) {
			return;
		}
		const uploadInput = document.getElementById('uploadInput');
		const uploadBtn = document.getElementById('uploadBtn');
		uploadBtn.addEventListener('click', () => {
			uploadInput.click();
		});
		uploadInput.addEventListener('change', handleUpload);
		return function cleanup() {
			uploadBtn.removeEventListener('click', () => {
				uploadInput.click();
			});
			uploadInput.removeEventListener('change', handleUpload);
		};
	}),
		[isModalOpen];

	useEffect(() => {
		console.log('search term changed, func to filter list here');
	}, [searchTerm]);

	return (
		<div className="App">
			<div className="container">
				{isModalOpen ? (
					<UploadModal
						setIsModalOpen={setIsModalOpen}
						modalRef={modalRef}
						setImageLabel={setImageLabel}
						setImageURL={setImageURL}
						submitPhoto={submitPhoto}
					></UploadModal>
				) : null}
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
							<input
								placeholder="Search by name"
								size="16"
								onChange={(e) => {
									setSearchTerm(e.target.value);
								}}
							></input>
						</div>
					</div>
					<input
						type="file"
						style={{ display: 'none' }}
						id="uploadInput"
						accept="image/*"
					></input>
					<button className="nav-upload" onClick={() => setIsModalOpen(true)}>
						Add a photo
					</button>
				</nav>
				<button onClick={fetcher}>FETCH TEST</button>
				<div id="gallery-container">
					{/* {imageLocations.map((location, i) => {
					return <Card url={location} key={i}></Card>
				})} */}
					<Card
						url="./testphotos/abigail-clarke-DJqq1joT0S8-unsplash.jpg"
						tag="uno"
					></Card>
					<Card
						url="./testphotos/eugene-golovesov-cG0sK2W6qw0-unsplash.jpg"
						tag="uno dos"
					></Card>
					<Card
						url="./testphotos/mahdi-bafande-QztDBCtOVLQ-unsplash.jpg"
						tag="unodos dos"
					></Card>
					<Card
						url="./testphotos/max-harlynking-vi0pHtiYjuo-unsplash.jpg"
						tag="uno dos tres"
					></Card>
					<Card
						url="./testphotos/parrish-freeman-7wuGwjDYvPU-unsplash.jpg"
						tag="zapdos pokemon"
					></Card>
					<Card
						url="./testphotos/pramod-tiwari-r49BEjNs3uQ-unsplash.jpg"
						tag="moltres pokemon"
					></Card>
					<Card
						url="./testphotos/axp-photography-82ytaqqwIpw-unsplash.jpg"
						tag="articuno pokemon"
					></Card>
				</div>
			</div>
		</div>
	);
}

export default App;
