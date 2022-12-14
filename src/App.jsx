import { useState, useEffect } from 'react';
import axios from 'axios';
import useOnclickOutside from 'react-cool-onclickoutside';
import Card from './components/Card';
import UploadModal from './components/UploadModal';
import ConfirmModal from './components/ConfirmModal';
import DeleteModal from './components/DeleteModal';
import './App.css';

function App() {
	const [imageData, setImageData] = useState([]);
	const [imagesFiltered, setimagesFiltered] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [imageLabel, setImageLabel] = useState('');
	const [imageURL, setImageURL] = useState('');
	const [fileToUpload, setFileToUpload] = useState(null);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [confirmStatus, setConfirmStatus] = useState(null);
	const [deletePassword, setDeletePassword] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deletePasswordGuess, setDeletePasswordGuess] = useState(null);
	const [deleteStatus, setDeleteStatus] = useState(null);
	const [toDeleteId, setToDeleteId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const uploadModalRef = useOnclickOutside(() => {
		uploadInput.value = '';
		setFileToUpload(null);
		setIsUploadModalOpen(false);
	});
	const confirmModalRef = useOnclickOutside(() => {
		setIsConfirmModalOpen(false);
		setConfirmStatus(null);
	});
	const deleteModalRef = useOnclickOutside(() => {
		setIsDeleteModalOpen(false);
		setDeleteStatus(null);
	});

	const fetcher = async () => {
		setIsLoading(true);
		axios
			.get('https://my-unsplash-backend.onrender.com/images')
			.then((res) => {
				setImageData(res.data.reverse());
				setIsLoading(false);
			})
			.catch((err) => {
				console.log('error:', err);
			});
	};

	const handleUpload = () => {
		// console.log('file added:', uploadInput.files[0]);
		setFileToUpload(uploadInput.files[0]);
	};

	const submitPhoto = async () => {
		if (fileToUpload) {
			const formData = new FormData();
			formData.append('picture', fileToUpload);
			formData.append('tag', imageLabel);
			// console.log(formData);
			axios
				.post('https://my-unsplash-backend.onrender.com/imagefile', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					// console.log('success:', res.data);
					setDeletePassword(res.data[0].password);
					setIsUploadModalOpen(false);
					setConfirmStatus('success');
					setIsConfirmModalOpen(true);
					setImageURL('');
					setImageLabel('');
					fetcher();
				})
				.catch((err) => {
					console.log('error:', err);
					setConfirmStatus('error');
					setIsConfirmModalOpen(true);
				});
		} else {
			axios
				.post('https://my-unsplash-backend.onrender.com/imageurl', {
					data: {
						tag: imageLabel,
						url: imageURL,
					},
				})
				.then((res) => {
					// console.log('success:', res.data);
					setDeletePassword(res.data[0].password);
					setIsUploadModalOpen(false);
					setConfirmStatus('success');
					setIsConfirmModalOpen(true);
					setImageURL('');
					setImageLabel('');
					fetcher();
				})
				.catch((err) => {
					console.log('error:', err);
					setConfirmStatus('error');
					setIsConfirmModalOpen(true);
				});
		}
	};

	const submitPassword = async () => {
		axios
			.delete(`https://my-unsplash-backend.onrender.com/images/${toDeleteId}`, {
				data: {
					password: deletePasswordGuess,
				},
			})
			.then((res) => {
				// console.log('success:', res.data);
				setDeleteStatus('success');
				fetcher();
				setSearchTerm('');
			})
			.catch((err) => {
				if (err.response.status === 403) {
					// console.log('failure', err.response.data);
					setDeleteStatus('incorrect');
				} else {
					setDeleteStatus('error');
					throw err;
				}
			});
	};

	useEffect(() => {
		fetcher();
	}, []);

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
	}, [isUploadModalOpen]);

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
				{isLoading ? (
					<div className="upload-modal" style={{ background: 'none' }}>
						<img className="spinner" src="./spinner.gif"></img>
					</div>
				) : null}
				{isUploadModalOpen ? (
					<UploadModal
						setIsUploadModalOpen={setIsUploadModalOpen}
						uploadModalRef={uploadModalRef}
						setImageLabel={setImageLabel}
						setImageURL={setImageURL}
						imageURL={imageURL}
						submitPhoto={submitPhoto}
						fileToUpload={fileToUpload}
					></UploadModal>
				) : null}
				{isConfirmModalOpen ? (
					<ConfirmModal
						confirmModalRef={confirmModalRef}
						setIsConfirmModalOpen={setIsConfirmModalOpen}
						confirmStatus={confirmStatus}
						setConfirmStatus={setConfirmStatus}
						deletePassword={deletePassword}
					></ConfirmModal>
				) : null}
				{isDeleteModalOpen ? (
					<DeleteModal
						deleteModalRef={deleteModalRef}
						setIsDeleteModalOpen={setIsDeleteModalOpen}
						setDeletePasswordGuess={setDeletePasswordGuess}
						deleteStatus={deleteStatus}
						setDeleteStatus={setDeleteStatus}
						submitPassword={submitPassword}
						toDeleteId={toDeleteId}
					></DeleteModal>
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
						className="nav-upload nav-upload--big"
						onClick={() => setIsUploadModalOpen(true)}
					>
						Add a photo
					</button>
					<button
						className="nav-upload nav-upload--small"
						onClick={() => setIsUploadModalOpen(true)}
					>
						<span className="material-icons">upload_file</span>
					</button>
				</nav>
				<div id="gallery-container">
					{searchTerm === ''
						? imageData.map((item) => {
								return (
									<Card
										url={item.url}
										tag={item.tag}
										key={item.id}
										id={item.id}
										setIsDeleteModalOpen={setIsDeleteModalOpen}
										setToDeleteId={setToDeleteId}
									></Card>
								);
						  })
						: imagesFiltered.map((item) => {
								return (
									<Card
										url={item.url}
										tag={item.tag}
										key={item.id}
										id={item.id}
										setIsDeleteModalOpen={setIsDeleteModalOpen}
										setToDeleteId={setToDeleteId}
									></Card>
								);
						  })}
				</div>
			</div>
		</div>
	);
}

export default App;
