import { useState, useEffect } from 'react';
import axios from 'axios';
import useOnclickOutside from 'react-cool-onclickoutside';
import Card from './components/Card';
import UploadModal from './components/UploadModal';
import ConfirmModal from './components/ConfirmModal';
import './App.css';

function App() {
	const [imageData, setImageData] = useState([]);
	const [imagesFiltered, setimagesFiltered] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isUploadModalOpen, setisUploadModalOpen] = useState(false);
	const [imageLabel, setImageLabel] = useState('');
	const [imageURL, setImageURL] = useState('');
	const [fileToUpload, setFileToUpload] = useState(null);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [confirmStatus, setConfirmStatus] = useState(null);
	const [deletePassword, setDeletePassword] = useState(null);
	const uploadModalRef = useOnclickOutside(() => {
		setisUploadModalOpen(false);
	});
	const confirmModalRef = useOnclickOutside(() => {
		setIsConfirmModalOpen(false);
	});

	const fetcher = async () => {
		axios.get('http://localhost:5000/images').then((res) => {
			setImageData(res.data);
		});
	};

	const handleUpload = () => {
		console.log(uploadInput.files[0]);
		setFileToUpload(uploadInput.files[0]);
	};

	const submitPhoto = async () => {
		if (fileToUpload) {
			const formData = new FormData();
			formData.append('picture', fileToUpload);
			formData.append('tag', imageLabel);
			console.log(formData);
			axios
				.post('http://localhost:5000/imagefile', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					console.log('success:', res.data);
					setisUploadModalOpen(false);
					setIsConfirmModalOpen(true);
				})
				.catch((err) => {
					console.log('error:', err);
					setIsConfirmModalOpen(true);
				});
		} else {
			axios
				.post('http://localhost:5000/imageurl', {
					data: {
						tag: imageLabel,
						url: imageURL,
					},
				})
				.then((res) => {
					console.log('success:', res.data);
					setisUploadModalOpen(false);
					setIsConfirmModalOpen(true);
				})
				.catch((err) => {
					console.log('error:', err);
					setIsConfirmModalOpen(true);
				});
		}
	};

	useEffect(() => {
		if (!isUploadModalOpen) {
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
		[isUploadModalOpen];

	useEffect(() => {
		if (searchTerm === '') {
			return;
		}
		const newData = [];
		imageData.forEach((item) => {
			if (item.tag.toLowerCase().includes(searchTerm.toLowerCase())) {
				newData.push(item);
			}
		});
		setimagesFiltered(newData);
	}, [searchTerm]);

	return (
		<div className="App">
			<div className="container">
				{isUploadModalOpen ? (
					<UploadModal
						setisUploadModalOpen={setisUploadModalOpen}
						uploadModalRef={uploadModalRef}
						setImageLabel={setImageLabel}
						setImageURL={setImageURL}
						submitPhoto={submitPhoto}
						fileToUpload={fileToUpload}
					></UploadModal>
				) : null}
				{isConfirmModalOpen ? (
					<ConfirmModal
						confirmModalRef={confirmModalRef}
						confirmStatus={confirmStatus}
						deletePassword={deletePassword}
					></ConfirmModal>
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
						name="picture"
					></input>
					<button
						className="nav-upload"
						onClick={() => setisUploadModalOpen(true)}
					>
						Add a photo
					</button>
				</nav>
				<button onClick={fetcher}>FETCH TEST</button>
				<div id="gallery-container">
					{searchTerm === ''
						? imageData.map((item) => {
								return (
									<Card url={item.url} tag={item.tag} key={item.id}></Card>
								);
						  })
						: imagesFiltered.map((item, i) => {
								return (
									<Card url={item.url} tag={item.tag} key={item.id}></Card>
								);
						  })}
					{/* <Card
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
					></Card> */}
				</div>
			</div>
		</div>
	);
}

export default App;
